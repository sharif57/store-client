// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKZ1MEZbRhCcBvCnO-9AKy7Lu4VaantAA",
  authDomain: "store-client-af8d7.firebaseapp.com",
  projectId: "store-client-af8d7",
  storageBucket: "store-client-af8d7.appspot.com",
  messagingSenderId: "719938749495",
  appId: "1:719938749495:web:4e307a903546d941e02bb2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)