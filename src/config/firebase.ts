import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {

  apiKey: "AIzaSyC6XhIZnZ1F7goHriXqZx7zNwk8UE80qB0",

  authDomain: "projetapp1-158c2.firebaseapp.com",

  projectId: "projetapp1-158c2",

  storageBucket: "projetapp1-158c2.firebasestorage.app",

  messagingSenderId: "1025410709066",

  appId: "1:1025410709066:web:bba5c867cf86e0ffa7d8b3",

  measurementId: "G-Q8SF3BQ33C"

};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);