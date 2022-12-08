import { createSlice } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, uploadBytes , getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCxd16GSMLEsatk40BYd8_kr67Ac57fick",
    authDomain: "mb-software-a20dc.firebaseapp.com",
    projectId: "mb-software-a20dc",
    storageBucket: "mb-software-a20dc.appspot.com",
    messagingSenderId: "903723238924",
    appId: "1:903723238924:web:1bbbfb6103fa376b6a9029",
    measurementId: "G-8JYXGN8FD3"
  };
  
const app = initializeApp(firebaseConfig);

const firebaseSlice = createSlice({
    name: 'firebase',
    initialState: {
      config: firebaseConfig,
      app: app,
      storage: getStorage(app),
    },
    reducers: {}
})

export default firebaseSlice.reducer
