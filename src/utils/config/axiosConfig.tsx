import axios, { AxiosInstance } from "axios";

// Axios 인스턴스 생성
const apiClient = (isFormData?: boolean): AxiosInstance => {
  const client = axios.create({
    //인스턴스 생성
    baseURL: import.meta.env.VITE_API_BASE_URL, //환경변수로 API URL 설정
    timeout: 10000, //타임아웃 설정, 10초 이내에 응답이 없으면 에러 발생
    headers: {
      "Content-Type": !isFormData
        ? "application/json;charset=utf-8"
        : "multipart/form-data",
      DeviceType: "WEB",
    },
  });

  // 요청 인터셉터 설정
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accesstoken"); //토큰 설정
      if (token) {
        //토큰이 있으면 헤더 설정
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config; //요청 설정을 반환하여 실제 요청을 진행
    },
    (error) => {
      return Promise.reject(error); //에러 처리
    }
  );

  // 응답 인터셉터 설정
  client.interceptors.response.use(
    (response) => response, //응답이 성공하면 반환
    (error) => {
      return Promise.reject(error); //에러 처리
    }
  );

  return client; //인스턴스 반환을 통해 사용
};

export default apiClient;
