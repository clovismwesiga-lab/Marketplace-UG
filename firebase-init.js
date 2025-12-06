// Firebase v10 (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBk0snfesd3PFMA7fPuS0hQJ4cgBOZDviE",
  authDomain: "marketplace-ug-a9bd5.firebaseapp.com",
  projectId: "marketplace-ug-a9bd5",
  storageBucket: "marketplace-ug-a9bd5.firebasestorage.app",
  messagingSenderId: "401110359190",
  appId: "1:401110359190:web:ae6c7e7dfdd0e45008f6b7"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
