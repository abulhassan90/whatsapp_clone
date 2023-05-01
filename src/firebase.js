// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoQqSeoYRZ5mmKRzfJ-MoOHZHhi1R5rf8",
  authDomain: "whatsapp-clone-770e5.firebaseapp.com",
  projectId: "whatsapp-clone-770e5",
  storageBucket: "whatsapp-clone-770e5.appspot.com",
  messagingSenderId: "259943417311",
  appId: "1:259943417311:web:cc6438b39dd3e25fe7b06a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app, db };
