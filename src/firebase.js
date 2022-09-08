import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, doc, Firestore, getDocs, getFirestore, limit, orderBy, query, serverTimestamp } from "firebase/firestore";

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

const storage = getStorage(app);

const db = getFirestore(app);

export async function logIn() {
    try {
        const provider = new GoogleAuthProvider();
        const user = await signInWithPopup(auth, provider);
        return user;
    } catch (error) {
        throw error;
    }
}
export function logOut() {
    signOut(auth);
}

export async function uploadVideo(title, file, thumbnail) {
    try {
        const videoRef = ref(storage, `${auth.currentUser.uid}/${title}.mp4`);
        const thumbnailRef = ref(storage, `${auth.currentUser.uid}/${thumbnail.name}`);
        
        // upload to storage
        await uploadBytes(videoRef, file);
        await uploadBytes(thumbnailRef, thumbnail);

        const videoUrl = await getDownloadURL(videoRef);
        const thumbnailUrl = await getDownloadURL(thumbnailRef);
        // add it to firestore
        const result = await addDoc(collection(db, "videos"), {
            uid: auth.currentUser.uid,
            title: title,
            url: videoUrl,
            thumbnail: thumbnailUrl,
            date: serverTimestamp(),
        })
        console.log(result.id);
        return null;
    } catch (error) {
        throw error;
    }
}
export async function getVideos () {
    const q = query(collection(db, "videos"), orderBy("date", "asc"), limit(20));
    const docs = await getDocs(q);
    return docs;
}