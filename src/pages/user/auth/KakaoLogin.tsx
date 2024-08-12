import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import apiClient from "../../../utils/config/axiosConfig";

const KakaoLogin = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("code");
  // const client_id = import.meta.env.VITE_KAKAO_REST_API_KEY;
  // const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URI_LOCAL;
  // const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const [role, setRole] = useState("");

  const loginStore = sessionStorage.getItem("login-store");

  useEffect(() => {
    if (loginStore) {
      const loginStoreObj = JSON.parse(loginStore);
      const role = loginStoreObj.state.role;
      setRole(role);
    } else {
      console.log("login-store 키가 존재하지 않습니다.");
    }
  }, []);

  console.log("role:", role, typeof role);
  console.log("code:", code, typeof code);

  //   POST /api/v1/user/signin/kakao HTTP/1.1
  // Host:
  // Accept: */*
  // Content-Type: application/json

  // {
  // 	"role": "String", // 앱에서는 안보내도 로그인 가능함
  // 	"code":"String", // 웹 : 코드
  // 	"token":"String" // 어플리케이션 : 토큰
  // }

  //백엔드 api 통신
  //FIXME: 카카오 로그인 api 호출
  const getUserToken = async () => {
    try {
      const response = await apiClient().post("/user/signin/kakao", {
        role: role,
        code: code,
        token: null,
      });
      console.log("response.data:", response.data);
      if (response.status === 200) {
        const accesstoken = response.headers["accesstoken"];
        const refreshtoken = response.headers["refreshtoken"];
        if (accesstoken) {
          sessionStorage.setItem("accesstoken", accesstoken);
          sessionStorage.setItem("refreshtoken", refreshtoken);
          if (role === "STUDENT") {
            navigate("/");
          } else {
            navigate("/instructor/main");
          }
        } else {
          console.log("토큰이 존재하지 않습니다.");
          navigate("/login/register");
        }
      }
    } catch (error) {
      console.error("카카오 로그인 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (code && role) {
      getUserToken();
    }
  }, [code, role]);

  if (!code) {
    return <div>Error: Authorization code not found</div>;
  }

  return <div>로딩중입니다.</div>;
};

export default KakaoLogin;
