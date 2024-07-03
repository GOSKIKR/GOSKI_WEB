import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import NavbarUser from "../../../components/common/NavbarUser";
import NavbarUserMobile from "../../../components/common/NavbarUserMobile";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFindId, setIsFindId] = useState(true);
  const [isEmailOrPhone, setIsEmailOrPhone] = useState(true); // true for email, false for phone

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-gray-100">
      {innerWidth < 640 ? <NavbarUserMobile /> : <NavbarUser />}
      <div className="flex w-full h-full items-start justify-center overflow-auto">
        <div className="flex flex-col items-center justify-center w-full max-w-md p-4">
          <div className="flex flex-row justify-between text-lg font-semibold mb-6 w-full">
            <div
              onClick={() => setIsFindId(true)}
              className={`border-b-2 px-4 py-2 cursor-pointer ${
                isFindId
                  ? "border-primary-500 text-primary-500"
                  : "border-gray-300"
              }`}
            >
              ID 찾기
            </div>
            <div
              onClick={() => setIsFindId(false)}
              className={`border-b-2 px-4 py-2 cursor-pointer ${
                !isFindId
                  ? "border-primary-500 text-primary-500"
                  : "border-gray-300"
              }`}
            >
              비밀번호 찾기
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 w-full">
            {isFindId ? (
              <div>
                <div className="font-bold text-xl mb-4">ID 찾기</div>
                <div className="mb-2">회원 유형</div>
                <div className="flex justify-between mb-4">
                  <button
                    onClick={() => {
                      setIsFindId(true);
                      setIsAuthenticated(false);
                    }}
                    className="bg-primary-500 text-white font-bold py-2 px-4 rounded hover:bg-primary-700 transition duration-300"
                  >
                    사용자
                  </button>
                  <button
                    onClick={() => {
                      setIsFindId(true);
                      setIsAuthenticated(false);
                    }}
                    className="bg-primary-500 text-white font-bold py-2 px-4 rounded hover:bg-primary-700 transition duration-300"
                  >
                    강사
                  </button>
                </div>
                <div className="mb-2">인증 방식</div>
                <div className="flex justify-between mb-4">
                  <button
                    onClick={() => setIsEmailOrPhone(true)}
                    className={`bg-primary-500 text-white font-bold py-2 px-4 rounded hover:bg-primary-700 transition duration-300 ${
                      isEmailOrPhone ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    이메일
                  </button>
                  <button
                    onClick={() => setIsEmailOrPhone(false)}
                    className={`bg-primary-500 text-white font-bold py-2 px-4 rounded hover:bg-primary-700 transition duration-300 ${
                      !isEmailOrPhone ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    휴대전화
                  </button>
                </div>
                {isEmailOrPhone ? (
                  <div>
                    <div className="relative">
                      <div className="mb-2">이메일 입력</div>
                      <input
                        type="email"
                        className=" input mb-4 w-full pl-4 pr-20 py-2 border rounded"
                      />
                      <div
                        onClick={() => {
                          alert("인증번호가 발송되었습니다.");
                        }}
                        className="absolute bg-primary-100 rounded-sm right-4 top-10 z-50 cursor-pointer"
                      >
                        번호 받기
                      </div>
                    </div>
                    <div className="mb-2">인증번호 입력</div>
                    <input
                      type="text"
                      className="input mb-4 w-full px-4 py-2 border rounded"
                    />
                    <button className="bg-primary-500 text-white font-bold py-2 px-4 rounded hover:bg-primary-700 transition duration-300 w-full">
                      인증하기
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="mb-2">휴대전화 입력</div>
                    <input
                      type="text"
                      className="input mb-4 w-full px-4 py-2 border rounded"
                    />
                    <div className="mb-2">인증번호 입력</div>
                    <input
                      type="text"
                      className="input mb-4 w-full px-4 py-2 border rounded"
                    />
                    <button className="bg-primary-500 text-white font-bold py-2 px-4 rounded hover:bg-primary-700 transition duration-300 w-full">
                      인증하기
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="font-bold text-xl mb-4">비밀번호 찾기</div>
                <div className="mb-2">회원 유형</div>
                <div className="flex justify-between mb-4">
                  <button
                    onClick={handleAuthentication}
                    className="bg-primary-500 text-white font-bold py-2 px-4 rounded hover:bg-primary-700 transition duration-300"
                  >
                    사용자
                  </button>
                  <button
                    onClick={handleAuthentication}
                    className="bg-primary-500 text-white font-bold py-2 px-4 rounded hover:bg-primary-700 transition duration-300"
                  >
                    강사
                  </button>
                </div>
                <div className="mb-2">인증 방식</div>
                <div className="flex justify-between mb-4">
                  <button
                    onClick={() => setIsEmailOrPhone(true)}
                    className={`bg-primary-500 text-white font-bold py-2 px-4 rounded hover:bg-primary-700 transition duration-300 ${
                      isEmailOrPhone ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    이메일
                  </button>
                  <button
                    onClick={() => setIsEmailOrPhone(false)}
                    className={`bg-primary-500 text-white font-bold py-2 px-4 rounded hover:bg-primary-700 transition duration-300 ${
                      !isEmailOrPhone ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    휴대전화
                  </button>
                </div>
                <div className="mb-2">아이디 입력</div>
                <input
                  type="text"
                  className="input mb-4 w-full px-4 py-2 border rounded"
                />
                {isEmailOrPhone ? (
                  <div className="relative">
                    <div className="mb-2">이메일 입력</div>
                    <input
                      type="email"
                      className="input mb-4 w-full pl-4 pr-20 py-2 border rounded"
                    />
                    <div
                      onClick={() => {
                        alert("인증번호가 발송되었습니다.");
                      }}
                      className="absolute bg-primary-100 rounded-sm right-4 top-10 z-50 cursor-pointer"
                    >
                      번호 받기
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-2">휴대전화 입력</div>
                    <input
                      type="text"
                      className="input mb-4 w-full px-4 py-2 border rounded"
                    />
                  </>
                )}
                <div className="mb-2">인증번호 입력</div>
                <input
                  type="text"
                  className="input mb-4 w-full px-4 py-2 border rounded"
                />
                <div className="mb-2">새 비밀번호 입력</div>
                <input
                  type="password"
                  className="input mb-4 w-full px-4 py-2 border rounded"
                />
                <div className="mb-2">새 비밀번호 확인</div>
                <input
                  type="password"
                  className="input mb-4 w-full px-4 py-2 border rounded"
                />
                <button className="bg-primary-500 text-white font-bold py-2 px-4 rounded hover:bg-primary-700 transition duration-300 w-full">
                  비밀번호 변경
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
