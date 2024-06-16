// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyDRSiLn8qOhaOPPLEvFibNZENgdFzh7BiI",
    authDomain: "koto-ba8c5.firebaseapp.com",
    projectId: "koto-ba8c5",
    storageBucket: "koto-ba8c5.appspot.com",
    messagingSenderId: "607985514444",
    appId: "1:607985514444:web:f3de977f821bc3e0e2cf69",
    measurementId: "G-NMSKD36JC4"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});