import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

//funkce na login
import { getAuth, GoogleAuthProvider } from "firebase/auth";

//funkce pro databazi
import{ getFirestore } from "firebase/firestore";

//funkce pro storage
import{ getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDL62-C7UwUMXjS_KD2SzuYRGlfIs1TXgo",
  authDomain: "lofirandomizer.firebaseapp.com",
  projectId: "lofirandomizer",
  storageBucket: "lofirandomizer.appspot.com",
  messagingSenderId: "1021447220898",
  appId: "1:1021447220898:web:8c7f875d20e52f023e71fb",
  measurementId: "G-H19KLBD9DH"
};

//firebase init
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

//login var
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

//var pro databazi
export const db = getFirestore(app);

//var pro storage
export const storage = getStorage(app);