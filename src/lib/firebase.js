
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-6273d.firebaseapp.com",
  projectId: "reactchat-6273d",
  storageBucket: "reactchat-6273d.appspot.com",
  messagingSenderId: "802885162053",
  appId: "1:802885162053:web:b1239c07dbe472db663f2c"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()