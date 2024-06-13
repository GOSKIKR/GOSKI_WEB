import React from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col text-center">
        <img
          onClick={() => navigate("/")}
          className="mx-auto h-12 w-auto cursor-pointer"
          src="/path/to/goski-logo.svg"
          alt="GOSKI"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          GOSKI 회원가입
        </h2>
      </div>
      <div className="flex justify-center mt-8 max-w-md w-full space-y-8">
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-400">사진</span>
            </div>
            <button className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              사진 업로드
            </button>
          </div>
          <form className="space-y-4">
            <div>
              <label className="sr-only">이메일</label>
              <input
                type="email"
                className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                placeholder="이메일"
              />
            </div>
            <div>
              <label className="sr-only">이름</label>
              <input
                type="text"
                className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                placeholder="이름"
              />
            </div>
            <div>
              <label className="sr-only">성별</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <span className="ml-2">남성</span>
                <input
                  type="radio"
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 ml-4"
                />
                <span className="ml-2">여성</span>
              </div>
            </div>
            <div>
              <label className="sr-only">생년월일</label>
              <input
                type="date"
                className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
              />
            </div>

            <div>
              <label className="sr-only">비밀번호</label>
              <input
                type="password"
                className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                placeholder="비밀번호"
              />
            </div>
            <div>
              <label className="sr-only">비밀번호 확인</label>
              <input
                type="password"
                className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                placeholder="비밀번호 확인"
              />
            </div>
            <div>
              <label className="sr-only">전화번호</label>
              <input
                type="tel"
                className="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                placeholder="전화번호"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-row justify-around mt-4 max-w-md w-full text-center">
        <button className="basis-1/3 p-3 rounded bg-primary-600 text-white font-bold">
          회원가입
        </button>
        <button className="basis-1/3 p-3 rounded bg-gray-300 text-white font-bold">
          취소
        </button>
      </div>
      <div className="text-sm text-gray-500">
        이미 회원이신가요?{" "}
        <a href="/login" className="text-primary-600">
          로그인
        </a>
      </div>
    </div>
  );
};

export default Register;
