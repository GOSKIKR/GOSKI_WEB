import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline, IoMdLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import UserNotification from "../user/UserNotification";
import UserSettings from "../user/UserSettings";

import apiClient from "../../utils/config/axiosConfig";

import { CgProfile } from "react-icons/cg";

// data
// :
// birthDate
// :
// "1995-11-02"
// gender
// :
// "MALE"
// phoneNumber
// :
// "010-9995-5107"
// profileUrl
// :
// ""
// role
// :
// "STUDENT"
// userName
// :
// "승민이"

type ProfileData = {
  birthDate: string;
  email: string;
  gender: string;
  phoneNumber: string;
  profileUrl: string;
  role: string;
  userName: string;
};

const NavbarUser = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("accesstoken") ? true : false
  );

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

  const handleLoginBtn = () => {
    navigate("/login");
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
        setProfileData(response.data);

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

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshtoken");
      const accessToken = localStorage.getItem("accesstoken");

      await apiClient().get("/user/signout", {
        headers: {
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
          <UserNotification
            showNotification={showNotification}
            setShowNotification={setShowNotification}
            setShowSettings={setShowSettings}
          />
          <UserSettings
            setShowNotification={setShowNotification}
            showSettings={showSettings}
            setShowSettings={setShowSettings}
          />
          <div
            className="flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer"
            onClick={() => handleLogout()}
          >
            <IoMdLogOut className="text-primary-600 text-2xl" />
          </div>
          <div className="cursor-pointer" onClick={() => navigate("/user/my")}>
            {profileData.profileUrl ? (
              <img
                src={profileData.profileUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            ) : (
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <CgProfile className="text-2xl" />
              </div>
            )}
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
