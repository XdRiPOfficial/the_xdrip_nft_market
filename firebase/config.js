// firebase/config.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// this will change to permanent stuff but for now
const firebaseConfig = {
  apiKey: "AIzaSyDGORRyuoH9HU9g14PHG92cBy1PLeJDoXQ",
  authDomain: "xdrip-medals-of-honor.firebaseapp.com",
  projectId: "xdrip-medals-of-honor",
  storageBucket: "xdrip-medals-of-honor.appspot.com",
  messagingSenderId: "568400274652",
  appId: "1:568400274652:web:4f6946ef6faa8774000019",
  measurementId: "G-EZ252GR86P"
};

let app;

let analytics;

if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
}

export default app || null;