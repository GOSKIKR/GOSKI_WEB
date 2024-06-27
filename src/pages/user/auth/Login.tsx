import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CiMail } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";

import NavbarUser from "../../../components/common/NavbarUser";
import NavbarUserMobile from "../../../components/common/NavbarUserMobile";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userOrInstructor, setUserOrInstructor] = useState("user");

  const isFormValid = email !== "" && password !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // Your form submission logic here
      console.log("Form Submitted", { email, password, userOrInstructor });
    } else {
      console.log("Form is not valid");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {
        // 화면 너비가 640px 이하일 때 모바일 네비게이션을 보여줍니다.
        window.innerWidth < 640 ? <NavbarUserMobile /> : <NavbarUser />
      }
      <div className="h-full flex items-center justify-center bg-gray-50 ">
        {/* <div
        onClick={() => navigate("/")}
        className="absolute top-0 left-0 w-1/5 bg-primary-500 cursor-pointer"
      >
        <img
          className="h-12 w-auto mx-auto"
          src="/path/to/goski-logo.svg"
          alt="GOSKI"
        />
      </div> */}

        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col">
            <img
              onClick={() => navigate("/")}
              className="mx-auto h-12 w-auto cursor-pointer"
              src="/path/to/goski-logo.svg"
              alt="GOSKI"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              GOSKI 로그인
            </h2>
          </div>
          <div className="relative mt-8 space-y-6 bg-white shadow-lg px-6 pb-6 rounded-md">
            <div className="flex justify-center">
              <div className="flex flex-row w-full justify-center rounded-md overflow-hidden">
                <div
                  onClick={() => setUserOrInstructor("user")}
                  className={`flex w-1/2 justify-center cursor-pointer hover:bg-primary-500 hover:text-white
                            ${
                              userOrInstructor === "user"
                                ? "border-x-2 border-t-2 border-primary-500 text-primary-500"
                                : "border-b-2 border-primary-500 bg-white text-black"
                            }
                            `}
                >
                  일반 사용자
                </div>
                <div
                  onClick={() => setUserOrInstructor("instructor")}
                  className={`flex w-1/2 justify-center cursor-pointer hover:bg-primary-500 hover:text-white
              ${
                userOrInstructor === "instructor"
                  ? "border-x-2 border-t-2 border-primary-500 text-primary-500"
                  : "border-b-2 bg-white border-primary-500 text-black"
              }
              `}
                >
                  강사
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-md shadow-sm -space-y-px">
              <div className="relative flex items-center">
                <CiMail className="absolute left-2 h-6 w-6 text-gray-400 z-50" />
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full py-2 px-10 border border-gray-300 placeholder-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
                  placeholder="Email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative flex items-center">
                <IoKeyOutline className="absolute left-2 h-6 w-6 text-gray-400 z-50" />
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-300 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleSubmit}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  isFormValid
                    ? "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!isFormValid}
              >
                로그인
              </button>
            </div>

            <div className="flex justify-between">
              <div
                onClick={() => navigate("/login/register")}
                className="font-medium text-primary-500 cursor-pointer"
              >
                회원가입
              </div>
              <div
                onClick={() => navigate("/login/forgot-password")}
                className="font-medium text-primary-500 cursor-pointer"
              >
                ID / PW 찾기
              </div>
            </div>
            <div>
              <span className="block text-sm text-center">
                소셜 계정으로 로그인
              </span>
              <div className="flex justify-around">
                <div className="flex flex-col items-center justify-center p-2 rounded-full cursor-pointer hover:shadow-lg transition duration-500 ease-in-out">
                  <div
                    className="flex items-center justify-center"
                    onClick={() => navigate("/login/kakao")}
                  >
                    <img
                      src="/assets/images/kakaoLogin.png"
                      alt="Kakao"
                      className="h-6 w-6 self-center"
                    />
                  </div>
                  <div>Kakao</div>
                </div>
                <div className="flex flex-col items-center justify-center p-2 rounded cursor-pointer hover:scale-125 hover:shadow-lg transition duration-300 ease-in-out">
                  <div
                    className="flex items-center justify-center"
                    onClick={() => alert("애플 로그인")}
                  >
                    <img
                      src="/assets/images/appleLogin.png"
                      alt="Apple"
                      className="h-6 w-6 self-center"
                    />
                  </div>
                  <div>Apple</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
