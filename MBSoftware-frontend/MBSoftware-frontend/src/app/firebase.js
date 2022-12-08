// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCxd16GSMLEsatk40BYd8_kr67Ac57fick",
  authDomain: "mb-software-a20dc.firebaseapp.com",
  projectId: "mb-software-a20dc",
  storageBucket: "mb-software-a20dc.appspot.com",
  messagingSenderId: "903723238924",
  appId: "1:903723238924:web:1bbbfb6103fa376b6a9029",
  measurementId: "G-8JYXGN8FD3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)
export const storage = getStorage(app)


