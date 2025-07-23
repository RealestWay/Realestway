// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdpFNQEumHplb1HGAvjCmLjPGqyBeTCOM",
  authDomain: "pushnotifications-848e4.firebaseapp.com",
  projectId: "pushnotifications-848e4",
  storageBucket: "pushnotifications-848e4.firebasestorage.app",
  messagingSenderId: "518234205053",
  appId: "1:518234205053:web:8285ceedd4d201c6273a14",
  measurementId: "G-01F6G1NTS3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
// const analytics = getAnalytics(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  //   console.log(permission);
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BKmBxDsvVKFOIpP1oTc44MwExv0fBJlpQVYuY3V3yAzHvxXzLZWPbPc1pzjjWt5H_vuokz8_O_WhaZ3_gdSz_Iw",
    });
    // console.log(token);
  }
};
