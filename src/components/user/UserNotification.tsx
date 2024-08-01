import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import apiClient from "../../utils/config/axiosConfig";

type NotificationContentProps = {
  id: number;
  detail?: string;
  lessonDate?: string;
  lessonTime?: string;
  resortName?: string;
  studentCount?: string;
  lessonType?: string;
  read?: boolean;
};

type NotificationContentErrorProps = {
  id: number;
  content: string;
  error: string;
  title: string;
};

type NotificationItemProps = NotificationContentProps & {
  handleDelete: (id: number) => void;
};

const NotificationItem = ({
  id,
  detail,
  lessonDate,
  lessonTime,
  resortName,
  studentCount,
  lessonType,
  handleDelete,
}: NotificationItemProps) => (
  <div className="flex flex-col p-4 my-2 bg-white rounded-lg shadow-md cursor-pointer">
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
        <div className="text-lg font-semibold">{detail}</div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(id);
        }}
        className="text-red-500 hover:text-red-700 transition duration-300"
      >
        삭제
      </button>
    </div>
    <div className="mt-2 text-sm text-gray-600">
      <div>{lessonDate}</div>
      <div>{lessonTime}</div>
      <div>{resortName}</div>
      <div>{studentCount}</div>
      <div>{lessonType}</div>
    </div>
  </div>
);

interface UserNotificationProps {
  showNotification: boolean;
  setShowNotification: Dispatch<SetStateAction<boolean>>;
  setShowSettings: Dispatch<SetStateAction<boolean>>;
}

const UserNotification = ({
  showNotification,
  setShowNotification,
  setShowSettings,
}: UserNotificationProps): JSX.Element => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [notificationContent, setNotificationContent] = useState<
    (NotificationContentProps | NotificationContentErrorProps)[]
  >([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await apiClient().get("/notification");
        if (response.status === 200) {
          console.log("전체 알림 조회 성공:", response.data);
          setNotifications(response.data.data);
        }
      } catch (error) {
        console.error("전체 알림 조회 중 오류 발생:", error);
      }
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    const parsedNotifications = notifications.map((notification: any) => {
      if (typeof notification.content === "string") {
        try {
          const parsedContent = JSON.parse(notification.content);
          return {
            id: notification.notificationId,
            ...parsedContent,
          };
        } catch (error) {
          console.error(
            `Error parsing JSON for notification with id ${notification.notificationId}:`,
            error
          );
          return {
            id: notification.notificationId,
            content: notification.content,
            error: "Invalid JSON format",
            title: "Invalid Notification",
          };
        }
      }
      return notification;
    });
    setNotificationContent(parsedNotifications);
  }, [notifications]);

  const [unreadCount, setUnreadCount] = useState(0);

  const handleNotificationBtn = () => {
    setShowNotification(!showNotification);
    setShowSettings(false);
  };

  useEffect(() => {
    setUnreadCount(
      notificationContent.reduce((count, notification) => {
        if ("read" in notification && !notification.read) {
          return count + 1;
        }
        return count;
      }, 0)
    );
  }, [notificationContent]);

  const handleRead = async () => {
    try {
      const response = await apiClient().patch(`/notification/read-all`);
      if (response.status === 200) {
        console.log("알림 읽음 처리 성공:", response.data);
        setNotificationContent((prev) =>
          prev.map((notification) =>
            "read" in notification
              ? { ...notification, read: true }
              : notification
          )
        );
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("알림 읽음 처리 중 오류 발생:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await apiClient().delete(`/notification/delete/${id}`);
      if (response.status === 200) {
        console.log("알림 삭제 성공:", response.data);
        setNotificationContent((prev) =>
          prev.filter((notification) => notification.id !== id)
        );
        setUnreadCount((prev) => prev - 1);
      }
    } catch (error) {
      console.error("알림 삭제 중 오류 발생:", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const response = await apiClient().delete(`/notification/delete-all`);
      if (response.status === 200) {
        console.log("전체 알림 삭제 성공:", response.data);
        setNotificationContent([]);
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("전체 알림 삭제 중 오류 발생:", error);
    }
  };

  const isNotificationContentError = (
    notification: NotificationContentProps | NotificationContentErrorProps
  ): notification is NotificationContentErrorProps => {
    return (notification as NotificationContentErrorProps).error !== undefined;
  };

  return (
    <div className="relative flex items-center justify-center w-10 h-10">
      <button
        onClick={handleNotificationBtn}
        className="text-2xl p-2 rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label="Notifications"
      >
        <IoMdNotificationsOutline />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      {showNotification && (
        <div className="absolute top-12 right-0 z-50 w-64 p-2 bg-white rounded-lg shadow-lg">
          <div className="w-full bg-primary-400 text-white text-center py-2 rounded-t-lg">
            알림
            <button onClick={handleDeleteAll} className="text-red-500 ml-2">
              전체 삭제
            </button>
            <button onClick={handleRead} className="text-blue-500 ml-2">
              읽음 처리
            </button>
          </div>
          <div className="flex flex-col p-2">
            {notificationContent.map((notification, index) =>
              isNotificationContentError(notification) ? (
                <div
                  key={index}
                  className="notification-errr flex flex-col p-4 my-2 bg-white rounded-lg shadow-md cursor-pointer "
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="text-lg font-semibold">
                        {notification.content}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(notification.id);
                      }}
                      className="text-red-500 hover:text-red-700 transition duration-300"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ) : (
                <NotificationItem
                  key={index}
                  {...notification}
                  handleDelete={() => handleDelete(notification.id)}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserNotification;
