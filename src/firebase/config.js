import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKuwYq6ny9dvwFP3ako_C4ovQbqKlGl0w",
  authDomain: "car-washed.firebaseapp.com",
  projectId: "car-washed",
  storageBucket: "car-washed.appspot.com",
  messagingSenderId: "1023167612468",
  appId: "1:1023167612468:web:065af98085b3441ac22c61",
  measurementId: "G-5NB4TMTPGE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
