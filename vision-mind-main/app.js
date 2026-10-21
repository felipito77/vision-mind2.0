/**
 * VISION MIND - SIMULADOR ENGINE INTERACTIVO
 * Manejo de interacciones 3D, retroalimentación sonora y contadores HUD
 */

// Sintetizador de audio Web Audio API (cero dependencias externas)
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function sonarEfecto(tipo) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const ahora = ctx.currentTime;

    if (tipo === 'ecg') {
      // Beep médico de monitor cardíaco
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ahora); // A5
      gain.gain.setValueAtTime(0.12, ahora);
      gain.gain.exponentialRampToValueAtTime(0.001, ahora + 0.12);
      osc.start(ahora);
      osc.stop(ahora + 0.12);
    } else if (tipo === 'success') {
      // Acorde armónico de logro
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ahora); // C5
      osc.frequency.setValueAtTime(659.25, ahora + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, ahora + 0.16); // G5
      gain.gain.setValueAtTime(0.15, ahora);
      gain.gain.exponentialRampToValueAtTime(0.001, ahora + 0.35);
      osc.start(ahora);
      osc.stop(ahora + 0.35);
    } else if (tipo === 'metal') {
      // Tintineo metálico de instrumental / cocina / herramientas
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, ahora);
      osc.frequency.exponentialRampToValueAtTime(400, ahora + 0.15);
      gain.gain.setValueAtTime(0.08, ahora);
      gain.gain.exponentialRampToValueAtTime(0.001, ahora + 0.15);
      osc.start(ahora);
      osc.stop(ahora + 0.15);
    } else {
      // Click o pulso de interfaz
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ahora); // D5
      gain.gain.setValueAtTime(0.1, ahora);
      gain.gain.exponentialRampToValueAtTime(0.001, ahora + 0.1);
      osc.start(ahora);
      osc.stop(ahora + 0.1);
    }
  } catch (err) {
    console.warn("Audio interactivo no disponible:", err);
  }
}

// Inicialización de interacciones de A-Frame
document.addEventListener("DOMContentLoaded", () => {
  const contadorEl = document.getElementById("contador");
  const feedbackEl = document.getElementById("feedback");
  const itemsInteractuados = new Set();

  function interactuarConElemento(el) {
    const info = el.getAttribute("data-info") || el.getAttribute("name") || "Elemento interactuado";
    const sonido = el.getAttribute("data-sound") || "click";

    sonarEfecto(sonido);

    if (feedbackEl) {
      feedbackEl.style.color = "#00f5d4";
      feedbackEl.textContent = `✔ ${info}`;
      feedbackEl.style.transform = "scale(1.02)";
      setTimeout(() => {
        if (feedbackEl) feedbackEl.style.transform = "scale(1)";
      }, 200);
    }

    if (!itemsInteractuados.has(el)) {
      itemsInteractuados.add(el);
      if (contadorEl) {
        contadorEl.textContent = itemsInteractuados.size;
        contadorEl.style.transform = "scale(1.3)";
        setTimeout(() => {
          contadorEl.style.transform = "scale(1)";
        }, 250);
      }
    }

    // Efecto visual en la entidad 3D
    const animOriginal = el.getAttribute("animation__pulse");
    if (!animOriginal) {
      el.setAttribute("animation__pulse", "property: scale; dir: alternate; dur: 200; to: 1.15 1.15 1.15; loop: 1");
      setTimeout(() => {
        el.removeAttribute("animation__pulse");
      }, 450);
    }
  }

  // Registrar listeners a todos los elementos con clase interactivo o producto
  function bindInteractive() {
    const elementos = document.querySelectorAll(".interactivo, .producto");
    elementos.forEach((el) => {
      // Al hacer click con mouse o fuse del cursor VR
      el.addEventListener("click", () => interactuarConElemento(el));
      
      // Feedback al posar la mirada (hover / fusing)
      el.addEventListener("mouseenter", () => {
        const info = el.getAttribute("data-info") || "Enfocando objeto...";
        if (feedbackEl && !feedbackEl.textContent.startsWith("✔")) {
          feedbackEl.style.color = "#38bdf8";
          feedbackEl.textContent = `👁 ${info}`;
        }
      });

      el.addEventListener("mouseleave", () => {
        if (feedbackEl && feedbackEl.textContent.startsWith("👁")) {
          feedbackEl.textContent = "Apunta con el cursor a otro elemento...";
          feedbackEl.style.color = "#ffffff88";
        }
      });
    });
  }

  // A-Frame puede tardar unos ms en montar la escena
  const scene = document.querySelector("a-scene");
  if (scene) {
    if (scene.hasLoaded) {
      bindInteractive();
    } else {
      scene.addEventListener("loaded", bindInteractive);
    }
  } else {
    bindInteractive();
  }
});
