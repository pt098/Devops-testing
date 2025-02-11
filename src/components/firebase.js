// components/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAhM49j-pXR_6W0Nrd0lS5zDNrIOcSaZfA",
    authDomain: "task8-1d-39048.firebaseapp.com",
    projectId: "task8-1d-39048",
    storageBucket: "task8-1d-39048.appspot.com",
    messagingSenderId: "352002070241",
    appId: "1:352002070241:web:4cab2eda4b12e14f8c49a0",
    measurementId: "G-BC98FY5SDJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
