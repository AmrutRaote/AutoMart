// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "car-market-place-b5276.firebaseapp.com",
    projectId: "car-market-place-b5276",
    storageBucket: "car-market-place-b5276.appspot.com",
    messagingSenderId: "990975316105",
    appId: "1:990975316105:web:02b302f037ded3dcaa3658"
};

// Initialize Firebase
const app = initializeApp( firebaseConfig );
export const storage = getStorage( app );