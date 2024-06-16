// src/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDRSiLn8qOhaOPPLEvFibNZENgdFzh7BiI",
    authDomain: "koto-ba8c5.firebaseapp.com",
    projectId: "koto-ba8c5",
    storageBucket: "koto-ba8c5.appspot.com",
    messagingSenderId: "607985514444",
    appId: "1:607985514444:web:f3de977f821bc3e0e2cf69",
    measurementId: "G-NMSKD36JC4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const analytics = getAnalytics(app);

const vapidKey = 'BOqZSSYu8k2Rw_NA4tvLgfos189dGKNm2DF4ba-7iMVzpF8YKzLp_XLt8hZ77tAbwAdUHJEh3VpfxlXllcUR53w';

export const requestForToken = () => {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      getToken(messaging, { vapidKey: vapidKey })
        .then((currentToken) => {
          if (currentToken) {
            console.log('current token for client: ', currentToken);
            // Perform any other necessary action with the token
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
    } else if (permission === 'denied') {
      console.log('Notification permission denied.');
      // Inform the user how to enable notifications in the browser settings
    } else {
      console.log('Notification permission not granted.');
    }
  });
};


onTokenRefresh(() => {
  getToken(messaging, { vapidKey: vapidKey }).then((refreshedToken) => {
    console.log('Token refreshed.');
    // ส่ง refreshed token ไปยังเซิร์ฟเวอร์ของคุณเพื่อแทนที่ token เดิม
  }).catch((err) => {
    console.log('Unable to retrieve refreshed token ', err);
  });
});

// //promise ถูกเรียกใช้เพียงครั้งเดียว
// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       console.log('Message received. ', payload);
//       resolve(payload);
//     });
//   });

  export const onMessageListener = (callback) => {
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      callback(payload);
    });
  };


