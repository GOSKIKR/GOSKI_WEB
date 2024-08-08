import axios from "axios";
import { useState } from "react";

// Kakao API 설정
const KAKAO_TOKEN_API = axios.create({
  baseURL: "https://kauth.kakao.com",
  headers: {
    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  },
});

// Kakao Token 데이터 타입 정의
interface IKakaoTokenData {
  client_id: string;
  redirect_uri: string;
  code: string;
}

// Kakao Token 요청 함수
const getKakaoToken = async (data: IKakaoTokenData) => {
  const response = await KAKAO_TOKEN_API.post("/oauth/token", null, {
    params: {
      grant_type: "authorization_code",
      client_id: data.client_id,
      redirect_uri: data.redirect_uri,
      code: data.code,
    },
  });
  console.log("response.data:", response.data);
  return response.data;
};

// Hook 정의
export const useKakaoToken = (data: IKakaoTokenData) => {
  const [KakaoAccessToken, setKakaoAccessToken] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchToken = async () => {
    setLoading(true);
    setError(null);
    try {
      const tokenData = await getKakaoToken(data);
      setKakaoAccessToken(tokenData.access_token);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { KakaoAccessToken, error, loading, fetchToken };
};
