import React, { useEffect, useState } from "react";

// Define props type
type KakaoLoginModalProps = {
  setIsKakaoModalOpen: (isOpen: boolean) => void;
};

const KakaoLoginModal: React.FC<KakaoLoginModalProps> = ({
  setIsKakaoModalOpen,
}) => {
  const [role, setRole] = useState<string>("");
  const [onClose, setOnClose] = useState<boolean>(false);

  // 카카오 로그인 인가 코드 받아오기
  const KAKAO_AUTH_URL_LOCAL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
    import.meta.env.VITE_KAKAO_REST_API_KEY
  }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI_LOCAL}&prompt=login`;
  const KAKAO_AUTH_URL_INST_LOCAL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
    import.meta.env.VITE_KAKAO_REST_API_KEY
  }&redirect_uri=${
    import.meta.env.VITE_KAKAO_REDIRECT_URI_INST_LOCAL
  }&prompt=login`;

  const handleKakaoLogin = (role: string) => {
    if (role === "STUDENT") {
      setRole("STUDENT");
      window.location.href = KAKAO_AUTH_URL_LOCAL;
    } else {
      setRole("INSTRUCTOR");
      window.location.href = KAKAO_AUTH_URL_INST_LOCAL;
    }
  };

  useEffect(() => {
    sessionStorage.setItem(
      "login-store",
      JSON.stringify({ state: { role: role } })
    );
  }, [role]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          로그인 선택
        </h2>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleKakaoLogin("STUDENT")}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
          >
            학생
          </button>
          <button
            onClick={() => handleKakaoLogin("INSTRUCTOR")}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
          >
            강사
          </button>
          <button
            onClick={() => setIsKakaoModalOpen(false)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default KakaoLoginModal;
