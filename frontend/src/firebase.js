import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyCRuI7nuTJreYg5EyD7TMhLX6W3nP0-tJ8",
    authDomain: "easyprep-133e8.firebaseapp.com",
    projectId: "easyprep-133e8",
    storageBucket: "easyprep-133e8.appspot.app",
    messagingSenderId: "1042611696415",
    appId: "1:1042611696415:web:f4281a6c3ffc805fdf362a"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);