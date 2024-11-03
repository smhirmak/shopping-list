// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCTlvXu49QQoTL4VZ-v0Egm8dnJSR8YjW4',
  authDomain: 'shopping-list-36541.firebaseapp.com',
  projectId: 'shopping-list-36541',
  storageBucket: 'shopping-list-36541.firebasestorage.app',
  messagingSenderId: '769492863961',
  appId: '1:769492863961:web:3495fac54c0b4bca84e7c8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
