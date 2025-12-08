// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk0snfesd3PFMA7fPuS0hQJ4cgBOZDviE",
  authDomain: "marketplace-ug-a9bd5.firebaseapp.com",
  projectId: "marketplace-ug-a9bd5",
  storageBucket: "marketplace-ug-a9bd5.appspot.com",
  messagingSenderId: "401110359190",
  appId: "1:401110359190:web:5b662eedcc5d7f6808f6b7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
