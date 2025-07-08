import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDy-M69C_1_Mr3QbW8ZjutGNTk_TP26xgg",
  authDomain: "vocra-5eec4.firebaseapp.com",
  projectId: "vocra-5eec4",
  storageBucket: "vocra-5eec4.firebasestorage.app",
  messagingSenderId: "80983701545",
  appId: "1:80983701545:web:b6d8dd0ef4594a6f230438",
  measurementId: "G-F9XL34FERK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const Provider = new GoogleAuthProvider();