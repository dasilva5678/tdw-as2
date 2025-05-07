import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { fetchSignInMethodsForEmail } from "firebase/auth";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAF8nLZHtTyF7HB2_MIWdecKOomu0OlVDA",
  authDomain: "tdw-as2-bb7e6.firebaseapp.com",
  projectId: "tdw-as2-bb7e6",
  storageBucket: "tdw-as2-bb7e6.firebasestorage.app",
  messagingSenderId: "332817043933",
  appId: "1:332817043933:web:6a9b67425f864850a36634",
};

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);

// Serviços
const auth = getAuth(app);
const db = getFirestore(app);

// Exportando para usar nas outras partes do projeto
export { auth, db, fetchSignInMethodsForEmail };
