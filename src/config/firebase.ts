// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdqc4ST1tuE6AjaJeEIgQ0qRKva-oGoOk",
  authDomain: "fir-social-media-project-d4079.firebaseapp.com",
  projectId: "fir-social-media-project-d4079",
  storageBucket: "fir-social-media-project-d4079.appspot.com",
  messagingSenderId: "989729771474",
  appId: "1:989729771474:web:37dae92c723968a8f2420b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth= getAuth(app); 
export const provider= new GoogleAuthProvider();
export const db= getFirestore(app);