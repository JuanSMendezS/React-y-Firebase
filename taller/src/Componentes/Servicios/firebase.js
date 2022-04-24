// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH4GNL8zzRnSmPEVYokn8RTiKVLPQiDWo",
  authDomain: "react-taller-4b6e7.firebaseapp.com",
  projectId: "react-taller-4b6e7",
  storageBucket: "react-taller-4b6e7.appspot.com",
  messagingSenderId: "338627266238",
  appId: "1:338627266238:web:86a30ca5ad6059464800ef",
  measurementId: "G-CGMW9SKSDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);