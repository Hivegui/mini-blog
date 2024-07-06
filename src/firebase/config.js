// Configuração e inicialização do Firebase

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase com as credenciais do projeto
const firebaseConfig = {
  apiKey: "AIzaSyDKuwYq6ny9dvwFP3ako_C4ovQbqKlGl0w",
  authDomain: "car-washed.firebaseapp.com",
  projectId: "car-washed",
  storageBucket: "car-washed.appspot.com",
  messagingSenderId: "1023167612468",
  appId: "1:1023167612468:web:065af98085b3441ac22c61",
  measurementId: "G-5NB4TMTPGE"
};

// Inicializa o Firebase com a configuração passada
const app = initializeApp(firebaseConfig);

// Obtém uma instância do Firestore usando o aplicativo Firebase
const db = getFirestore(app);

// Exporta a instância do Firestore para ser utilizada em outras partes da aplicação
export { db };
