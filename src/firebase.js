// Configuração do Firebase usando a versão compat (CDN)
const firebaseConfig = {
  apiKey: "AIzaSyCPDHATD3cts3T4lwWkeODGESCct1ujHEs",
  authDomain: "mensagens-675b0.firebaseapp.com",
  projectId: "mensagens-675b0",
  storageBucket: "mensagens-675b0.firebasestorage.app",
  messagingSenderId: "914355697640",
  appId: "1:914355697640:web:18d813c45ee75b3457165d",
  measurementId: "G-CQL8Z2KSWC"
};

// Initialize Firebase usando a versão compat
let app, db, analytics;

if (typeof window !== 'undefined' && window.firebase) {
  app = window.firebase.initializeApp(firebaseConfig);
  db = window.firebase.firestore();
  analytics = window.firebase.analytics();
} else {
  // Fallback para desenvolvimento sem Firebase
  console.warn('Firebase não disponível, usando modo offline');
  db = null;
  analytics = null;
}

export { db, analytics };

