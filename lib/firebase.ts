// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWXUtqVmgUfRBrZ0SoAQi6x9URxAeGKP8",
  authDomain: "obs-time-web.firebaseapp.com",
  projectId: "obs-time-web",
  storageBucket: "obs-time-web.appspot.com",
  messagingSenderId: "932773084356",
  appId: "1:932773084356:web:4706cb895c6705a5241d91"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);