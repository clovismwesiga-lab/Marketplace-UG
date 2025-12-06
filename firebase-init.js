// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBk0snfesd3PFMA7fPuS0hQJ4cgBOZDviE",
  authDomain: "marketplace-ug-a9bd5.firebaseapp.com",
  projectId: "marketplace-ug-a9bd5",
  storageBucket: "marketplace-ug-a9bd5.firebasestorage.app",
  messagingSenderId: "401110359190",
  appId: "1:401110359190:web:ae6c7e7dfdd0e45008f6b7"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
