import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDJEv30W6LCc6mA-K-zhk6j8waKCQuuieQ",
    authDomain: "kd-proj-db.firebaseapp.com",
    projectId: "kd-proj-db",
    storageBucket: "kd-proj-db.appspot.com",
    messagingSenderId: "1085095514392",
    appId: "1:1085095514392:web:a256f33dd8a64729324e6d",
    measurementId: "G-MQ8070HH63"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Database
const auth = getAuth(app);
const database = getDatabase(app);

// Export the initialized services
export { auth, database };
