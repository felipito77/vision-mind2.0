/* =====================================================
   VISION MIND — WORKER CLOUDFLARE + GOOGLE GEMINI
   
   INSTRUCCIONES DE DESPLIEGUE:
   1. Ve a https://workers.cloudflare.com y crea una cuenta gratuita.
   2. Crea un nuevo Worker y pega TODO este código.
   3. En "Settings > Variables", agrega:
      - GEMINI_API_KEY  = tu clave de https://aistudio.google.com/app/apikey
      - (opcional) actualiza DOMINIOS_PERMITIDOS con tu dominio real
   4. Copia la URL del Worker (ej: nexus-visionmind.tu-usuario.workers.dev)
   5. Pégala en chatbot.js en la línea:
         const CHATBOT_URL_IA = "https://nexus-visionmind.tu-usuario.workers.dev";
   ===================================================== */

const MODELO = "gemini-2.0-flash";

/* Dominios que pueden usar este Worker (CORS).
   Cuando publiques tu página, cambia esto a tu dominio real.
   Ej: ["https://tu-usuario.github.io"] */
const DOMINIOS_PERMITIDOS = ["*"]; // Cambia a tu dominio en producción

const cors = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {

    /* ─── Preflight CORS ─── */
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    /* ─── Solo aceptar POST ─── */
    if (request.method !== "POST") {
      return new Response("Método no permitido", { status: 405, headers: cors });
    }

    /* ─── Parsear el cuerpo ─── */
    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json({ respuesta: "Solicitud inválida." }, { status: 400, headers: cors });
    }

    const { mensaje, contexto, historial = [] } = body;

    /* ─── Validar entrada ─── */
    if (!mensaje || mensaje.length > 500) {
      return Response.json(
        { respuesta: "Lo siento, mensaje demasiado largo o vacío." },
        { status: 400, headers: cors }
      );
    }

    /* ─── Instrucciones del sistema ─── */
    const instrucciones = `Eres Nexus, el asistente virtual inteligente de Vision Mind.
Responde SIEMPRE en español, de forma amable, concisa y profesional (máximo 4 frases).
Solo usa la información del contexto de la empresa que se te proporciona.
Si no sabes la respuesta o no tiene que ver con Vision Mind, dilo con amabilidad y sugiere escribir a visionmind@correo.com.
Nunca inventes precios ni datos que no estén en el contexto.

Contexto de Vision Mind:
${(contexto || "").slice(0, 5000)}`;

    /* ─── Construir historial de conversación ─── */
    const contents = historial.slice(-6).map(m => ({
      role: m.rol === "bot" ? "model" : "user",
      parts: [{ text: String(m.texto).slice(0, 800) }]
    }));
    contents.push({ role: "user", parts: [{ text: mensaje }] });

    /* ─── Llamar a Gemini ─── */
    try {
      const r = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODELO}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": env.GEMINI_API_KEY,
          },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: instrucciones }] },
            contents,
            generationConfig: { maxOutputTokens: 300, temperature: 0.4 },
          }),
        }
      );

      const data = await r.json();
      const respuesta =
        data?.candidates?.[0]?.content?.parts?.map(p => p.text).join("") ||
        "Lo siento, ahora no puedo responder. Escríbenos a visionmind@correo.com";

      return Response.json({ respuesta }, { headers: cors });

    } catch (e) {
      return Response.json(
        { respuesta: "Lo siento, hubo un problema. Intenta de nuevo." },
        { headers: cors }
      );
    }
  }
};
