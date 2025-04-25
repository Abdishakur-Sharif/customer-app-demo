// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyC-l2FJwbXK9WydNcy1x8yRBLTdKktM4E4",
  authDomain: "customer-demo-3b12c.firebaseapp.com",
  projectId: "customer-demo-3b12c",
  storageBucket: "customer-demo-3b12c.firebasestorage.app",
  messagingSenderId: "715152658348",
  appId: "1:715152658348:web:169905e6e8f1e3d184b409",
  measurementId: "G-MBV0MWNMJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { storage, auth, database, analytics };