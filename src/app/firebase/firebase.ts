import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSgY9-mLQa8tkamdyjX66dp5zvVfBIOVk",
  authDomain: "xxx.firebaseapp.com",
  projectId: "coinpay-afd4a",
  storageBucket: "xxx.appspot.com",
  messagingSenderId: "xxx",
  appId: "1:233938846543:android:0f199dd42a028d18eabb3a",
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