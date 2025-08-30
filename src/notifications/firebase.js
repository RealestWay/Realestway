// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken } from "firebase/messaging";
// // import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCdpFNQEumHplb1HGAvjCmLjPGqyBeTCOM",
//   authDomain: "pushnotifications-848e4.firebaseapp.com",
//   projectId: "pushnotifications-848e4",
//   storageBucket: "pushnotifications-848e4.firebasestorage.app",
//   messagingSenderId: "518234205053",
//   appId: "1:518234205053:web:8285ceedd4d201c6273a14",
//   measurementId: "G-01F6G1NTS3",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const messaging = getMessaging(app);
// // const analytics = getAnalytics(app);

// export const generateToken = async () => {
//   const permission = await Notification.requestPermission();
//   //   console.log(permission);
//   if (permission === "granted") {
//     const token = await getToken(messaging, {
//       vapidKey:
//         "BKmBxDsvVKFOIpP1oTc44MwExv0fBJlpQVYuY3V3yAzHvxXzLZWPbPc1pzjjWt5H_vuokz8_O_WhaZ3_gdSz_Iw",
//     });
//     // console.log(token);
//   }
// };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
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

// Function to detect device information
const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  let deviceType = "web";
  let deviceName = "Unknown Browser";
  let deviceOS = "Unknown OS";

  // Detect device type
  if (/android/i.test(userAgent)) {
    deviceType = "android";
  } else if (/iPad|iPhone|iPod/.test(userAgent)) {
    deviceType = "ios";
  }

  // Detect browser
  if (/Chrome/.test(userAgent) && !/Edg/.test(userAgent)) {
    deviceName = "Chrome";
  } else if (/Firefox/.test(userAgent)) {
    deviceName = "Firefox";
  } else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) {
    deviceName = "Safari";
  } else if (/Edg/.test(userAgent)) {
    deviceName = "Edge";
  }

  // Detect OS
  if (/Windows/.test(userAgent)) {
    deviceOS = "Windows";
  } else if (/Mac/.test(userAgent)) {
    deviceOS = "macOS";
  } else if (/Linux/.test(userAgent)) {
    deviceOS = "Linux";
  } else if (/Android/.test(userAgent)) {
    deviceOS =
      "Android " + (userAgent.match(/Android\s([0-9.]+)/) || [])[1] || "";
  } else if (/iOS|iPhone OS/.test(userAgent)) {
    deviceOS =
      "iOS " +
        (userAgent.match(/OS\s([0-9_]+)/) || [])[1]?.replace(/_/g, ".") || "";
  }

  return {
    device_type: deviceType,
    device_name: deviceName,
    device_os: deviceOS.trim(),
  };
};

// Function to save token to API
const saveTokenToAPI = async (token, deviceInfo) => {
  try {
    const response = await fetch(
      "https://backend.realestway.com/api/notification-tokens",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          token: token,
          device_type: deviceInfo.device_type,
          device_name: deviceInfo.device_name,
          device_os: deviceInfo.device_os,
          // Uncomment and add user_id if available
          // user_id: "USER_ID_HERE"
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Token saved successfully:", data);
    return data;
  } catch (error) {
    console.error("Error saving token to API:", error);
    throw error;
  }
};

export const generateToken = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BKmBxDsvVKFOIpP1oTc44MwExv0fBJlpQVYuY3V3yAzHvxXzLZWPbPc1pzjjWt5H_vuokz8_O_WhaZ3_gdSz_Iw",
      });

      console.log("FCM Token generated:", token);

      if (token) {
        // Get device information
        const deviceInfo = getDeviceInfo();
        console.log("Device info:", deviceInfo);

        // Save token to API
        await saveTokenToAPI(token, deviceInfo);

        return token;
      }
    } else {
      console.log("Notification permission denied");
    }
  } catch (error) {
    console.error("Error generating or saving token:", error);
    throw error;
  }
};

// Optional: Function to get the current token if already generated
export const getCurrentToken = async () => {
  try {
    const token = await getToken(messaging);
    return token;
  } catch (error) {
    console.error("Error getting current token:", error);
    return null;
  }
};
