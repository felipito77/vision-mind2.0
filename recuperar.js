import { recuperarPassword, mensajeError } from "./auth.js";
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-recuperar");
  const emailEl = document.getElementById("rec-email");
  const btn = document.getElementById("btn-enviar");
  const msg = document.getElementById("mensaje-rec");
  function mostrar(txt, tipo) {
    msg.textContent = txt;
    if (tipo === "exito") msg.style.color = "var(--aguamarina)";
    else if (tipo === "info") msg.style.color = "var(--azul-clarito)";
    else msg.style.color = "var(--rojito)";
  }
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const correo = emailEl.value.trim();
    if (!correo) { mostrar("Ingresa tu correo.", "error"); return; }
    btn.disabled = true;
    mostrar("Procesando...", "info");
    try {
      await recuperarPassword(correo);
      mostrar("Listo! Revisa tu correo para restablecer la contrasena.", "exito");
      form.reset();
    } catch (err) {
      mostrar(mensajeError(err), "error");
    } finally {
      btn.disabled = false;
    }
  });
});