// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4Vxn3bqFF4K7Tw7egKQnSLRNI9e0TZcY",
  authDomain: "servicedesk-fa911.firebaseapp.com",
  projectId: "servicedesk-fa911",
  storageBucket: "servicedesk-fa911.appspot.com",
  messagingSenderId: "959234465996",
  appId: "1:959234465996:web:0d0865eab9c12a15fea269",
  measurementId: "G-PY8WLL5NQL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);