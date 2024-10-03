// Configuração e inicialização do Firebase

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase com as credenciais do projeto
const firebaseConfig = {
  apiKey: "AIzaSyCeEaByonjw2qX5BNevJ95XICeyn76ttws",
  authDomain: "mini-blog-a8eda.firebaseapp.com",
  projectId: "mini-blog-a8eda",
  storageBucket: "mini-blog-a8eda.appspot.com",
  messagingSenderId: "515664851875",
  appId: "1:515664851875:web:988b70274117c139732016"
};

// Inicializa o Firebase com a configuração passada
const app = initializeApp(firebaseConfig);

// Obtém uma instância do Firestore usando o aplicativo Firebase
const db = getFirestore(app);

// Exporta a instância do Firestore para ser utilizada em outras partes da aplicação
export { db };
