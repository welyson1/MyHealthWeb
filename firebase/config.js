// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9YgN1tp-STxg5uQtEFE_2X3Kjwg2AeaE",
  authDomain: "myhealth-web-6e698.firebaseapp.com",
  projectId: "myhealth-web-6e698",
  storageBucket: "myhealth-web-6e698.appspot.com",
  messagingSenderId: "754146047235",
  appId: "1:754146047235:web:020fa8c2f2dc4b0ff1a536",
  measurementId: "G-F2SSFJRXS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }