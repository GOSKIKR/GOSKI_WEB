import React, { Dispatch, SetStateAction } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

// 알림 데이터
const notifications = [
  {
    detail: "lesson1",
    lessonDate: "2021-09-01",
    lessonTime: "14:00",
    resortName: "resort",
    studentCount: 2,
    lessonType: "group",
  },
  {
    detail: "lesson2",
    lessonDate: "2021-09-01",
    lessonTime: "14:00",
    resortName: "resort",
    studentCount: 2,
    lessonType: "group",
  },
  {
    detail: "lesson",
    lessonDate: "2021-09-01",
    lessonTime: "14:00",
    resortName: "resort",
    studentCount: 2,
    lessonType: "group",
  },
];

type NotificationItemProps = {
  detail: string;
  lessonDate: string;
  lessonTime: string;
};

const NotificationItem = ({
  detail,
  lessonDate,
  lessonTime,
}: NotificationItemProps) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 border-b last:border-b-0">
    <div className="text-sm sm:text-base">{detail}</div>
    <div className="text-sm sm:text-base">{lessonDate}</div>
    <div className="text-sm sm:text-base">{lessonTime}</div>
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
  const handleNotificationBtn = () => {
    setShowNotification(!showNotification);
    setShowSettings(false);
  };

  return (
    <div className="relative flex items-center justify-center w-10 h-10">
      <button
        onClick={handleNotificationBtn}
        className="text-2xl p-2 rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label="Notifications"
      >
        <IoMdNotificationsOutline />
      </button>
      {showNotification && (
        <div className="absolute top-12 right-0 z-50 w-64 p-2 bg-white rounded-lg shadow-lg">
          <div className="w-full bg-primary-400 text-white text-center py-2 rounded-t-lg">
            알림
          </div>
          <div className="flex flex-col p-2">
            {notifications.map((notification, index) => (
              <NotificationItem
                key={index}
                detail={notification.detail}
                lessonDate={notification.lessonDate}
                lessonTime={notification.lessonTime}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserNotification;
