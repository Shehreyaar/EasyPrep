import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";


export async function login(email, password,rememberMe = false) {
  const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
  await setPersistence(auth, persistence);

  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  localStorage.setItem("uid", userCredential.user.uid);
  return userCredential;
}

export async function register(email, password, firstName, lastName, phoneNumber, address) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: `${firstName} ${lastName}` });

  const userRef = doc(db, "users", userCredential.user.uid);
  await setDoc(userRef, {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    address
  });

  return userCredential;
}

export async function forgotPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error("Password reset error:", error);
    throw error;
  }
}