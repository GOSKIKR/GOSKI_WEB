import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLoginStore from "../../../store/loginStore";

import { CiMail } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";

import NavbarUser from "../../../components/common/NavbarUser";
import NavbarUserMobile from "../../../components/common/NavbarUserMobile";

import apiClient from "../../../utils/config/axiosConfig";
import { httpStatusCode } from "../../../utils/config/httpStatus";

const Login = () => {
  const navigate = useNavigate();

  const { role, setRole } = useLoginStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userOrInstructor, setUserOrInstructor] = useState("user");

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isFormValid = email !== "" && password !== "";

  //카카오 로그인 인가 코드 받아오기
  const KAKAO_AUTH_URL_LOCAL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
    import.meta.env.VITE_KAKAO_REST_API_KEY
  }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI_LOCAL}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
    import.meta.env.VITE_KAKAO_REST_API_KEY
  }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;
  const KAKAO_AUTH_URL_INST_LOCAL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
    import.meta.env.VITE_KAKAO_REST_API_KEY
  }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI_INST_LOCAL}`;
  const KAKAO_AUTH_URL_INST = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
    import.meta.env.VITE_KAKAO_REST_API_KEY
  }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI_INST}`;

  const handleKakaoLogin = () => {
    // return async () => {
    //   if (userOrInstructor === "user") {
    //     window.location.href = import.meta.env.DEV
    //       ? KAKAO_AUTH_URL_LOCAL
    //       : KAKAO_AUTH_URL;
    //   } else {
    //     window.location.href = import.meta.env.DEV
    //       ? KAKAO_AUTH_URL_INST_LOCAL
    //       : KAKAO_AUTH_URL_INST;
    //   }
    // };
    window.location.href = KAKAO_AUTH_URL_LOCAL;
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (isFormValid) {
  //     const login = async () => {
  //       try {
  //         const response = await apiClient.post("/user/signin", {
  //           email,
  //           password,
  //         });
  //         console.log(response.data);
  //         sessionStorage.setItem("token", response.data.token);
  //         navigate("/");
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     login();
  //     console.log("Form Submitted", { email, password, userOrInstructor });
  //   } else {
  //     console.log("Form is not valid");
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const response = await apiClient().post("/user/signin", {
          email,
          password,
        });
        if (response && response.status === httpStatusCode.OK) {
          sessionStorage.setItem("accesstoken", response.headers.accesstoken);
          // await storeRefreshToken(response.data.refreshToken); // 암호화하여 저장
          sessionStorage.setItem("refreshtoken", response.headers.refreshtoken);
          const newRole = response.data.data;
          setRole(newRole);
          newRole === "STUDENT" ? navigate("/") : navigate("/instructor/main");
        }
      } catch (error) {
        sessionStorage.removeItem("accesstoken");
        alert("로그인 실패!");
        console.error("Login error:", error);
      }
      console.log("Form Submitted", { email });
    } else {
      console.log("Form is not valid");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!isFormValid) {
        return alert("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else {
        handleSubmit(e as any); // 강제로 타입 캐스팅
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {
        // 화면 너비가 640px 이하일 때 모바일 네비게이션
        innerWidth < 640 ? <NavbarUserMobile /> : <NavbarUser />
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
              src="/assets/images/AppLogo.png"
              alt="GOSKI"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              GOSKI 로그인
            </h2>
          </div>
          <div className="relative p-8 space-y-6 bg-white shadow-lg px-6 pb-6 rounded-md">
            <div className="flex justify-center">
              <div className="flex flex-row w-full justify-center rounded-md overflow-hidden">
                <div
                  onClick={() => setUserOrInstructor("user")}
                  className={`flex w-1/2 justify-center cursor-pointer rounded-tl-lg hover:bg-primary-500 hover:text-white
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
                  className={`flex w-1/2 justify-center cursor-pointer rounded-tr-lg hover:bg-primary-500 hover:text-white
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
            <div className="flex flex-col gap-4 rounded-md -space-y-px">
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
                  onKeyDown={handleKeyDown}
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
                  className="appearance-none rounded-none relative block w-full px-10 py-2 border border-gray-300 placeholder-gray-300 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
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

            <div className="flex justify-around">
              <div
                onClick={() => navigate("/login/register")}
                className="font-medium text-primary-500 cursor-pointer hover:underline"
              >
                회원가입
              </div>
              <div
                onClick={() => navigate("/login/forgot-password")}
                className="font-medium text-primary-500 cursor-pointer hover:underline"
              >
                ID / PW 찾기
              </div>
            </div>
            <div>
              <span className="block text-sm text-center">
                소셜 계정으로 로그인
              </span>
              <div className="flex justify-around">
                <div
                  className="flex flex-row w-full items-center justify-center p-2 rounded-full cursor-pointer hover:shadow-lg transition duration-500 ease-in-out bg-yellow-300"
                  onClick={handleKakaoLogin}
                >
                  <div className="flex items-center justify-center">
                    <img
                      src="/assets/images/kakaoLogin.png"
                      alt="Kakao"
                      className="h-6 w-6 self-center"
                    />
                  </div>
                  <div>카카오로 시작하기</div>
                </div>
                {/* <div className="flex flex-col items-center justify-center p-2 rounded cursor-pointer hover:scale-125 hover:shadow-lg transition duration-300 ease-in-out">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
