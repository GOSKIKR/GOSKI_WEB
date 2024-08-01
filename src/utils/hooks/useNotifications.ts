import { useState, useEffect } from "react";
import { getToken, Messaging } from "firebase/messaging";
import apiClient from "../config/axiosConfig";

interface Notification {
  title: string;
  body: string;
  icon: string;
  [key: string]: any;
}

const useNotifications = (messaging: Messaging) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const getNotification = async () => {
    try {
      const accesstoken = sessionStorage.getItem("accesstoken");

      const response = await apiClient().get("/notification", {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      if (response.status === 200) {
        console.log("알림 가져오기 성공:", response.data);
        setNotifications(response.data.data);
      }
    } catch (error) {
      console.error("알림 가져오기 중 오류 발생:", error);
    }
  };

  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted.");

        const currentToken = await getToken(messaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        });
        if (currentToken) {
          console.log("FCM token:", currentToken);
          getNotification(); // 권한이 부여된 후 알림을 가져옴
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      } else {
        console.log("Unable to get permission to notify.");
      }
    } catch (error) {
      console.error("Error requesting permission:", error);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return notifications;
};

export default useNotifications;
