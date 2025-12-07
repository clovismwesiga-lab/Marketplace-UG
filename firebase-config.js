// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBk0snfesd3PFMA7fPuS0hQJ4cgBOZDviE",
  authDomain: "marketplace-ug-a9bd5.firebaseapp.com",
  projectId: "marketplace-ug-a9bd5",
  storageBucket: "marketplace-ug-a9bd5.firebasestorage.app",
  messagingSenderId: "401110359190",
  appId: "1:401110359190:web:5b662eedcc5d7f6808f6b7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
