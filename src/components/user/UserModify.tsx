import React, { useEffect, useState } from "react";

//name, email, phone, birthdate, gender
const userinfo = {
  name: "홍길동",
  email: "example@example.com",
  phone: "010-1234-5678",
  birthdate: "1990-01-01",
  gender: "male",
  profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
};

const UserModify = () => {
  const [userName, setUserName] = useState(userinfo.name);
  const [userGender, setUserGender] = useState("male");
  const [userBirthdate, setUserBirthdate] = useState(userinfo.birthdate);
  const [userPhone, setUserPhone] = useState(userinfo.phone);
  const [userEmail, setUserEmail] = useState(userinfo.email);
  const [userImage, setUserImage] = useState(userinfo.profileImage);

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

  useEffect(() => {
    setUserName(userinfo.name);
    setUserGender(userinfo.gender);
    setUserBirthdate(userinfo.birthdate);
    setUserPhone(userinfo.phone);
    setUserEmail(userinfo.email);
    setUserImage(userinfo.profileImage);
  }, [userinfo]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col lg:flex-row justify-center items-center w-full lg:w-2/3 bg-primary-100 shadow-xl p-4">
        <div className="flex flex-col justify-center items-center mb-4 lg:mb-0 lg:mr-4">
          <img
            src={userImage}
            alt="Profile"
            className="w-24 h-24 lg:w-30 lg:h-30 rounded-full mb-2"
          />
          <div
            onClick={() => {
              alert("사진 수정하기");
            }}
            className="text-center text-blue-500 hover:text-blue-700 font-bold cursor-pointer"
          >
            사진 수정하기
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
              className="shadow appearance-none border rounded w-full lg:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="name"
              placeholder={userName}
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
              {userEmail}
            </div>
            <div className="absolute top-8 lg:top-1 right-3 z-50">
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
              {userPhone}
            </div>
            <div className="absolute top-8 lg:top-1 right-3 z-50">
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
              value={userBirthdate}
              onChange={(e) => setUserBirthdate(e.target.value)}
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
                className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  userGender === "male" ? "bg-blue-500 text-white" : ""
                }`}
                value="male"
                type="button"
                onClick={() => setUserGender("male")}
              >
                남성
              </button>
              <button
                className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  userGender === "female" ? "bg-blue-500 text-white" : ""
                }`}
                value="female"
                type="button"
                onClick={() => setUserGender("female")}
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
