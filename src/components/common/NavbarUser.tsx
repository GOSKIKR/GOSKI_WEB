import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline, IoMdLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import UserNotification from "../user/UserNotification";
import UserSettings from "../user/UserSettings";

import apiClient from "../../utils/config/axiosConfig";

const NavbarUser = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("accesstoken") ? true : false
  );
  const navigate = useNavigate();

  const handleLoginBtn = () => {
    navigate("/login");
  };

  // const logout = async () => {
  //   try {
  //     const encryptedRefreshToken = localStorage.getItem("refreshtoken");
  //     const accessToken = localStorage.getItem("accesstoken");

  //     let refreshToken = null;
  //     if (encryptedRefreshToken) {
  //       try {
  //         refreshToken = await decryptToken(encryptedRefreshToken);
  //       } catch (decryptError) {
  //         console.error("리프레시 토큰 복호화 오류:", decryptError);
  //       }
  //     }

  //     // // 암호화된 리프레시 토큰 복호화
  //     // const refreshToken = encryptedRefreshToken
  //     //   ? await decryptToken(encryptedRefreshToken)
  //     //   : null;

  //     if (!refreshToken) {
  //       console.error("리프레시 토큰이 없거나 복호화할 수 없습니다.");
  //       return false;
  //     }

  //     const response = await apiClient.post("/user/signout", null, {
  //       headers: {
  //         Authorization: `Bearer ${refreshToken}`,
  //         AccessToken: `Bearer ${accessToken}`,
  //       },
  //     });
  //     console.log("로그아웃 응답:", response);

  //     await apiClient.post("/user/signout", null, {
  //       headers: {
  //         Authorization: `Bearer ${refreshToken}`,
  //         AccessToken: `Bearer ${accessToken}`,
  //       },
  //     });

  //     // 로그아웃 성공 후 처리
  //     removeRefreshToken(); // 암호화된 리프레시 토큰 삭제 함수 사용
  //     localStorage.removeItem("accesstoken");
  //     setIsLogin(false);
  //     // 필요한 경우 추가 상태 초기화 로직

  //     return true; // 로그아웃 성공
  //   } catch (error) {
  //     console.error("로그아웃 중 오류 발생:", error);
  //     if (error instanceof Error) {
  //       console.error("에러 메시지:", error.message);
  //       console.error("에러 스택:", error.stack);
  //     }
  //     return false; // 로그아웃 실패
  //   }
  // };

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
