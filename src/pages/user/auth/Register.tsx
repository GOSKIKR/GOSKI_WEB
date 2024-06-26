import React from "react";
import { CiMail } from "react-icons/ci";
import { MdOutlinePermIdentity } from "react-icons/md";
import { IoLockOpenOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gray-50 ">
      <div className="flex flex-col justify-center items-center w-1/3">
        <div className="flex flex-col justify-center items-center text-center p-4">
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
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex justify-center w-full">
            <div className="w-full flex flex-row space-x-4 justify-center">
              <div className="min-w-28 flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-400">사진</span>
                </div>
                <button
                  onClick={() => {
                    alert("사진 업로드 기능");
                  }}
                  className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  사진 업로드
                </button>
              </div>
              <div className="min-w-80 flex flex-col gap-4">
                <div className="relative flex justify-center items-center">
                  <CiMail className="absolute left-2 h-6 w-6 text-gray-400 z-50" />
                  <label className="sr-only">이메일</label>
                  <input
                    type="email"
                    className="block w-full px-10 py-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                    placeholder="email@email.com"
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  <MdOutlinePermIdentity className="absolute left-2 h-6 w-6 text-gray-400 z-50" />
                  <label className="sr-only">이름</label>
                  <input
                    type="text"
                    className="block w-full px-10 py-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                    placeholder="이름을 입력해 주세요"
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
                    className="block w-full px-10 py-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                  />
                </div>

                <div className="relative flex justify-center items-center">
                  <IoLockClosedOutline className="absolute left-2 h-6 w-6 text-gray-400 z-50" />
                  <label className="sr-only">비밀번호</label>
                  <input
                    type="password"
                    className="block w-full px-10 py-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                    placeholder="영문, 특수문자, 숫자 포함 8~14자"
                  />
                  {/* ^(?=.[A-Za-z])(?=.[0-9])(?=.[$@$!%#?&.])[A-Za-z[0-9]!@#$%^&*]{8,14}$ */}
                </div>
                <div className="relative flex justify-center items-center">
                  <IoLockOpenOutline className="absolute left-2 h-6 w-6 text-gray-400 z-50" />
                  <label className="sr-only">비밀번호 확인</label>
                  <input
                    type="password"
                    className="block w-full px-10 py-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                    placeholder="비밀번호 확인"
                  />
                </div>
                <div className="relative flex justify-center items-center">
                  <LuPhone className="absolute left-2 h-6 w-6 text-gray-400 z-50" />
                  <label className="sr-only">전화번호</label>
                  <input
                    type="tel"
                    className="block w-full px-10 py-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                    placeholder="전화번호"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full mt-6">
            <div className="flex w-full justify-center">
              <button
                onClick={() => {
                  alert("회원가입 기능");
                }}
                className="basis-2/3 p-3 rounded bg-primary-600 text-white font-bold hover:bg-indigo-700"
              >
                회원가입
              </button>
            </div>
            <div className="text-sm text-gray-500">
              이미 회원이신가요?
              <a href="/login" className="text-primary-600">
                로그인
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
