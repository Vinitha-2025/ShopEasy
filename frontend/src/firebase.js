import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYmqSfq3_KT12yK4qZoVAVzqA8l3uPfT4",
  authDomain: "shopeasy-3f1e3.firebaseapp.com",
  projectId: "shopeasy-3f1e3",
  storageBucket: "shopeasy-3f1e3.firebasestorage.app",
  messagingSenderId: "263856289248",
  appId: "1:263856289248:web:0dda19ad6e45708ba9e785",
  measurementId: "G-6T70MKK7C1"
};

const app = initializeApp(firebaseConfig);
export const  auth=getAuth(app);