/**
 * VISION MIND - SESION MODULE
 * Gestiona el estado de sesion en todas las paginas.
 */

import { observarSesion, cerrarSesion, obtenerRol } from "./auth.js";

export let usuarioActual = null;
export let rolActual = "usuario";

const elSesion = document.getElementById("sesion");
const elLogoutBtn = document.getElementById("btn-logout");

observarSesion(async (usuario) => {
  usuarioActual = usuario;

  if (usuario) {
    rolActual = await obtenerRol(usuario.uid);
    if (elSesion) elSesion.textContent = usuario.displayName || usuario.email;
    if (window.location.pathname.toLowerCase().includes("login")) {
      window.location.href = "index.html";
    }
  } else {
    rolActual = "usuario";
    if (elSesion) elSesion.textContent = "";
    const paginasProtegidas = ["admin.html"];
    const paginaActual = window.location.pathname.split("/").pop().toLowerCase();
    if (paginasProtegidas.includes(paginaActual)) {
      window.location.href = "login.html";
    }
  }
});

if (elLogoutBtn) {
  elLogoutBtn.addEventListener("click", async () => {
    await cerrarSesion();
    window.location.href = "index.html";
  });
}
