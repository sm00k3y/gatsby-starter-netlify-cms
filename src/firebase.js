import firebase from "firebase/app"
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBy3f5K1jds9fvlCHyOhI8g0qEhTKIHRvg",
  authDomain: "commentsdb-77e45.firebaseapp.com",
  databaseURL: "https://commentsdb-77e45-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "commentsdb-77e45",
  storageBucket: "commentsdb-77e45.appspot.com",
  messagingSenderId: "666547385085",
  appId: "1:666547385085:web:0261e4625013ee43b70494"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
// export const firebaseRef = firebase.database().ref("comments");