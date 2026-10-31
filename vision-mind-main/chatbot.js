/* =====================================================
   VISION MIND — MOTOR DEL CHATBOT NEXUS
   No necesitas editar este archivo.
   El conocimiento se configura en conocimiento.js

   CONFIGURACIÓN OPCIONAL: IA real con Google Gemini
   Deja vacío ("") para usar solo la base de conocimiento.
   Si despliegas un Worker en Cloudflare, pega su URL aquí.
   ===================================================== */

const CHATBOT_URL_IA = ""; // Ej: "https://nexus-visionmind.tu-usuario.workers.dev"

(function () {
  /* ─── Cargar base de conocimiento ─── */
  const KB = window.CONOCIMIENTO || (typeof CONOCIMIENTO !== "undefined" ? CONOCIMIENTO : null);
  if (!KB) { console.error("Vision Mind Chatbot: falta conocimiento.js"); return; }

  /* ─── Constantes de configuración ─── */
  const UMBRAL = 0.42;
  const STOP = new Set(("a al algo algun alguna como con cual cuales de del ella ellos en es esa ese esto esta este estoy la las le les lo los me mi mis muy no o para pero por quien se si sin sobre su sus te tu tus un una uno unos y ya yo hay puedo puede pueden quiero quisiera saber favor usted ustedes ser son estan tienen tiene tengo hola").split(" "));

  /* ─── Normalización de texto ─── */
  const normalizar = t =>
    t.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
     .replace(/[^a-z0-9ñ\s]/g, " ").replace(/\s+/g, " ").trim();

  const raiz = w =>
    w.length > 6 && w.endsWith("es") ? w.slice(0, -2) :
    w.length > 4 && w.endsWith("s")  ? w.slice(0, -1) : w;

  function tokens(t) {
    const todas = normalizar(t).split(" ").filter(Boolean);
    const utiles = todas.filter(w => !STOP.has(w));
    return (utiles.length ? utiles : todas).map(raiz);
  }

  /* ─── Distancia de Levenshtein ─── */
  function distancia(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 99;
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++)
      for (let j = 1; j <= b.length; j++)
        d[i][j] = Math.min(d[i-1][j]+1, d[i][j-1]+1, d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
    return d[a.length][b.length];
  }

  function parecidas(a, b) {
    if (a === b) return 1;
    if (a.length >= 5 && b.length >= 5 && (a.startsWith(b) || b.startsWith(a))) return 0.9;
    const tol = Math.min(a.length, b.length) >= 7 ? 2 : Math.min(a.length, b.length) >= 4 ? 1 : 0;
    return tol && distancia(a, b) <= tol ? 0.8 : 0;
  }

  function similitud(tu, tp) {
    if (!tu.length || !tp.length) return 0;
    let suma = 0;
    for (const u of tu) suma += Math.max(0, ...tp.map(p => parecidas(u, p)));
    const cubreUsuario  = suma / tu.length;
    const cubrePregunta = suma / tp.length;
    return 0.65 * cubreUsuario + 0.35 * Math.min(1, cubrePregunta);
  }

  /* ─── Índice de búsqueda ─── */
  const indice = KB.temas.map(t => ({
    tema: t,
    variantes: t.preguntas.map(tokens)
  }));

  function buscar(texto) {
    const tu = tokens(texto);
    let mejor = null, mejorScore = 0;
    for (const { tema, variantes } of indice) {
      for (const tp of variantes) {
        const s = similitud(tu, tp);
        if (s > mejorScore) { mejorScore = s; mejor = tema; }
      }
    }
    return mejorScore >= UMBRAL ? mejor : null;
  }

  /* ─── Formato Markdown básico ─── */
  function formato(txt) {
    return txt
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br>");
  }

  /* ─── Construcción del HTML del chat ─── */
  const html = `
  <div class="cb" id="cb-root">
    <button class="cb-toggle" onclick="window._cbAbrir(true)" aria-label="Abrir chat con Nexus IA">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
      </svg>
    </button>

    <div class="cb-ventana" role="dialog" aria-label="Asistente Nexus IA">
      <div class="cb-cabecera">
        <div class="cb-avatar" aria-hidden="true">${KB.avatarEmoji || "🤖"}</div>
        <div>
          <strong>${KB.nombreBot || "Asistente Vision Mind"}</strong>
          <small>En línea · Vision Mind</small>
        </div>
        <button class="cb-cerrar" onclick="window._cbAbrir(false)" aria-label="Cerrar chat">✕</button>
      </div>

      <ul class="cb-lista" id="cb-lista" aria-live="polite" aria-label="Mensajes del chat"></ul>

      <form class="cb-form" id="cb-form" onsubmit="return false;" autocomplete="off">
        <input
          type="text"
          id="cb-entrada"
          class="cb-input"
          placeholder="Escribe tu pregunta..."
          maxlength="400"
          aria-label="Escribe tu pregunta"
        >
        <button type="submit" class="cb-enviar" aria-label="Enviar mensaje">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </form>
    </div>
  </div>`;

  /* ─── Inyectar en el DOM ─── */
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper.firstElementChild);

  /* ─── Referencias a elementos ─── */
  const root    = document.getElementById("cb-root");
  const lista   = document.getElementById("cb-lista");
  const entrada = document.getElementById("cb-entrada");
  const historial = [];

  /* ─── Función abrir / cerrar ─── */
  window._cbAbrir = function(estado) {
    root.classList.toggle("cb-abierto", estado);
    if (estado) setTimeout(() => entrada.focus(), 250);
  };

  /* ─── Agregar mensaje a la lista ─── */
  function agregar(html, quien) {
    const li = document.createElement("li");
    li.className = `cb-msg cb-${quien}`;
    li.innerHTML = html;
    lista.appendChild(li);
    lista.scrollTop = lista.scrollHeight;
    return li;
  }

  /* ─── Animación de "escribiendo..." ─── */
  const escribiendo = () =>
    agregar('<span class="cb-puntos"><i></i><i></i><i></i></span>', "bot cb-escribiendo");

  /* ─── Responder con mensaje del bot ─── */
  function responderBot(texto, accion, sugerencias) {
    const div = agregar(formato(texto), "bot");
    if (accion) {
      const b = document.createElement("a");
      b.className = "cb-accion";
      b.textContent = accion.texto + " →";
      b.href = accion.url;
      if (accion.url.startsWith("mailto") || accion.url.startsWith("http")) {
        b.target = "_blank";
        b.rel = "noopener noreferrer";
      }
      div.appendChild(b);
    }
    if (sugerencias?.length) {
      const cont = document.createElement("div");
      cont.className = "cb-chips";
      sugerencias.forEach(s => {
        const c = document.createElement("button");
        c.textContent = s;
        c.onclick = () => enviar(s);
        cont.appendChild(c);
      });
      lista.appendChild(cont);
    }
    historial.push({ rol: "bot", texto });
    lista.scrollTop = lista.scrollHeight;
  }

  /* ─── Llamada a Gemini (via Worker Cloudflare) ─── */
  async function preguntarIA(mensaje) {
    const contexto = KB.temas
      .map(t => `- ${t.preguntas[0]}: ${t.respuesta}`)
      .join("\n");

    const contents = historial.slice(-6).map(m => ({
      role: m.rol === "bot" ? "model" : "user",
      parts: [{ text: String(m.texto).slice(0, 800) }]
    }));
    contents.push({ role: "user", parts: [{ text: mensaje }] });

    const r = await fetch(CHATBOT_URL_IA, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensaje, contexto, historial: historial.slice(-6) })
    });
    if (!r.ok) throw new Error("IA no disponible");
    return (await r.json()).respuesta;
  }

  /* ─── Función principal de envío ─── */
  async function enviar(texto) {
    texto = texto.trim();
    if (!texto) return;

    /* Limpiar chips anteriores */
    lista.querySelectorAll(".cb-chips").forEach(c => c.remove());

    agregar(esc(texto), "usuario");
    historial.push({ rol: "usuario", texto });
    entrada.value = "";

    const tema = buscar(texto);
    const cargando = escribiendo();

    if (tema) {
      await new Promise(r => setTimeout(r, 450 + Math.random() * 400));
      cargando.remove();
      return responderBot(tema.respuesta, tema.accion);
    }

    if (CHATBOT_URL_IA) {
      try {
        const resp = await preguntarIA(texto);
        cargando.remove();
        return responderBot(resp);
      } catch (e) {
        console.warn("Gemini error:", e);
      }
    }

    await new Promise(r => setTimeout(r, 400));
    cargando.remove();
    responderBot(KB.noEntiendo, null, KB.sugerencias);
  }

  /* ─── Escape de HTML ─── */
  function esc(t) {
    return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  }

  /* ─── Eventos ─── */
  document.getElementById("cb-form").onsubmit = e => {
    e.preventDefault();
    enviar(entrada.value);
  };
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") window._cbAbrir(false);
  });

  /* ─── Mensaje de bienvenida al abrir ─── */
  let bienvenidaMostrada = false;
  const toggleOriginal = window._cbAbrir;
  window._cbAbrir = function(estado) {
    toggleOriginal(estado);
    if (estado && !bienvenidaMostrada) {
      bienvenidaMostrada = true;
      setTimeout(() => {
        responderBot(KB.bienvenida, null, KB.sugerencias);
      }, 300);
    }
  };

  /* ─── Prueba desde consola: chatbotProbar("que es vision mind") ─── */
  window.chatbotProbar = t => {
    const r = buscar(t);
    console.log(r ? r.preguntas[0] : "sin coincidencia");
  };

})();
