import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCVORFS4fUA2_A-bmIEvXDe_vmD9ylkU4k",
  authDomain: "owlie-b27a8.firebaseapp.com",
  projectId: "owlie-b27a8",
  //   storageBucket: "owlie-b27a8.firebasestorage.app",
  // messagingSenderId: "1895571566",
  // appId: "1:1895571566:web:07656c9c78e7ce0a6a867f",
  // measurementId: "G-NZYT4W2BMX"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
