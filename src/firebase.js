import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, browserLocalPersistence, setPersistence } from "firebase/auth";
const config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
};

// Initialize Firebase
const app = initializeApp(config);

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function logIn () {
    return await signInWithPopup(auth, provider);
}
export function logOut () {
    signOut(auth);
}
export function getUser () {
    return auth.currentUser;
}