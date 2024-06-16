import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { onMessageListener, requestForToken } from './firebase-config';


function App() {
  const [message, setMessage] = useState(null);
  const [permission, setPermission] = useState(Notification.permission);

  useEffect(() => {
    if (permission === 'default') {
      showRequestNotificationUI();
    }
  }, [permission]);


  useEffect(() => {
    // ขอสิทธิ์และรับ token
    requestForToken();

    // ฟังข้อความที่เข้ามา
    onMessageListener((payload:any) => {
      console.log('Message received app.tsx : ', payload);
      setMessage(payload.notification);
      showBrowserNotification(payload.notification);
    });

  }, []);

  const showBrowserNotification = (notification:any) => {
    if (Notification.permission === 'granted') {
      console.log('noti alert')
      new Notification(notification.title, {
        body: notification.body,
        icon: '/firebase-logo.png',
      });
    }
  };

  const showRequestNotificationUI = () => {
    // แสดง UI ที่กระตุ้นให้ผู้ใช้เปิดการแจ้งเตือน
    alert('Please allow notifications to stay updated with our latest news.');
    requestNotificationPermission();
  };

  const requestNotificationPermission = () => {
    Notification.requestPermission().then((permission) => {
      setPermission(permission);
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }
    });
  };

  return (
    <div className="App">
      สวัสดีชาวโลก
    </div>
  );
}

export default App;
