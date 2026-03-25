// ══════════════════════════════════════════
// Lima FC — Configuración global
// ══════════════════════════════════════════

// Modo mock: true = localStorage, false = Firebase real
export const USE_MOCK = false;

// Firebase
export const firebaseConfig = {
  apiKey:            "AIzaSyBN8OueMj5DVgRB2m5yD8ovVUnPV_-_iDA",
  authDomain:        "limafc.firebaseapp.com",
  databaseURL:       "https://limafc-default-rtdb.firebaseio.com",
  projectId:         "limafc",
  storageBucket:     "limafc.firebasestorage.app",
  messagingSenderId: "923612026841",
  appId:             "1:923612026841:web:bd8c792715d61557fb6bc8"
};

// EmailJS (https://www.emailjs.com)
export const emailjsConfig = {
  publicKey:  "shPzgiQKzmSBW1kgg",
  serviceId:  "service_mdt8sb4",
  templateId: "template_f8odhbc"
};
