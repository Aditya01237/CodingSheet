// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoyLba8qy8UtFkwKzYapcVWvmZuo4E8aw",
  authDomain: "codingsheet-555e5.firebaseapp.com",
  projectId: "codingsheet-555e5",
  storageBucket: "codingsheet-555e5.firebasestorage.app",
  messagingSenderId: "688890573620",
  appId: "1:688890573620:web:648c08c45032c24314eb61",
  measurementId: "G-SGKXQGFR14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
