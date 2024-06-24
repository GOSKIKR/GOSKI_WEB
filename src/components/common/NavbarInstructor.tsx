import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegBell } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";

import { HiOutlineCog } from "react-icons/hi";

const NavbarInstructor = () => {
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const handleLoginBtn = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-row h-20 w-full justify-between items-center bg-primary-200">
      <div onClick={() => navigate("/instructor/main")} className="basis-1/6 cursor-pointer">
        GOSKI
      </div>
      <div className="flex flex-row flex-1 justify-normal">
        <div className="text-black text-xl p-5 cursor-pointer" >스케줄</div>
        <div className="text-black text-xl p-5 cursor-pointer" onClick={() => navigate("/instructor/team/regist")}>팀 관리</div>
        <div className="text-black text-xl p-5 cursor-pointer" onClick={() => navigate("/instructor/my-lesson")}>강습내역</div>
        <div className="text-black text-xl p-5 cursor-pointer">정산</div>
      </div>
      {isLogin ? (
        <div className="basis-1/4 flex flex-row justify-around">
          <div
            onClick={() => navigate("/dm")}
            className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-full cursor-pointer"
          >
            <FaRegBell size={24}/>
          </div>
          <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-full cursor-pointer">
            <HiOutlineCog size={24}/>
          </div>
          <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-full cursor-pointer">
            <PiSignOutBold size={24} onClick={() => setIsLogin(false)} />
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
