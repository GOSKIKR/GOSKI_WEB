import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../utils/config/axiosConfig";
import axios from "axios";
import useLoginStore from "../../store/loginStore";

import UserNotification from "../user/UserNotification";

const NavbarInstructorMobile = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [animateMenu, setAnimateMenu] = useState(false);
  const [isLogin, setIsLogin] = useState(
    sessionStorage.getItem("accesstoken") ? true : false
  );

  const { role } = useLoginStore();

  const [showSettings, setShowSettings] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const navigate = useNavigate();

  // const handleLogout = async () =>  {
  //   // 로그아웃 로직 추가
  //   try {
  //     const refreshToken = sessionStorage.getItem("refreshtoken")
  //     const accessToken = sessionStorage.getItem("accesstoken");

  //     await apiClient().get("/user/signout", {
  //       headers: {
  //         Authorization: `Bearer ${refreshToken}`,
  //         AccessToken: `Bearer ${accessToken}`,
  //       },
  //     });

  //     // 로그아웃 성공 후 처리
  //     sessionStorage.removeItem("refreshtoken");
  //     sessionStorage.removeItem("accesstoken");
  //     setIsLogin(false);
  //     sessionStorage.removeItem("instructor-store")
  //     sessionStorage.removeItem("login-store")
  //     navigate("/login");
  //     return true; // 로그아웃 성공
  //   } catch (error) {
  //     console.error("로그아웃 중 오류 발생:", error);
  //     sessionStorage.removeItem("accesstoken");
  //     sessionStorage.removeItem("refreshtoken");
  //     return false; // 로그아웃 실패
  //   }
  // };

  const handleLogout = async () => {
    try {
      const refreshToken = sessionStorage.getItem("refreshtoken");
      const accessToken = sessionStorage.getItem("accesstoken");

      await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/signout`, {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
          AccessToken: `Bearer ${accessToken}`,
        },
      });

      // 로그아웃 성공 후 처리
      sessionStorage.removeItem("refreshtoken");
      sessionStorage.removeItem("accesstoken");
      setIsLogin(false);
      sessionStorage.removeItem("instructor-store");
      sessionStorage.removeItem("login-store");
      navigate("/login");

      return true; // 로그아웃 성공
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
      sessionStorage.removeItem("accesstoken");
      sessionStorage.removeItem("refreshtoken");
      return false; // 로그아웃 실패
    }
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
      <UserNotification
        showNotification={showNotification}
        setShowNotification={setShowNotification}
        setShowSettings={setShowSettings}
      />
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
              onClick={() => {
                navigate("/instructor/edit-info");
              }}
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
            <br />
            <hr />
            <br />
            <button
              className="px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => {
                navigate("/instructor/edit-info");
              }}
            >
              스케줄
            </button>
            <button
              className="px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => {
                navigate("/instructor/team/regist");
              }}
            >
              팀관리
            </button>
            <button
              className="px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => {
                navigate("/instructor/my-lesson");
              }}
            >
              강습내역
            </button>
            {role === "INSTRUCTOR" && (
              <button
              className="px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => {
                navigate("/instructor/settlement");
              }}
              >
              정산
              </button>
          )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarInstructorMobile;
