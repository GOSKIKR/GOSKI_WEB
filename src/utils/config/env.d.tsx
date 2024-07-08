interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_SECRET_REFRESH_KEY: string;
  // 추가적인 환경 변수가 있다면 여기에 선언합니다.
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
