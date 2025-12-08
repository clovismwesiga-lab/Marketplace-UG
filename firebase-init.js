// Initialize Firebase App
const app = firebase.initializeApp(firebaseConfig);

// Firestore
const db = firebase.firestore();

// Storage (for future images)
const storage = firebase.storage();

// Make these available globally
window.db = db;
window.storage = storage;
