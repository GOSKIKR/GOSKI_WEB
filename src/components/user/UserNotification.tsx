import React, { useState } from "react";
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

const UserNotification = () => {
  const [showNotification, setShowNotification] = useState(false);

  const handleNotificationBtn = () => {
    setShowNotification(!showNotification);
  };

  return (
    <div className="flex flex-row justify-around w-10 h-10 box-border">
      <div
        onClick={handleNotificationBtn}
        className="relative flex items-center justify-center w-10 h-10 p-5 bg-white rounded-full cursor-pointer box-border"
      >
        <button className="text-2xl">
          <IoMdNotificationsOutline />
        </button>
        {showNotification && (
          <div className="absolute z-50 w-40 h-auto p-2 bg-white rounded-lg shadow-lg top-10 sm:w-64">
            <div className="w-full h-10 bg-primary-400 text-white text-center flex items-center justify-center rounded-t-lg">
              알림
            </div>
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 border-b last:border-b-0"
              >
                <div className="text-sm sm:text-base">
                  {notification.detail}
                </div>
                <div className="text-sm sm:text-base">
                  {notification.lessonDate}
                </div>
                <div className="text-sm sm:text-base">
                  {notification.lessonTime}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNotification;
