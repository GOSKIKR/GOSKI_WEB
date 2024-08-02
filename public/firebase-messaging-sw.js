// http 이슈로 주석처리
// // Firebase SDK 버전 9.0.0 사용
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
// );

// // Firebase SDK 구성
// const firebaseConfig = {
//   apiKey: "AIzaSyCoHMZHn-vriuD_okSLUXIAV6czS8yyd_E",
//   authDomain: "goski-student.firebaseapp.com",
//   projectId: "goski-student",
//   storageBucket: "goski-student.appspot.com",
//   messagingSenderId: "870208891269",
//   appId: "1:870208891269:web:c8507c0253f5cc2c0cbcec",
//   measurementId: "G-D0SNXBW97R",
// };

// // Firebase 초기화
// firebase.initializeApp(firebaseConfig);

// // Firebase messaging 인스턴스 생성
// const messaging = firebase.messaging();

// // 백그라운드 메시지 수신
// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );

//   // 알림 형태 커스텀
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "/firebase-logo.png", // 필요하면 바꾸기
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
