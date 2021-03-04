import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBRHc9VHbbwr30kKL07sBFrzFEgH981h54",
  authDomain: "ebook-clone-a1587.firebaseapp.com",
  projectId: "ebook-clone-a1587",
  storageBucket: "ebook-clone-a1587.appspot.com",
  messagingSenderId: "646487775477",
  appId: "1:646487775477:web:31725d4fe5bf37e62b4dbc",
  measurementId: "G-M349QG1EV0",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
