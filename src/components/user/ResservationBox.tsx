import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/store";

interface Resort {
  resortId: number;
  resortName: string;
  resortLocation: string;
  latitude: number;
  longitude: number;
  lessonTime: number[];
}

// 임시 장소 데이터
const locations: Resort[] = [
  {
    resortId: 1,
    resortName: "장소1",
    resortLocation: "위치1",
    latitude: 35.0,
    longitude: 128.0,
    lessonTime: [1, 2, 3],
  },
  {
    resortId: 2,
    resortName: "장소2",
    resortLocation: "위치2",
    latitude: 36.0,
    longitude: 129.0,
    lessonTime: [2, 3, 4],
  },
];

const ReservationBox = () => {
  const [type, setType] = useState(""); // 상태 추가: 스키 또는 보드 선택
  const [location, setLocation] = useState(""); // 상태 추가: 장소 선택
  const [participant, setParticipant] = useState(1); // 상태 추가: 참가자 수
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // 상태 추가: 선택된 날짜
  const [startTime, setStartTime] = useState(""); // 상태 추가: 시작 시간
  const [lessonTimes, setLessonTimes] = useState<number[]>([]); // 상태 추가: 강습 시간
  const [level, setLevel] = useState<number | null>(null); // 상태 수정: 레벨 선택

  const { setReservationDetails } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    setLessonTimes(
      locations.find((loc) => loc.resortName === location)?.lessonTime || []
    );
  }, [location]);

  // 장소 변경 핸들러
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
  };

  // 참가자 수 감소 핸들러
  const handleParticipantDecrement = () => {
    setParticipant((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // 참가자 수 증가 핸들러
  const handleParticipantIncrement = () => {
    setParticipant((prev) => (prev < 8 ? prev + 1 : prev));
  };

  // 예약 데이터 전역 상태에 저장
  const handleSaveReservation = () => {
    if (
      !type ||
      !location ||
      participant === 0 ||
      !selectedDate ||
      !startTime ||
      lessonTimes.length === 0 ||
      level === null
    ) {
      alert("모든 필드를 선택해 주세요.");
      return;
    }

    setReservationDetails({
      type: type,
      location: location,
      participants: participant,
      date: selectedDate as string,
      startTime: startTime,
      duration: lessonTimes[0].toString(),
      level: level as number,
    });

    navigate("/reserve/result");
  };

  // 현재 날짜
  const today = new Date().toISOString().split("T")[0]; // Format today as 'YYYY-MM-DD'

  return (
    <div
      className="flex flex-col lg:flex-row lg:space-x-4 w-full justify-center items-center lg:items-stretch bg-cover bg-center p-4 lg:p-8 rounded-lg shadow-lg"
      style={{ backgroundImage: "url('/assets/images/bgski.jpg')" }}
    >
      <div className="flex flex-col space-y-6 w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mb-4">
          <label className="mb-1 sm:mb-0 sm:w-28 text-center w-24 font-bold">
            종류
          </label>
          <div className="flex flex-1 rounded-lg shadow-md">
            <button
              className={`flex-1 h-9 rounded-l-lg ${
                type === "스키" ? "bg-primary-500 text-white" : "bg-gray-100"
              }`}
              onClick={() => setType("스키")}
            >
              스키
            </button>
            <button
              className={`flex-1 h-9 rounded-r-lg ${
                type === "보드" ? "bg-gray-700 text-white" : "bg-white"
              }`}
              onClick={() => setType("보드")}
            >
              보드
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mb-4">
          <label className="mb-1 sm:mb-0 sm:w-28 text-center w-24 font-bold">
            장소
          </label>
          <select
            defaultValue="select"
            onChange={(e) => {
              e.target.classList.remove("text-gray-500");
              handleLocationChange(e);
            }}
            className="px-6 bg-white text-gray-500 rounded-lg shadow-md flex-1 h-9"
          >
            <option value="select" disabled hidden>
              장소를 선택하세요
            </option>
            {locations.map((loc) => (
              <option key={loc.resortId} value={loc.resortName}>
                {loc.resortName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mb-4">
          <label className="mb-1 sm:mb-0 sm:w-28 text-center w-24 font-bold">
            강습인원
          </label>
          <div className="flex items-center flex-1 bg-white rounded-lg shadow-md h-9">
            <button
              onClick={handleParticipantDecrement}
              className={`h-9 w-1/3 text-2xl font-extrabold ${
                participant === 0 ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={participant === 0}
            >
              -
            </button>
            <div className="h-9 w-1/3 flex justify-center items-center flex-1">
              {participant === 8 ? "8" : participant}
            </div>
            <button
              onClick={handleParticipantIncrement}
              className={`h-9 w-1/3 text-2xl font-extrabold ${
                participant === 8 ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={participant === 8}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mb-4">
          <label className="mb-1 sm:mb-0 sm:w-28 text-center w-24 font-bold">
            일정 선택
          </label>
          <div className="flex flex-1">
            <input
              type="date"
              onChange={(e) => setSelectedDate(e.target.value)}
              className="shadow-lg sm:w-[250px] w-[220px] sm:text-sm text-xs"
              min={today}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mb-4">
          <label className="mb-1 sm:mb-0 sm:w-28 text-center w-24 font-bold">
            시작 시간
          </label>
          <div className="flex flex-1">
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-2 bg-white shadow-md rounded-lg h-9 text-center"
              step="1800" // 30 minutes
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mb-4">
          <label className="mb-1 sm:mb-0 sm:w-28 text-center w-24 font-bold">
            강습 시간
          </label>
          <select
            onChange={(e) => setLessonTimes([parseInt(e.target.value)])}
            className="px-6 bg-white shadow-md rounded-lg flex-1 h-9"
          >
            <option value="">강습 시간을 선택하세요</option>
            {lessonTimes.map((time) => (
              <option key={time} value={time}>
                {`${String(time)}시간`}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mb-4">
          <label className="mb-1 sm:mb-0 sm:w-28 text-center w-24 font-bold">
            레벨 선택
          </label>
          <div className="flex flex-1 shadow-md rounded-lg">
            <button
              className={`h-14 ${
                level === 1 ? "bg-primary-500 text-white" : "bg-gray-100"
              } w-1/3 flex flex-col items-center justify-center rounded-l-lg border-r-2`}
              onClick={() => setLevel(1)}
            >
              <div className="sm:text-md text-sm">초급</div>
              <div className="sm:text-[10px] text-[8px]">
                Level 1 이상 강사진
              </div>
            </button>
            <button
              className={`h-14 ${
                level === 2 ? "bg-primary-500 text-white" : "bg-gray-100"
              } w-1/3 flex flex-col items-center justify-center border-r-2`}
              onClick={() => setLevel(2)}
            >
              <div className="sm:text-md text-sm">중급</div>
              <div className="sm:text-[10px] text-[8px]">
                Level 2 이상 강사진
              </div>
            </button>
            <button
              className={`h-14 ${
                level === 3 ? "bg-primary-500 text-white" : "bg-gray-100"
              } w-1/3 flex flex-col items-center justify-center rounded-r-lg px-1`}
              onClick={() => setLevel(3)}
            >
              <div className="sm:text-md text-sm">고급</div>
              <div className="sm:text-[10px] text-[8px]">
                Level 3 이상 강사진
              </div>
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center w-full xl:w-auto mt-4 xl:mt-0">
          <button
            onClick={handleSaveReservation}
            className="w-16 h-16 bg-primary-500 text-white rounded-full flex justify-center items-center text-3xl shadow-md hover:bg-primary-600 transition-colors duration-300"
          >
            <IoMdSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationBox;
