import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAeR9uugGAmbjRrAZjuq8svobjkA0-uSdA",
  authDomain: "fir-cadastro-39efc.firebaseapp.com",
  projectId: "fir-cadastro-39efc",
  storageBucket: "fir-cadastro-39efc.appspot.com",
  messagingSenderId: "837476357271",
  appId: "1:837476357271:web:41be6016c27485fe5105d2",
  measurementId: "G-P2CJYCGNSE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };