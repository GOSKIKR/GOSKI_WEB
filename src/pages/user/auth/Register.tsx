import React, { useState, useEffect } from "react";
import { CiMail } from "react-icons/ci";
import { MdOutlinePermIdentity } from "react-icons/md";
import { IoLockOpenOutline } from "react-icons/io5";
import { IoLockClosedOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import NavbarUser from "../../../components/common/NavbarUser";
import NavbarUserMobile from "../../../components/common/NavbarUserMobile";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [pw, setPw] = useState<string>("");
  const [pwCheck1, setPwCheck1] = useState<string>("");
  const [pwCheck2, setPwCheck2] = useState<string>("");
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPw(password);
    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,14}$/.test(
        password
      )
    ) {
      setPwCheck1(
        "비밀번호는 영문, 숫자, 특수문자를 포함한 8~14자리여야 합니다."
      );
    } else {
      setPwCheck1("확인");
    }
  };

  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    if (pw !== password) {
      setPwCheck2("비밀번호가 일치하지 않습니다.");
    } else {
      setPwCheck2("확인");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full">
        {innerWidth > 640 ? <NavbarUser /> : <NavbarUserMobile />}
      </div>
      <div className="flex w-full sm:w-1/2 h-full">
        <div className="flex flex-col justify-center items-center w-full h-full p-4 sm:p-0">
          <div className="flex flex-col justify-center items-center text-center p-4">
            <img
              onClick={() => navigate("/")}
              className="mx-auto h-12 w-auto cursor-pointer"
              src="/path/to/goski-logo.svg"
              alt="GOSKI"
            />
            <h2 className="mt-6 text-center text-xl 2xl:text-2xl sm:text-3xl font-extrabold text-gray-900">
              GOSKI 회원가입
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-col sm:flex-row justify-center w-full">
              <div className="w-full flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-40 h-40 sm:w-44 sm:h-44  rounded-full flex items-center justify-center">
                    <img
                      className="w-full h-full object-cover rounded-full bg-gray-200"
                      src="https://randomuser.me/api/portraits/women/40.jpg  " //random profile image
                      alt="profile"
                    />
                  </div>
                  <button
                    onClick={() => {
                      alert("사진 업로드 기능");
                    }}
                    className="w-full mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    사진 업로드
                  </button>
                </div>
                <div className="min-w-80 basis-3/5 w-full flex flex-col gap-4">
                  <div className="relative flex justify-center items-center">
                    <CiMail className="absolute left-2 h-6 w-6 text-gray-400 z-50" />
                    <label className="sr-only">이메일</label>
                    <input
                      type="email"
                      className="block w-full pl-10 pr-20 py-3 rounded bg-gray-200 border border-transparent focus:outline-none text-sm sm:text-base"
                      placeholder="email@email.com"
                    />
                    <div className="absolute w-20 inset-y-0 right-0 flex items-center justify-center">
                      <button
                        onClick={() => {
                          alert("이메일 중복확인 기능");
                        }}
                        className="w-4/5 h-3/5  rounded bg-primary-600 text-white font-bold hover:bg-indigo-700 text-xs sm:text-sm"
                      >
                        중복확인
                      </button>
                    </div>
                  </div>
                  <div className="relative flex flex-row justify-between items-center">
                    <div>
                      <MdOutlinePermIdentity className="absolute left-2 top-3 h-6 w-6 text-gray-400 z-50" />
                      <label className="sr-only">이름</label>
                      <input
                        type="text"
                        className="block w-full px-10 py-3 rounded bg-gray-200 border border-transparent focus:outline-none text-sm sm:text-base"
                        placeholder="이름을 입력해 주세요"
                      />
                    </div>
                    <div className="p-2">
                      <label className="sr-only">성별</label>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label
                            htmlFor="male"
                            className="ml-2 block text-sm sm:text-base text-gray-900"
                          >
                            남
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label
                            htmlFor="female"
                            className="ml-2 block text-sm sm:text-base text-gray-900"
                          >
                            여
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="sr-only">생년월일</label>
                    <input
                      type="date"
                      className="block w-full px-10 py-3 rounded bg-gray-200 border border-transparent focus:outline-none text-sm sm:text-base"
                    />
                  </div>

                  <div className="relative flex justify-center items-center">
                    <IoLockClosedOutline className="absolute left-2 h-6 w-6 text-gray-400 z-50" />
                    <label className="sr-only">비밀번호</label>
                    <input
                      type="password"
                      className="block w-full px-10 py-3 rounded bg-gray-200 border border-transparent focus:outline-none text-sm sm:text-base"
                      placeholder="영문, 특수문자, 숫자 포함 8~14자"
                      onChange={handlePassword}
                    />
                    <div className="absolute -bottom-4 right-0 z-50">
                      {pwCheck1 === "확인" ? (
                        <span className="text-xs sm:text-sm text-green-500">
                          {pwCheck1}
                        </span>
                      ) : (
                        <span className="text-xs sm:text-sm text-red-500">
                          {pwCheck1}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="relative flex justify-center items-center">
                    <IoLockOpenOutline className="absolute left-2 h-6 w-6 text-gray-400 z-50" />
                    <label className="sr-only">비밀번호 확인</label>
                    <input
                      type="password"
                      className="block w-full px-10 py-3 rounded bg-gray-200 border border-transparent focus:outline-none text-sm sm:text-base"
                      placeholder="비밀번호 확인"
                      onChange={handlePasswordCheck}
                    />
                    <div className="absolute -bottom-4 right-0 z-50">
                      {pwCheck2 === "확인" ? (
                        <span className="text-xs sm:text-sm text-green-500">
                          {pwCheck2}
                        </span>
                      ) : (
                        <span className="text-xs sm:text-sm text-red-500">
                          {pwCheck2}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="relative flex justify-center items-center">
                    <LuPhone className="absolute left-2 h-6 w-6 text-gray-400 z-50" />
                    <label className="sr-only">전화번호</label>
                    <input
                      type="tel"
                      className="block w-full pl-10 pr-20 py-3 rounded bg-gray-200 border border-transparent focus:outline-none text-sm sm:text-base"
                      placeholder="전화번호"
                    />
                    <div className="absolute w-20 inset-y-0 right-0 flex items-center justify-center">
                      <button
                        onClick={() => {
                          alert("인증번호 발송 기능");
                        }}
                        className="w-4/5 h-3/5 rounded bg-primary-600 text-white font-bold hover:bg-indigo-700 text-xs sm:text-sm"
                      >
                        본인인증
                      </button>
                    </div>
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
                  className="w-1/3 p-3 rounded bg-primary-600 text-white font-bold hover:bg-indigo-700 text-sm sm:text-base"
                >
                  회원가입
                </button>
              </div>
              <div className="text-sm sm:text-base text-gray-500 mt-4">
                이미 회원이신가요?
                <a href="/login" className="text-primary-600">
                  로그인
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
