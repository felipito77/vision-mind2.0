/**
 * VISION MIND — AUTH MODULE
 * Funciones reutilizables: registrar, iniciarSesion, cerrarSesion,
 * recuperarPassword, observarSesion, obtenerRol, mensajeError
 */

import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

/* REGISTRO */
export async function registrar(nombre, email, password) {
  const credencial = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credencial.user, { displayName: nombre });
  await setDoc(doc(db, "usuarios", credencial.user.uid), {
    nombre,
    email,
    rol: "usuario",
    creadoEn: new Date().toISOString()
  });
  return credencial.user;
}

/* INICIO DE SESION */
export async function iniciarSesion(email, password) {
  const credencial = await signInWithEmailAndPassword(auth, email, password);
  return credencial.user;
}

/* CERRAR SESION */
export async function cerrarSesion() {
  await signOut(auth);
}

/* RECUPERAR PASSWORD */
export async function recuperarPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

/* OBSERVADOR DE SESION */
export function observarSesion(callback) {
  return onAuthStateChanged(auth, callback);
}

/* OBTENER ROL */
export async function obtenerRol(uid) {
  const snap = await getDoc(doc(db, "usuarios", uid));
  if (!snap.exists()) return "usuario";
  return snap.data().rol || "usuario";
}

/* MENSAJES DE ERROR EN ESPANOL */
export function mensajeError(error) {
  const codigos = {
    "auth/invalid-email":          "El correo electrónico no es válido.",
    "auth/user-disabled":          "Esta cuenta ha sido desactivada.",
    "auth/user-not-found":         "No existe una cuenta con ese correo.",
    "auth/wrong-password":         "Contraseña incorrecta.",
    "auth/invalid-credential":     "Credenciales inválidas. Verifica correo y contraseña.",
    "auth/email-already-in-use":   "Ese correo ya está registrado.",
    "auth/weak-password":          "La contraseña debe tener al menos 6 caracteres.",
    "auth/network-request-failed": "Sin conexión. Revisa tu internet.",
    "auth/too-many-requests":      "Demasiados intentos. Espera un momento.",
    "auth/requires-recent-login":  "Vuelve a iniciar sesión para continuar.",
    "auth/operation-not-allowed":  "Método de autenticación no habilitado."
  };
  return codigos[error.code] || error.message || "Error desconocido. Intenta de nuevo.";
}
