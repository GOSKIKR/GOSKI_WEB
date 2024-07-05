import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline, IoMdLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import UserNotification from "../user/UserNotification";
import UserSettings from "../user/UserSettings";

const NavbarUser = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLoginBtn = () => {
    navigate("/login");
  };

  const handleNotificationBtn = () => {
    setShowNotification(!showNotification);
  };

  return (
    <div className="flex flex-row h-12 w-full justify-between items-center bg-primary-600 px-4 shadow-md z-50">
      <div
        onClick={() => navigate("/")}
        className="text-white text-2xl font-bold cursor-pointer"
      >
        GOSKI
      </div>
      <div className="flex flex-1 pl-10 justify-start space-x-8">
        <div
          onClick={() => navigate("/reserve/set")}
          className="text-white text-lg cursor-pointer hover:text-primary-300 transition duration-300"
        >
          강습 예약
        </div>
        <div
          onClick={() => navigate("/notice")}
          className="text-white text-lg cursor-pointer hover:text-primary-300 transition duration-300"
        >
          이용 안내
        </div>
      </div>
      {isLogin ? (
        <div className="flex items-center space-x-6">
          <UserNotification />
          <UserSettings />
          <div
            className="flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer"
            onClick={() => setIsLogin(false)}
          >
            <IoMdLogOut className="text-primary-600 text-2xl" />
          </div>
          <div className="cursor-pointer" onClick={() => navigate("/user/my")}>
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <div
            onClick={() => {
              setIsLogin(true);
              handleLoginBtn();
            }}
            className="text-white text-lg cursor-pointer hover:text-primary-300 transition duration-300"
          >
            로그인
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarUser;
