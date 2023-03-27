// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDmmxM0c9JLFQhMF2PWtk9hiKAzinNzaEg",
  authDomain: "fir-course1-95e99.firebaseapp.com",
  projectId: "fir-course1-95e99",
  storageBucket: "fir-course1-95e99.appspot.com",
  messagingSenderId: "189230015812",
  appId: "1:189230015812:web:fb3d32bc9cf88f81cee311"
};
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider();
export const db=getFirestore(app)
export const storage=getStorage(app)