/** VISION MIND - ADMIN.JS */
import { db, firebaseConfig } from "./firebase-config.js";
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { observarSesion, obtenerRol, mensajeError } from "./auth.js";
const contenido   = document.getElementById("contenido");
const aviso       = document.getElementById("aviso");
const tituloForm  = document.getElementById("tituloFormulario");
const formUsuario = document.getElementById("formUsuario");
const idUsuarioEl = document.getElementById("idUsuario");
const nombreEl    = document.getElementById("nombre");
const emailEl     = document.getElementById("email");
const passwordEl  = document.getElementById("password");
const rolEl       = document.getElementById("rol");
const guardarEl   = document.getElementById("guardar");
const cancelarEl  = document.getElementById("cancelar");
const mensajeEl   = document.getElementById("mensaje");
const listaEl     = document.getElementById("listaUsuarios");
const col         = collection(db, "usuarios");
let   uidActual   = null;
function mostrar(txt, tipo) {
  mensajeEl.textContent = txt;
  if (tipo === "exito") mensajeEl.style.color = "var(--aguamarina)";
  else if (tipo === "info") mensajeEl.style.color = "var(--azul-clarito)";
  else mensajeEl.style.color = "var(--rojito)";
}
function authSecundaria() {
  const existe = getApps().find(a => a.name === "secundaria");
  return getAuth(existe || initializeApp(firebaseConfig, "secundaria"));
}
function modoNuevo() {
  formUsuario.reset();
  idUsuarioEl.value = "";
  emailEl.disabled = false;
  passwordEl.disabled = false;
  passwordEl.required = true;
  tituloForm.textContent = "Agregar usuario";
  guardarEl.textContent  = "Agregar usuario";
  cancelarEl.hidden = true;
  mostrar("", "info");
}
