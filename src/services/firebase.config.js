// firebase.config.js
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDgELKkgniaoyKIaqf_HGr_ZWZX48UpeFPE",
  authDomain: "geoapp-b9sdlbf.firebaseapp.com",
  projectId: "geoapp-79fqsdfbf",
  storageBucket: "geoapp-7bsqdfkbf.firebasestorage.app",
  messagingSenderId: "1950668138",
  appId: "1:1950916138:web:0a35e19d2ddoraln2685d4e8c4d3",
  measurementId: "G-LJR1HDKJ9XVX4",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}

const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
