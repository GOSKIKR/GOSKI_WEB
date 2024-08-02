// // const secretKey = import.meta.env.VITE_SECRET_REFRESH_KEY;
// const secretKey = Array.from(crypto.getRandomValues(new Uint8Array(32)))
//   .map((byte) => byte.toString(16).padStart(2, "0"))
//   .join("");

// // 리프레시 토큰 암호화
// const encryptToken = (token: string) => {
//   const encodedKey = new TextEncoder().encode(secretKey); // Encode the secret key
//   const encodedData = new TextEncoder().encode(token); // Encode the token
//   return crypto.subtle
//     .importKey("raw", encodedKey, { name: "AES-GCM" }, false, ["encrypt"]) // Import the key
//     .then((key) =>
//       crypto.subtle.encrypt(
//         { name: "AES-GCM", iv: encodedKey.slice(0, 12) },
//         key,
//         encodedData
//       )
//     ) // Encrypt the token
//     .then((encrypted) =>
//       btoa(String.fromCharCode(...new Uint8Array(encrypted)))
//     ); // Encode the encrypted token
// };

// // 리프레시 토큰 복호화
// const decryptToken = (encryptedToken: string) => {
//   const encodedKey = new TextEncoder().encode(secretKey);
//   const encryptedData = Uint8Array.from(atob(encryptedToken), (c) =>
//     c.charCodeAt(0)
//   );
//   return crypto.subtle
//     .importKey("raw", encodedKey, { name: "AES-GCM" }, false, ["decrypt"])
//     .then((key) =>
//       crypto.subtle.decrypt(
//         { name: "AES-GCM", iv: encodedKey.slice(0, 12) },
//         key,
//         encryptedData
//       )
//     )
//     .then((decrypted) => new TextDecoder().decode(decrypted));
// };

// // 리프레시 토큰 저장
// const storeRefreshToken = async (token: string) => {
//   const encryptedToken = await encryptToken(token);
//   sessionStorage.setItem("refreshToken", encryptedToken);
// };

// // 리프레시 토큰 가져오기
// const getRefreshToken = async () => {
//   const encryptedToken = sessionStorage.getItem("refreshtoken");
//   return encryptedToken ? await decryptToken(encryptedToken) : null;
// };

// // 리프레시 토큰 삭제
// const removeRefreshToken = () => {
//   sessionStorage.removeItem("refreshtoken");
// };

// export {
//   encryptToken,
//   decryptToken,
//   storeRefreshToken,
//   getRefreshToken,
//   removeRefreshToken,
// };

// 키 생성 (한 번만 실행하고 안전하게 저장해야 함)
const generateKey = () =>
  crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, [
    "encrypt",
    "decrypt",
  ]);

let secretKey: CryptoKey;

// 키 초기화 (애플리케이션 시작 시 한 번만 실행)
const initializeKey = async () => {
  secretKey = await generateKey();
};

// // 환경변수에서 키 가져오기
// const ENCRYPTION_KEY = import.meta.env.VITE_SECRET_REFRESH_KEY;

// // 키 초기화 (애플리케이션 시작 시 한 번만 실행)
// const initializeKey = async () => {
//   try {
//     const encodedKey = atob(ENCRYPTION_KEY);
//     const keyBytes = new Uint8Array(encodedKey.length);
//     for (let i = 0; i < encodedKey.length; i++) {
//       keyBytes[i] = encodedKey.charCodeAt(i);
//     }
//     secretKey = await crypto.subtle.importKey(
//       "raw",
//       keyBytes,
//       { name: "AES-GCM" },
//       true,
//       ["encrypt", "decrypt"]
//     );
//     console.log("Secret key initialized:", secretKey);
//   } catch (error) {
//     console.error("Error initializing secret key:", error);
//   }
// };

// 리프레시 토큰 암호화
const encryptToken = async (token: string) => {
  const encodedData = new TextEncoder().encode(token);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    secretKey,
    encodedData
  );
  const encryptedArray = new Uint8Array(iv.length + encrypted.byteLength);
  encryptedArray.set(iv);
  encryptedArray.set(new Uint8Array(encrypted), iv.length);
  return btoa(String.fromCharCode(...new Uint8Array(encryptedArray)));
};

// 리프레시 토큰 복호화
const decryptToken = async (encryptedToken: string) => {
  const encryptedData = new Uint8Array(
    atob(encryptedToken)
      .split("")
      .map((char) => char.charCodeAt(0))
  );
  const iv = encryptedData.slice(0, 12);
  const data = encryptedData.slice(12);
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    secretKey,
    data
  );
  return new TextDecoder().decode(decrypted);
};

// 리프레시 토큰 저장
const storeRefreshToken = async (token: string) => {
  const encryptedToken = await encryptToken(token);
  sessionStorage.setItem("refreshtoken", encryptedToken);
};

// 리프레시 토큰 가져오기
const getRefreshToken = async () => {
  const encryptedToken = sessionStorage.getItem("refreshtoken");
  return encryptedToken ? await decryptToken(encryptedToken) : null;
};

// 리프레시 토큰 삭제
const removeRefreshToken = () => {
  sessionStorage.removeItem("refreshtoken");
};

export {
  initializeKey,
  encryptToken,
  decryptToken,
  storeRefreshToken,
  getRefreshToken,
  removeRefreshToken,
};
