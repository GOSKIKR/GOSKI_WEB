import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import UserNotification from "../user/UserNotification";

const NavbarUserMobile = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [animateMenu, setAnimateMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 로직 추가
    setIsLogin(false);
    navigate("/login");
  };

  const handleShowMenu = () => {
    // setAnimateMenu(true);
    // setShowMenu(!showMenu);
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

  return (
    <div className="flex w-full h-12 relative">
      <div className="basis-1/6 cursor-pointer" onClick={() => navigate("/")}>
        GOSKI
      </div>
      <div className="flex flex-1"></div>
      <UserNotification />
      <div className="flex">
        <div
          onClick={() => handleShowMenu()}
          className="flex items-center px-4 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
              className="px-4 py-2 text-left hover:bg-gray-100"
              onClick={handleCloseMenu}
            >
              프로필
            </button>
            <button
              className="px-4 py-2 text-left hover:bg-gray-100"
              onClick={handleCloseMenu}
            >
              설정
            </button>
            <button
              className="px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => {
                handleCloseMenu();
                handleLogout();
              }}
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarUserMobile;
