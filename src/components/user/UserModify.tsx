import React, { useState } from "react";

const UserModify = () => {
  const [gender, setGender] = useState("male");
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-row justify-center items-center w-2/3 bg-primary-100 shadow-xl">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col ">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Profile"
              className="w-30 h-30 rounded-full"
            />
            <div className="text-center text-blue-500 hover:text-blue-700 font-bold cursor-pointer">
              사진 수정하기
            </div>
          </div>
        </div>
        <form className="rounded px-8 pt-6 pb-8">
          <div className="flex justify-between mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              이름
            </label>
            <input
              className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="name"
            />
          </div>
          <div className="flex mb-4 justify-between">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              id="email"
            />
          </div>
          <div className="flex mb-4 justify-between">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              전화번호
            </label>
            <input
              className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="tel"
              id="phone"
            />
          </div>
          <div className="flex mb-4 justify-between">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              id="password"
            />
          </div>
          <div className="flex mb-6 justify-between">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              비밀번호 확인
            </label>
            <input
              className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              id="confirmPassword"
            />
          </div>
          <div className="flex mb-6 justify-between">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="birthdate"
            >
              생년월일
            </label>
            <input
              className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              id="birthdate"
            />
          </div>
          <div className="flex mb-6 justify-between">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              성별
            </label>
            <div className="flex space-x-4">
              <button
                className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  gender === "male" ? "bg-blue-500 text-white" : ""
                }`}
                value="male"
                type="button"
                onClick={() => setGender("male")}
              >
                남성
              </button>
              <button
                className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  gender === "female" ? "bg-blue-500 text-white" : ""
                }`}
                value="female"
                type="button"
                onClick={() => setGender("female")}
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
