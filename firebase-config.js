/**
 * VISION MIND — FIREBASE CONFIGURATION
 * Inicialización de Firebase App, Auth y Firestore.
 *
 * ⚠️  INSTRUCCIONES:
 *   1. Entra a https://console.firebase.google.com
 *   2. Crea (o abre) tu proyecto de Vision Mind
 *   3. Ve a Configuración del proyecto → Tus apps → Web
 *   4. Copia los valores del objeto firebaseConfig y reemplaza los de abajo
 *   5. En Firebase Console activa:
 *      - Authentication → Email/Password
 *      - Firestore Database
 */

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth }      from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// ── Reemplaza estos valores con los de tu proyecto Firebase ──────────────────
const firebaseConfig = {
  apiKey:            "TU_API_KEY",
  authDomain:        "TU_PROYECTO.firebaseapp.com",
  projectId:         "TU_PROYECTO_ID",
  storageBucket:     "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId:             "TU_APP_ID"
};
// ─────────────────────────────────────────────────────────────────────────────

// Evita inicializar la app principal más de una vez
const app = getApps().find(a => a.name === "[DEFAULT]") || initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);
export { firebaseConfig };
