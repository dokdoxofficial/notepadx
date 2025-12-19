import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAsoUtqOm7E47eMscHKUN3SuKOoC6XfSE",
  authDomain: "login-b35ef.firebaseapp.com",
  projectId: "login-b35ef",
  storageBucket: "login-b35ef.firebasestorage.app",
  messagingSenderId: "465246453268",
  appId: "1:465246453268:web:6719097148c9616b82b101"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
