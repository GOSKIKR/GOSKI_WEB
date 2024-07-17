import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarUser from "../../../components/common/NavbarUser";
import BeforePay from "../../../components/user/BeforePay";
import NavbarUserMobile from "../../../components/common/NavbarUserMobile";
import { IoClose } from "react-icons/io5";

import teamInfoStore from "../../../store/teamInfoStore";
import userReserveStore from "../../../store/userReserveStore";
import userResortsStore from "../../../store/userResortsStore";
import TimePicker from "../../../components/common/TimePicker";

const TeamInfo: React.FC = () => {
  const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  const [selectedLessonTime, setSelectedLessonTime] = useState(0);
  // const [lessonTimes, setLessonTimes] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [filterLessonDurationTimes, setFilterLessonDurationTimes] = useState<
    number[]
  >([]);
  const [filterLessonDuration, setFilterLessonDuration] = useState<number>(0);

  const navigate = useNavigate();

  const openModal = () => {
    if (localStorage.getItem("accesstoken") === null) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    } else {
      setIsModalOpen(true);
    }
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

  const {
    resortId: reserveResortId,
    resortName: reserveResortName,
    lessonType: reserveLessonType,
    studentCount,
    lessonDate,
    startTime,
    duration,
    level,
  } = userReserveStore();
  console.log(
    reserveResortId,
    reserveResortName,
    reserveLessonType,
    studentCount,
    lessonDate,
    startTime,
    duration,
    level
  );

  const {
    resortId,
    resortName,
    resortLocation,
    longitude,
    latitude,
    lessonTime,
  } = userResortsStore();

  console.log(
    resortId,
    resortName,
    resortLocation,
    longitude,
    latitude,
    lessonTime
  );

  useEffect(() => {
    setFilterLessonDuration(duration);
    setFilterLessonDurationTimes(lessonTime);
    setSelectedStartTime(startTime);
  }, [lessonTime]);

  //새로고침시 경고창
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
          <div className="">
            {teamImages ? (
              teamImages.map((image, index) => (
                <img
                  key={index}
                  src={image.imageUrl}
                  alt="team image"
                  className="w-full h-[300px] object-cover"
                />
              ))
            ) : (
              <img
                src="/assets/images/noImage.png"
                alt="team image"
                className="w-full h-[300px] object-cover"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col sm:w-4/12 self-start sticky top-5">
          <div className="w-full">
            <div className="flex items-center mb-4">
              <TimePicker
                startTime={selectedStartTime}
                setStartTime={setSelectedStartTime}
              />
            </div>
            <div className="flex items-center mb-4">
              <label className="mb-1 mr-4 sm:w-20 w-24 font-bold">
                강습 시간
              </label>
              <select
                // value={duration}
                value={filterLessonDuration.toString()}
                onChange={(e) =>
                  setFilterLessonDuration(parseInt(e.target.value))
                }
                className="px-6 bg-white shadow-md rounded-lg flex-1 h-9"
              >
                {filterLessonDurationTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}시간
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
              <div>{levelOptionFee ? levelOptionFee : 0}원</div>
            </div>
            <div className="w-full my-[1%] border-[1px] border-black"></div>
            <div className="w-full flex flex-row justify-between pb-3">
              <div className="font-extrabold">총 결제금액</div>
              <div className="text-blue-500 font-extrabold">
                {basicFee} + {levelOptionFee ? levelOptionFee : 0} ={" "}
                {basicFee + levelOptionFee}원
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
