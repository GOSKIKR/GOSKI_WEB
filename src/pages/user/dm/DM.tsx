import React, { useState } from "react";
import NavbarUser from "../../../components/common/NavbarUser";

import { FiSearch } from "react-icons/fi";
import { AiOutlineNotification } from "react-icons/ai";
import { SlPicture } from "react-icons/sl";

const DummyChatData = [
  {
    id: 1,
    user: "User 1",
    messages: [
      {
        id: 1,
        user: "User 1",
        message: "금일 수업은 어떠셨나요?",
      },
      {
        id: 2,
        user: "User 2",
        message: "수업이 너무 어려워요...",
      },
    ],
  },
  {
    id: 2,
    user: " User 2",
    messages: [
      {
        id: 1,
        user: "User 1",
        message: "안녕하세요!",
      },
      {
        id: 2,
        user: "User 2",
        message: "안녕하세요!",
      },
    ],
  },
];

const DM: React.FC = () => {
  const [userSelected, setUserSelected] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <NavbarUser />
      <h2 className="text-lg font-semibold mb-4">Direct Messages</h2>

      <div className="flex justify-center items-center w-full h-full">
        <div className="flex w-4/5 h-full flex-row justify-center">
          <div className="flex flex-col w-1/3 rounded-2xl border-solid border-primary-950 overflow-auto p-4 space-y-4 bg-primary-50 m-10">
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-300 p-2"
                placeholder="사용자 검색..."
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <FiSearch />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div className="font-medium text-gray-900">User 1</div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div className="font-medium text-gray-900">User 2</div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div className="font-medium text-gray-900">User 3</div>
              </div>
            </div>
          </div>
          <div className="w-2/3 p-4 flex flex-col space-y-4 rounded-2xl bg-primary-50 m-10">
            <div className="border-b border-gray-300 mb-4 flex items-center space-x-3 rounded-2xl p-4 bg-white">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div className="font-medium text-gray-900">User 1</div>
            </div>
            <div className="flex w-full">
              <div className="w-1/12 flex justify-center text-2xl">
                <AiOutlineNotification />
              </div>
              <div className="bg-blue-100 p-2 mb-4 rounded-lg flex-1">
                <p className="text-sm text-gray-900">
                  공지사항: 이번 주 수업은 취소되었습니다.
                </p>
              </div>
            </div>

            <div className="space-y-4 flex-grow overflow-auto">
              <div className="flex items-end space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div className="bg-gray-200 rounded-lg p-2">
                  <p className="text-sm text-gray-900">
                    금일 수업은 어떠셨나요?
                  </p>
                </div>
              </div>
              {/* Repeat for each message */}
            </div>
            <div className="mt-4 flex">
              <div className="relative w-full">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-300 pl-3 pr-10 py-2"
                  placeholder="메세지를 입력하세요..."
                />
                <div className="absolute right-16 top-1/2 transform -translate-y-1/2 text-2xl">
                  <SlPicture />
                </div>
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-lg p-1">
                  전송
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DM;
