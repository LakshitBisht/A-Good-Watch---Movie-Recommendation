import firebase from 'firebase/compat/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCGoILgNSoPnDQsF9fRJVWcaP2FjlL9vYI",
    authDomain: "movie-recommendation-56b3c.firebaseapp.com",
    projectId: "movie-recommendation-56b3c",
    storageBucket: "movie-recommendation-56b3c.appspot.com",
    messagingSenderId: "823305728156",
    appId: "1:823305728156:web:ae524ad7820229337cfd59"
  };

const firebaseAdmin = firebase.initializeApp(firebaseConfig);
const auth = getAuth(firebaseAdmin);
const provider = new GoogleAuthProvider();

export { auth, provider };