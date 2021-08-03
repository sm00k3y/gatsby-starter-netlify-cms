import firebase from "firebase/app"
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyDE0cBNM-t2cSBfH3fLNTLvLmB68fE1Oiw",
  authDomain: "comment-db-cc329.firebaseapp.com",
  projectId: "comment-db-cc329",
  storageBucket: "comment-db-cc329.appspot.com",
  messagingSenderId: "465654972217",
  appId: "1:465654972217:web:c6c23576f1f2a956fe72e8"
};

firebase.initializeApp(firebaseConfig)

export const firebaseRef = firebase.database().ref()