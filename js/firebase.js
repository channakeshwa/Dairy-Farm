// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM6YNEW6E9Bs-betV5AjCS2tHdoX7l2Fo",
  authDomain: "laxmi-dairy-farm-89311.firebaseapp.com",
  projectId: "laxmi-dairy-farm-89311",
  storageBucket: "laxmi-dairy-farm-89311.firebasestorage.app",
  messagingSenderId: "640382243526",
  appId: "1:640382243526:web:6e1eb19de92c349374fdc7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Database
const db = getFirestore(app);

// Export database
export { db };
