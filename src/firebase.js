import firebase from 'firebase/compat/app';
import { getFirestore}  from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCGoILgNSoPnDQsF9fRJVWcaP2FjlL9vYI",
    authDomain: "movie-recommendation-56b3c.firebaseapp.com",
    projectId: "movie-recommendation-56b3c",
    storageBucket: "movie-recommendation-56b3c.appspot.com",
    messagingSenderId: "823305728156",
    appId: "1:823305728156:web:ae524ad7820229337cfd59"
  };

const firebaseAdmin = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseAdmin);
const auth = getAuth(firebaseAdmin);
const analytics = getAnalytics(firebaseAdmin);
const provider = new GoogleAuthProvider();

export { auth, db, provider, analytics };