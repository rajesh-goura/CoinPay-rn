import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId:process.env.messagingSenderId,
  appId: process.env.appId,
};

// Initialize Firebase App
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true, // Required for React Native
});

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(firebaseApp, {
  persistence: browserLocalPersistence,
});

export { auth, db };