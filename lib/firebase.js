// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore  } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbBoIs3b79ikhxt-hXKiSGkaGE1nRcGnU",
  authDomain: "lewisdevs-eb735.firebaseapp.com",
  projectId: "lewisdevs-eb735",
  storageBucket: "lewisdevs-eb735.appspot.com",
  messagingSenderId: "1014592639524",
  appId: "1:1014592639524:web:39170d96d21d2f861fbeb1",
  measurementId: "G-J21W7HM5XD"
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

