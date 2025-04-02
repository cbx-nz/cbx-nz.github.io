// /reviews/assets/js/firebase.js or ./assets/js/firebase.js
// firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChZrNkf29uagia4QBq5CwkpU5nCP-D390",
  authDomain: "cbx-reviews.firebaseapp.com",
  projectId: "cbx-reviews",
  storageBucket: "cbx-reviews.firebasestorage.app",
  messagingSenderId: "839457911591",
  appId: "1:839457911591:web:d386e925c380dadc782f02",
  measurementId: "G-PFJMBG503D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);