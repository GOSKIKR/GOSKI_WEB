import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarUser from "../../../components/common/NavbarUser";
import BeforePay from "../../../components/user/BeforePay";
import NavbarUserMobile from "../../../components/common/NavbarUserMobile";
import { IoClose } from "react-icons/io5";

import teamInfoStore from "../../../store/teamInfoStore";

const TeamInfo: React.FC = () => {
  const [startTime, setStartTime] = useState<string>("");
  const [lessonTime, setLessonTime] = useState(0);
  // const [lessonTimes, setLessonTimes] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const lessonTimes: number[] = [1, 2, 3];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {
    teamId,
    teamName,
    description,
    cost,
    teamProfileUrl,
    rating,
    instructors,
    teamImages,
    basicFee,
    peopleOptionFee,
    designatedFee,
    levelOptionFee,
    lessonType,
    reviewCount,
    reviews,
  } = teamInfoStore();

  return (
    <div>
      <div className="w-full">
        {innerWidth > 640 ? <NavbarUser /> : <NavbarUserMobile />}
      </div>
      <div className="flex flex-col justify-center items-center px-4 py-8 space-y-3">
        <img
          src="/assets/images/AppLogo.png"
          alt="App Logo"
          className="w-16 h-auto"
        />
        <div className="text-xl font-extrabold">GOSKI 강습 예약</div>
      </div>
      <div className="flex flex-col sm:flex-row px-12 sm:space-x-6 space-y-6">
        <div className="w-full sm:w-7/12 h-[2400px] bg-primary-50 rounded-lg shadow-md">
          <div className="px-6 py-6 text-lg font-bold">팀 소개</div>
        </div>
        <div className="flex flex-col sm:w-4/12 self-start sticky top-4">
          <div className="w-full">
            <div className="flex items-center mb-4">
              <label className="mb-1 mr-4 sm:w-20 w-24 font-bold">
                시작 시간
              </label>
              <div className="flex flex-1">
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-2 bg-white border-2 shadow-md rounded-lg h-9 text-center"
                  step="1800" // 30 minutes
                />
              </div>
            </div>
            <div className="flex items-center mb-4">
              <label className="mb-1 mr-4 sm:w-20 w-24 font-bold">
                강습 시간
              </label>
              <select
                onChange={(e) => setLessonTime(parseInt(e.target.value))}
                className="px-6 bg-white border-2 shadow-md rounded-lg flex-1 h-9 text-center items-center justify-center"
              >
                <option value="">강습 시간을 선택하세요</option>
                {lessonTimes.map((time) => (
                  <option key={time} value={time}>
                    {`${String(time)}시간`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col px-8 py-6 space-y-3 w-full h-60 bg-primary-50 rounded-lg shadow-md items-center justify-center mb-8">
            <div className="font-extrabold pb-2 w-full">최종 결제금액</div>
            <div className="w-full flex flex-row justify-between">
              <div>기존 강습비</div>
              <div>{basicFee}원</div>
            </div>
            <div className="w-full flex flex-row justify-between">
              <div>레벨 옵션비</div>
              <div>{levelOptionFee}원</div>
            </div>
            <div className="w-full my-[1%] border-[1px] border-black"></div>
            <div className="w-full flex flex-row justify-between pb-3">
              <div className="font-extrabold">총 결제금액</div>
              <div className="text-blue-500 font-extrabold">
                {basicFee} + {levelOptionFee} = {basicFee + levelOptionFee}원
              </div>
            </div>

            <div
              onClick={openModal}
              className="h-20 w-1/2 p-1 bg-white rounded-lg shadow-md text-black text-center flex items-center justify-center cursor-pointer hover:bg-slate-200"
            >
              예약하기
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative sm:w-10/12 h-5/6 overflow-y-auto ">
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-800"
            >
              <IoClose size="25px" />
            </button>
            <BeforePay onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamInfo;
