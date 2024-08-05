import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserNotification from "../user/UserNotification";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import apiClient from "../../utils/config/axiosConfig";
import { UserService } from "../../api/UserService";
import { UserMyService } from "../../api/UserMyService";
import { UserMyDTO } from "../../dto/UserMyDTO";
import { getRole } from "../../utils/getRole";

import axios from "axios";

const userService = new UserService();
const userMyService = new UserMyService();

const NavbarInstructor = () => {
  const role = getRole();

  const [showNotification, setShowNotification] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isLogin, setIsLogin] = useState(
    sessionStorage.getItem("accesstoken") ? true : false
  );
  const [profileData, setProfileData] = useState<UserMyDTO>({
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

  useEffect(() => {
    const fetchProfile = async () => {
      const response =
        role === "INSTRUCTOR"
          ? await userService.getInstructorProfile()
          : await userMyService.getUserProfile();

      if (response) {
        // console.log(response);
        setProfileData(response);
      }
    };

    if (isLogin) {
      fetchProfile();
    }
  }, [role, isLogin, setProfileData]);

  // const logout = async () => {
  //   try {
  //     const refreshToken = sessionStorage.getItem("refreshtoken");
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

  const logout = async () => {
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

  const handleNavigate = () => {
    role === "OWNER" ? navigate("/instructor/team/regist") : navigate("/instructor/team/edit")
  }

  return (
    <div className="flex flex-row h-12 w-full justify-between items-center bg-primary-200 box-border px-4 z-50">
      <div
        onClick={() => navigate("/instructor/main")}
        className="basis-1/6 text-2xl font-bold cursor-pointer"
      >
        GOSKI
      </div>
      <div className="flex flex-row flex-1 justify-normal">
        <div
          className="text-black sm:text-xl text-sm p-5 cursor-pointer"
          onClick={handleNavigate}
        >
          팀 관리
        </div>
        <div
          className="text-black sm:text-xl text-sm p-5 cursor-pointer"
          onClick={() => navigate("/instructor/my-lesson")}
        >
          강습내역
        </div>
        {role === "OWNER" &&  (
          <div
            className="text-black sm:text-xl text-sm p-5 cursor-pointer"
            onClick={() => navigate("/instructor/settlement")}
          >
            정산
          </div>
        )}
      </div>
      {isLogin ? (
        <div className="basis-1/4 flex flex-row justify-around  box-border">
          <UserNotification
            showNotification={showNotification}
            setShowNotification={setShowNotification}
            setShowSettings={setShowSettings}
          />

          <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer p-5  box-border">
            <button className="text-2xl">
              <IoSettingsOutline />
            </button>
          </div>
          <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer p-5  box-border">
            <button onClick={logout} className="text-2xl">
              <IoMdLogOut />
            </button>
          </div>
          <div className="navbar-user__profile">
            {profileData.profileUrl ? (
              <img
                src={profileData.profileUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => {
                  navigate("/instructor/edit-info");
                }}
              />
            ) : (
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <CgProfile className="text-2xl" />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="basis-1/4 flex flex-row justify-end">
          <div
            onClick={() => {
              setIsLogin(true);
              handleLoginBtn();
            }}
            className="text-white p-5 cursor-pointer"
          >
            로그인
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarInstructor;
