import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";

const NavbarUser = () => {
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const handleLoginBtn = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-row h-20 w-full justify-between items-center bg-primary-600  box-border">
      <div onClick={() => navigate("/")} className="basis-1/6 cursor-pointer">
        GOSKI
      </div>
      <div className="flex box-border flex-1 justify-start">
        <div className="text-white text-xl p-3 cursor-pointer  box-border flex">
          강습 예약
        </div>
        <div className="text-white text-xl p-3 cursor-pointer  box-border">
          이용 안내
        </div>
      </div>
      {isLogin ? (
        <div className="basis-1/4 flex flex-row justify-around  box-border">
          <div
            onClick={() => navigate("/dm")}
            className="flex items-center justify-center w-10 h-10 bg-white rounded-full cursor-pointer p-5  box-border"
          >
            <button className="text-2xl">
              <IoMdNotificationsOutline />
            </button>
          </div>
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
              className="w-10 h-10 rounded-full"
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
            className="text-white p-5 cursor-pointer  box-border"
          >
            로그인
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarUser;
