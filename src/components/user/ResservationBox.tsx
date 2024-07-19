import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import userReserveStore from "../../store/userReserveStore";
import userResortsStore from "../../store/userResortsStore";

import apiClient from "../../utils/config/axiosConfig";

import TimePicker from "../common/TimePicker";

interface Resort {
  resortId: number;
  resortName: string;
  lessonType: string; //'SKI' | 'BOARD';
  studentCount: number;
  lessonDate: string; // 'YYYY-MM-DD';
  startTime: string; // 'hhmm';
  duration: number;
  level: string; //'beginner' | 'intermediate' | 'advanced'
}

type ResortLocations = {
  resortId: number;
  resortName: string;
  resortLocation: string;
  longitude: number;
  latitude: number;
  lessonTime: number[];
};

const ReservationBox = () => {
  const [lessonType, setLessonType] = useState<string>("");
  const [locationsInfo, setLocationsInfo] = useState<ResortLocations[]>([]);
  const [selectedLocation, setLocation] = useState<string>("");
  const [participant, setParticipant] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [durationTimes, setdurationTimes] = useState<number[]>([]);
  const [selectedDurationTime, setDurationTime] = useState<number>(0);
  const [level, setLevel] = useState<string>("");

  const [lessonStartTime, setLessonStartTime] = useState("");

  const { setReservationInfo } = userReserveStore();
  const { setResortInfo } = userResortsStore();

  const navigate = useNavigate();

  // 초기 리조트 정보 설정
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient().get("/common/resort");
        console.log(response.data.data);
        setLocationsInfo(response.data.data);
        setResortInfo(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // 장소 변경 핸들러
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value); //장소 선택
    //장소에 따른 시간 설정
    const selectedResort = locationsInfo.find(
      //선택된 리조트 정보
      (location) => location.resortName === e.target.value //선택된 장소와 일치하는 리조트 정보
    );
    if (selectedResort) {
      //선택된 리조트 정보가 있으면
      setdurationTimes(selectedResort.lessonTime); //가능 시간 설정
    }
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
      !lessonType ||
      !selectedLocation ||
      !participant ||
      !selectedDate ||
      !lessonStartTime ||
      !selectedDurationTime ||
      !level
    ) {
      alert("모든 필드를 선택해 주세요.");
      return;
    }

    setReservationInfo({
      resortId: locationsInfo.find(
        (location) => location.resortName === selectedLocation
      )?.resortId as number,
      resortName: selectedLocation,
      lessonType: lessonType,
      studentCount: participant,
      lessonDate: selectedDate,
      startTime: lessonStartTime,
      duration: selectedDurationTime,
      level: level,
    } as Resort);
    setResortInfo({
      resortId: locationsInfo.find(
        (location) => location.resortName === selectedLocation
      )?.resortId as number,
      resortName: selectedLocation,
      resortLocation: locationsInfo.find(
        (location) => location.resortName === selectedLocation
      )?.resortLocation as string,
      longitude: locationsInfo.find(
        (location) => location.resortName === selectedLocation
      )?.longitude as number,
      latitude: locationsInfo.find(
        (location) => location.resortName === selectedLocation
      )?.latitude as number,
      lessonTime: locationsInfo.find(
        (location) => location.resortName === selectedLocation
      )?.lessonTime as number[],
    });

    navigate("/reserve/result");
  };

  // 현재 날짜
  const today = new Date().toISOString().split("T")[0]; // Format today as 'YYYY-MM-DD'

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-4 w-full justify-start items-center lg:items-stretch sm:bg-[url('/assets/images/bgski.jpg')] bg-cover bg-center sm:p-4 lg:p-8 rounded-lg shadow-lg">
      <div className="flex flex-col space-y-6 w-full lg:w-120 bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mb-4">
          <label className="mb-1 sm:mb-0 sm:w-28 text-center w-24 font-bold">
            종류
          </label>
          <div className="flex flex-1 rounded-lg shadow-md sm:w-28 ">
            <button
              className={`flex-1 h-9 rounded-l-lg ${
                lessonType === "SKI"
                  ? "bg-primary-500 text-white"
                  : "bg-white hover:bg-gray-50 "
              }`}
              onClick={() => setLessonType("SKI")}
            >
              스키
            </button>
            <button
              className={`flex-1 h-9 rounded-r-lg  ${
                lessonType === "BOARD"
                  ? "bg-primary-500 text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => setLessonType("BOARD")}
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
            {locationsInfo.map((location) => (
              <option key={location.resortId} value={location.resortName}>
                {location.resortName}
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
              className="shadow-lg w-full sm:text-sm text-xs"
              min={today}
            />
          </div>
        </div>
        <TimePicker
          startTime={lessonStartTime}
          setStartTime={setLessonStartTime}
        />
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mb-4">
          <label className="mb-1 sm:mb-0 sm:w-28 text-center w-24 font-bold">
            강습 시간
          </label>
          <select
            onChange={(e) => {
              setDurationTime(parseInt(e.target.value));
              console.log(e.target.value);
            }}
            className="px-6 bg-white shadow-md rounded-lg flex-1 h-9"
          >
            <option value="">강습 시간을 선택하세요</option>
            {durationTimes.map((time) => (
              <option key={time} value={time}>
                {time}시간
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mb-4">
          <label className="mb-1 sm:mb-0 sm:w-28 text-center w-24 font-bold">
            레벨 선택
          </label>
          <div className="flex flex-1 shadow-md rounded-lg ">
            <button
              className={`h-14 ${
                level === "BEGINNER"
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100"
              } w-1/3 flex flex-col items-center justify-center rounded-l-lg border-r-2 hover:scale-98`}
              onClick={() => setLevel("BEGINNER")}
            >
              <div className="sm:text-md text-sm">초급</div>
              <div className="sm:text-[10px] text-[8px]">
                Level 1 이상 강사진
              </div>
            </button>
            <button
              className={`h-14 ${
                level === "INTERMEDIATE"
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100"
              } w-1/3 flex flex-col items-center justify-center border-r-2 hover:scale-98`}
              onClick={() => setLevel("INTERMEDIATE")}
            >
              <div className="sm:text-md text-sm">중급</div>
              <div className="sm:text-[10px] text-[8px]">
                Level 2 이상 강사진
              </div>
            </button>
            <button
              className={`h-14 ${
                level === "ADVANCED"
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100"
              } w-1/3 flex flex-col items-center justify-center rounded-r-lg hover:scale-98`}
              onClick={() => setLevel("ADVANCED")}
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
