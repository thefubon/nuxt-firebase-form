import firebase from "firebase/compat/app";
// import { initializeApp } from "firebase/app"
import { getFirestore, collection } from "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDI2pc_SnKRKEOY0MQfV-Xgm3no4i_hNY8",
  authDomain: "hello-545a9.firebaseapp.com",
  projectId: "hello-545a9",
  storageBucket: "hello-545a9.appspot.com",
  messagingSenderId: "876498450685",
  appId: "1:876498450685:web:0d64b2d3480db27236a694"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const testCollection = collection(db, "helloapp");

export { db, testCollection };
