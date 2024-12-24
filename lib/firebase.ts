import { getFirestore } from 'firebase/firestore';
import { getApp, getApps, initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyC0pAPBCpeuiIGSkfJFUdQAuUdryDXmqaM",
  authDomain: "ask-gpt-459fc.firebaseapp.com",
  projectId: "ask-gpt-459fc",
  storageBucket: "ask-gpt-459fc.firebasestorage.app",
  messagingSenderId: "662088493329",
  appId: "1:662088493329:web:b5fcdf30b956986b5f44b0"
};

// const app = initializeApp(firebaseConfig);
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};