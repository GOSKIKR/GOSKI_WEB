import axios from "axios";
import { useEffect, useState } from "react";
import { useKakaoToken } from "../../../utils/hooks/useKakaoToken";
import { useLocation } from "react-router-dom";

import apiClient from "../../../utils/config/axiosConfig";

const KakaoLogin = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const code = params.get("code");
  const client_id = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URI_LOCAL;
  const [userData, setUserData] = useState(null);

  if (!code) {
    return <div>Error: Authorization code not found</div>;
  }

  console.log("code:", code);
  const { KakaoAccessToken, error, loading, fetchToken } = useKakaoToken({
    client_id,
    redirect_uri,
    code,
  });

  const getUserData = async (token: string) => {
    try {
      const response = await apiClient().post(
        "/user/signin/kakao",
        {
          role: "student", // 필요에 따라 변경
          code: code,
          token: token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUserData(response.data);
      sessionStorage.setItem("accesstoken", response.data.token);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  useEffect(() => {
    if (KakaoAccessToken) {
      getUserData(KakaoAccessToken);
    }
  }, [KakaoAccessToken]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <p>Access Token: {KakaoAccessToken}</p>
      {userData && (
        <div>
          <h2>User Data:</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default KakaoLogin;
