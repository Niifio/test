import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = initializeApp({
  apiKey: "AIzaSyC0e6vXdWhRVNwse2B3lRfnZF0La_14Cic",
  authDomain: "workforce-am.firebaseapp.com",
  projectId: "workforce-am",
  storageBucket: "workforce-am.appspot.com",
  messagingSenderId: "431683082749",
  appId: "1:431683082749:web:c403f2c3fbeacd17112194",
});
// Initialize Firebase
export const auth = getAuth(firebaseConfig);

export const db = getFirestore();
