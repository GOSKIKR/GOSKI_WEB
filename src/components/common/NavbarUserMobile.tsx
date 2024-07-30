import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoMdNotificationsOutline,
  IoMdLogOut,
  IoMdPerson,
  IoMdSettings,
} from "react-icons/io";
import UserNotification from "../user/UserNotification";
import MobileSettingModal from "./MobileSettingModal";

import axios from "axios";

import apiClient from "../../utils/config/axiosConfig";

type ProfileData = {
  birthDate: string;
  email: string;
  gender: string;
  phoneNumber: string;
  profileUrl: string;
  role: string;
  userName: string;
};

const NavbarUserMobile = () => {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("accesstoken") ? true : false
  );
  const [showMenu, setShowMenu] = useState(false);
  const [animateMenu, setAnimateMenu] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    birthDate: "",
    email: "",
    gender: "",
    phoneNumber: "",
    profileUrl: "",
    role: "",
    userName: "",
  });

  const navigate = useNavigate();

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshtoken");
      const accessToken = localStorage.getItem("accesstoken");

      await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/signout`, {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
          AccessToken: `Bearer ${accessToken}`,
        },
      });

      // 로그아웃 성공 후 처리
      localStorage.removeItem("refreshtoken");
      localStorage.removeItem("accesstoken");
      setIsLogin(false);

      return true; // 로그아웃 성공
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("refreshtoken");
      return false; // 로그아웃 실패
    }
  };

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate("/");
    } else {
      // 로그아웃 실패 시 사용자에게 알림
      alert("로그아웃 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
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

  // 로그인시 사용자 정보 불러오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem("accesstoken");

        const response = await apiClient().get("/user/profile/user", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log("response:", response);
        setProfileData(response.data.data);

        if (response.status === 200) {
          console.log("사용자 정보 불러오기 성공:", response.data);
        }
      } catch (error) {
        console.error("사용자 정보 불러오기 중 오류 발생:", error);
      }
    };

    if (isLogin) {
      fetchUser();
    }
  }, [isLogin]);

  return (
    <div className="flex w-full h-12 bg-primary-600  items-center px-4 relative">
      <div
        className="flex-1 text-2xl text-white font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        GOSKI
      </div>
      {!isLogin ? (
        <div
          className="text-white cursor-pointer"
          onClick={() => navigate("/login")}
        >
          로그인
        </div>
      ) : (
        <>
          <UserNotification
            showNotification={showNotification}
            setShowNotification={setShowNotification}
            setShowSettings={setShowSettings}
          />
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
        </>
      )}

      {showSetting && (
        <MobileSettingModal showSettingModal={handleCloseSettingModal} />
      )}
    </div>
  );
};

export default NavbarUserMobile;
