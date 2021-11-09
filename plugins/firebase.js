import firebase from "firebase/compat/app";
// import { initializeApp } from "firebase/app"
import { getFirestore, collection } from "firebase/firestore";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0lKRTnM-hJLujTpbbc0ys37-zwkKf8pI",
  authDomain: "webinar-alpari.firebaseapp.com",
  projectId: "webinar-alpari",
  storageBucket: "webinar-alpari.appspot.com",
  messagingSenderId: "211473198262",
  appId: "1:211473198262:web:685dd03e58a7e5cd270a17"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const testCollection = collection(db, "webinar-alpari");

export { db, testCollection };
