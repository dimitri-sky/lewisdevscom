// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore  } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };

export const addData = async (userId, collectionName, data) => {
  const colRef = collection(db, `users/${userId}/${collectionName}`);
  await addDoc(colRef, data);
};
  
export const updateData = async (userId, collectionName, docId, data) => {
  const docRef = doc(db, `users/${userId}/${collectionName}/${docId}`);
  await updateDoc(docRef, data);
};


export const deleteData = async (userId, collectionName, docId) => {
  const docRef = doc(db, `users/${userId}/${collectionName}/${docId}`);
  await deleteDoc(docRef);
};


  
export const getData = async (userId, collectionName) => {
    const q = query(collection(userId, collectionName));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

