import React, { useEffect, useState } from "react";
import apiClient from "../../utils/config/axiosConfig";

import { CgProfile } from "react-icons/cg";

type ProfileData = {
  birthDate: string;
  email: string;
  gender: string;
  phoneNumber: string;
  profileUrl: string;
  role: string;
  userName: string;
};

const UserModify = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    birthDate: "",
    email: "",
    gender: "",
    phoneNumber: "",
    profileUrl: "",
    role: "",
    userName: "",
  });

  const [pw, setPw] = useState("");
  const [pwCheck1, setPwCheck1] = useState("");
  const [pwCheck2, setPwCheck2] = useState("");

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPw(password);
    const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,14}$/;
    if (regExp.test(password)) {
      setPwCheck1("확인");
    } else {
      setPwCheck1("영문, 특수문자, 숫자 포함 8~14자");
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

  //사용자 정보 불러오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem("accesstoken");

        const response = await apiClient().get("/user/profile/user", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setProfileData(response.data.data);

        if (response.status === 200) {
          console.log("사용자 정보 불러오기 성공:", response.data);
        }
      } catch (error) {
        console.error("사용자 정보 불러오기 중 오류 발생:", error);
      }
    };

    fetchUser();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData({ ...profileData, profileUrl: reader.result as string });
    };
    reader.readAsDataURL(file);

    // multipart/form-data 형식으로 이미지 업로드
    const fetchImageUpload = async () => {
      try {
        const accessToken = localStorage.getItem("accesstoken");
        if (!accessToken) {
          console.error("No access token found");
          return;
        }

        const formData = new FormData();
        formData.append("profileImage", file);

        const response = await apiClient(true).patch(
          "/user/update/user",
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("이미지 업로드 성공:", response.data);
        } else {
          console.error("이미지 업로드 실패:", response);
        }
      } catch (error) {
        console.error("이미지 업로드 중 오류 발생:", error);
      }
    };

    fetchImageUpload();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col lg:flex-row justify-center items-center w-full lg:w-2/3 bg-primary-50 rounded-lg shadow-xl p-4">
        <div className="flex flex-col justify-center items-center mb-4 lg:mb-0 lg:mr-4">
          {profileData.profileUrl ? (
            <img
              src={profileData.profileUrl}
              alt="Profile"
              className="w-24 h-24 lg:w-30 lg:h-30 rounded-full mb-2"
            />
          ) : (
            <div className="w-24 h-24 lg:w-30 lg:h-30 rounded-full mb-2 bg-gray-300">
              <CgProfile
                className="w-24 h-24 lg:w-30 lg:h-30 rounded-full mb-2"
                color="gray"
              />
            </div>
          )}
          <div className="text-center text-blue-500 hover:text-blue-700 font-bold cursor-pointer">
            <label htmlFor="upload-photo" className="cursor-pointer">
              사진 수정하기
            </label>
            <input
              type="file"
              id="upload-photo"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <form className="w-full lg:w-auto rounded px-8 pt-6 pb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 lg:mb-0 lg:w-1/3"
              htmlFor="name"
            >
              이름
            </label>
            <input
              className="shadow cursor-default appearance-none border rounded w-full lg:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="name"
              readOnly
              placeholder={
                profileData.userName
                  ? profileData.userName
                  : "이름을 입력해주세요"
              }
            />
          </div>
          <div className="relative flex flex-col lg:flex-row lg:justify-between mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 lg:mb-0 lg:w-1/3"
              htmlFor="email"
            >
              이메일
            </label>
            <div className="shadow appearance-none border rounded w-full lg:w-2/3 py-2 pl-3 pr-10 text-gray-700 text-xs leading-tight focus:outline-none focus:shadow-outline">
              {profileData.email}
            </div>
            <div className="absolute top-8 lg:top-1 right-3 z-49">
              <button
                onClick={() => {
                  alert("이메일 변경하기");
                }}
                className="text-xs text-blue-500 hover:text-blue-700"
                type="button"
              >
                변경
              </button>
            </div>
          </div>
          <div className="relative flex flex-col lg:flex-row lg:justify-between mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 lg:mb-0 lg:w-1/3"
              htmlFor="phone"
            >
              전화번호
            </label>
            <div className="shadow appearance-none border rounded w-full lg:w-2/3 py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              {profileData.phoneNumber}
            </div>
            <div className="absolute top-8 lg:top-1 right-3 z-49">
              <button
                onClick={() => {
                  alert("전화번호 변경하기");
                }}
                className="text-xs text-blue-500 hover:text-blue-700"
                type="button"
              >
                변경
              </button>
            </div>
          </div>
          <div className="relative flex flex-col lg:flex-row lg:justify-between mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 lg:mb-0 lg:w-1/3"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              className="shadow appearance-none border rounded w-full lg:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-xs"
              type="password"
              id="password"
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
          <div className="relative flex flex-col lg:flex-row lg:justify-between mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 lg:mb-0 lg:w-1/3"
              htmlFor="confirmPassword"
            >
              비밀번호 확인
            </label>
            <input
              className="shadow appearance-none border rounded w-full lg:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              id="confirmPassword"
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
          <div className="flex flex-col lg:flex-row lg:justify-between mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 lg:mb-0 lg:w-1/3"
              htmlFor="birthdate"
            >
              생년월일
            </label>
            <input
              className="shadow appearance-none border rounded w-full lg:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              id="birthdate"
              readOnly
              value={profileData.birthDate}
              onChange={(e) =>
                setProfileData({ ...profileData, birthDate: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 lg:mb-0 lg:w-1/3"
              htmlFor="gender"
            >
              성별
            </label>
            <div className="flex space-x-4 w-full lg:w-2/3">
              <button
                className={`shadow cursor-default appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  profileData.gender === "MALE" ? "bg-blue-500 text-white" : ""
                }`}
                value="MALE"
                type="button"
                // onClick={() =>
                //   setProfileData({ ...profileData, gender: "MALE" })
                // }
              >
                남성
              </button>
              <button
                className={`shadow cursor-default appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  profileData.gender === "FEMALE"
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
                value="FEMALE"
                type="button"
                // onClick={() =>
                //   setProfileData({ ...profileData, gender: "FEMALE" })
                // }
              >
                여성
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              수정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModify;
