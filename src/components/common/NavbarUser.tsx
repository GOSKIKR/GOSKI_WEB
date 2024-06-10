import React, { useState } from "react";

const NavbarUser = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="bg-blue-600 text-white p-4 flex h-20 justify-between items-center">
      <div className="text-xl">GOSKI</div>
      <div className="flex items-center space-x-4">
        <div className="text-white text-xl">강습 예약</div>
        <div className="text-white text-xl">이용 안내</div>
      </div>
      <div className="navbar-user flex items-center space-x-4">
        <div className="navbar-user__menu relative">
          {isLogin ? (
            <div className="flex">
              <div className="flex items-center justify-center w-10 h-10 bg-white text-blue-600 rounded-full cursor-pointer">
                알림
              </div>
              <div className="flex items-center justify-center w-10 h-10 bg-white text-blue-600 rounded-full cursor-pointer">
                설정
              </div>
              <div className="flex items-center justify-center w-10 h-10 bg-white text-blue-600 rounded-full cursor-pointer">
                <button onClick={() => setIsLogin(false)}>Logout</button>
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
            <div className="navbar-user__logout flex">
              <div>
                <button onClick={() => setIsLogin(true)} className="text-white">
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarUser;
