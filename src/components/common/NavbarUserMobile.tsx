import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoMdNotificationsOutline,
  IoMdLogOut,
  IoMdPerson,
  IoMdSettings,
} from "react-icons/io";
import UserNotification from "../user/UserNotification";
import MobileSettingModal from "./MobileSettingModal";

const NavbarUserMobile = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [animateMenu, setAnimateMenu] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 로직 추가
    setIsLogin(false);
    navigate("/login");
  };

  const handleShowMenu = () => {
    if (showMenu) {
      setAnimateMenu(false);
      setTimeout(() => setShowMenu(false), 300);
    } else {
      setShowMenu(true);
      setAnimateMenu(true);
    }
  };

  const handleCloseMenu = () => {
    setAnimateMenu(false);
    setTimeout(() => setShowMenu(false), 300);
  };

  const handleShowSettingModal = () => {
    setShowSetting(true);
  };

  const handleCloseSettingModal = () => {
    setShowSetting(false);
  };

  return (
    <div className="flex w-full h-12 bg-primary-600  items-center px-4 relative">
      <div
        className="flex-1 text-2xl text-white font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        GOSKI
      </div>
      <UserNotification />
      <div className="flex items-center text-white">
        <div onClick={() => handleShowMenu()} className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        {showMenu && (
          <div
            className={`z-50 fixed h-full right-0 top-12  w-48 bg-white shadow-xl rounded-l-lg flex flex-col ${
              animateMenu ? "animate-slideIn" : "animate-slideOut"
            }`}
          >
            <button
              className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => {
                handleCloseMenu();
                navigate("/user/my");
              }}
            >
              <IoMdPerson className="mr-2" /> 프로필
            </button>
            <button
              className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => {
                handleCloseMenu();
                handleShowSettingModal();
              }}
            >
              <IoMdSettings className="mr-2" /> 설정
            </button>
            <button
              className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => {
                handleCloseMenu();
                handleLogout();
              }}
            >
              <IoMdLogOut className="mr-2" /> 로그아웃
            </button>
          </div>
        )}
      </div>
      {showSetting && (
        <MobileSettingModal showSettingModal={handleCloseSettingModal} />
      )}
    </div>
  );
};

export default NavbarUserMobile;
