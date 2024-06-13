import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userOrInstructor, setUserOrInstructor] = useState("user");

  const isFormValid = email !== "" && password !== "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div
        onClick={() => navigate("/")}
        className="absolute top-0 left-0 w-1/5 bg-primary-500 cursor-pointer"
      >
        <img
          className="h-12 w-auto mx-auto"
          src="/path/to/goski-logo.svg"
          alt="GOSKI"
        />
      </div>

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
        <form className="mt-8 space-y-6 bg-white shadow-lg p-6 rounded-md">
          <div className="flex justify-center">
            <div className="flex flex-row w-2/3 justify-center rounded-md overflow-hidden shadow-lg">
              <div
                onClick={() => setUserOrInstructor("user")}
                className={`flex w-1/2 justify-center cursor-pointer
              ${
                userOrInstructor === "user"
                  ? "bg-primary-500 text-white"
                  : "bg-gray-300 text-black"
              }
              `}
              >
                일반 사용자
              </div>
              <div
                onClick={() => setUserOrInstructor("instructor")}
                className={`flex w-1/2 justify-center cursor-pointer
              ${
                userOrInstructor === "instructor"
                  ? "bg-primary-500 text-white"
                  : "bg-gray-300 text-black"
              }
              `}
              >
                강사
              </div>
            </div>
          </div>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-300 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isFormValid
                  ? "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!isFormValid}
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => navigate("/login/register")}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              회원가입
            </button>
          </div>

          <div className="text-right">
            <div
              onClick={() => navigate("/login/forgot-password")}
              className="font-medium text-primary-500 cursor-pointer"
            >
              비밀번호를 잊으셨나요?
            </div>
          </div>
          <div>
            <span className="block text-sm text-center">
              소셜 계정으로 로그인
            </span>
            <div className="flex justify-around">
              <div className="flex flex-col items-center justify-center border p-2 rounded cursor-pointer">
                <img
                  src="/path/to/kakao-icon.svg"
                  alt="Kakao"
                  className="h-6 w-6 mr-2"
                />
                <div>Kakao</div>
              </div>
              <div className="flex flex-col items-center justify-center border p-2 rounded cursor-pointer">
                <img
                  src="/path/to/apple-icon.svg"
                  alt="Apple"
                  className="h-6 w-6 mr-2"
                />
                <div>Apple</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
