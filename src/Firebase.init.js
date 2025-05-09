// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvTnLqD75yIzxPyt3xyK_mg05iMHAlsl8",
  authDomain: "billing-app-386da.firebaseapp.com",
  projectId: "billing-app-386da",
  storageBucket: "billing-app-386da.appspot.com",
  messagingSenderId: "137155247092",
  appId: "1:137155247092:web:b403239055fd9b13d0ba2a",
  measurementId: "G-04DVK1P97G"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { app, auth };