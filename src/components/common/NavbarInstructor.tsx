import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import UserNotification from "../user/UserNotification";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";

const NavbarInstructor = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [showNotification, setShowNotification] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const navigate = useNavigate();

  const handleLoginBtn = () => {
    navigate("/login");
  };

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
          onClick={() => navigate("/instructor/team/regist")}
        >
          팀 관리
        </div>
        <div
          className="text-black sm:text-xl text-sm p-5 cursor-pointer"
          onClick={() => navigate("/instructor/my-lesson")}
        >
          강습내역
        </div>
        <div
          className="text-black sm:text-xl text-sm p-5 cursor-pointer"
          onClick={() => navigate("/instructor/settlement")}
        >
          정산
        </div>
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
            <button onClick={() => setIsLogin(false)} className="text-2xl">
              <IoMdLogOut />
            </button>
          </div>
          <div className="navbar-user__profile">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => {
                navigate("/instructor/edit-info");
              }}
            />
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
