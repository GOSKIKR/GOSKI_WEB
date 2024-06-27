import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = () => {
    // 본인 인증 로직을 여기에 구현
    // 예시로는 상태를 true로 설정
    setIsAuthenticated(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4 text-lg font-semibold">비밀번호 찾기</div>
        {!isAuthenticated ? (
          <>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                이메일
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                id="email"
                placeholder="이메일을 입력해주세요."
              />
            </div>
            <button
              className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleAuthentication}
            >
              본인 인증하기
            </button>
          </>
        ) : (
          <div className="text-center">
            <div className="mb-4">본인 인증이 완료되었습니다.</div>
            <div className="mb-4">새 비밀번호를 설정해주세요.</div>
            {/* 비밀번호 설정 로직 추가 위치 */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                새 비밀번호
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                id="password"
                placeholder="새 비밀번호를 입력해주세요."
              />
            </div>
          </div>
        )}
        <div className="flex justify-between mt-4">
          <div
            onClick={() => navigate("/login")}
            className="text-primary-500 hover:text-primary-800 cursor-pointer"
          >
            로그인하러 가기
          </div>
          <div
            onClick={() => navigate("/login/register")}
            className="text-primary-500 hover:text-primary-800 cursor-pointer"
          >
            회원가입하러 가기
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
