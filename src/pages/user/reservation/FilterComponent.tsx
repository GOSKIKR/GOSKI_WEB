import React, { useState, useEffect } from "react";
import { FaSkiing } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import TimePicker from "../../../components/common/TimePicker";
import userReserveStore from "../../../store/userReserveStore";

import {
  TeamsFilterResult,
  InstructorsFilterResult,
} from "../../../interface/ReservationTypes";

import apiClient from "../../../utils/config/axiosConfig";

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

type FilterComponentProps = {
  selectedLessonType: string;
  filteredData: TeamsFilterResult[] | InstructorsFilterResult[];
  handleSearchClick: () => void;
};

const FilterComponent: React.FC<FilterComponentProps> = ({
  selectedLessonType,
  filteredData,
  handleSearchClick,
}) => {
  const [filterLessonType, setFilterLessonType] = useState<string>("");
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterLessonTime, setFilterLessonTime] = useState<string>("");
  const [filterLessonDurationTimes, setFilterLessonDurationTimes] = useState<
    number[]
  >([]);
  const [filterLessonDuration, setFilterLessonDuration] = useState<number>(0);
  const [filterLessonLevel, setFilterLessonLevel] = useState<string>("");
  const [filterLessonLocation, setFilterLessonLocation] = useState<string>("");
  const [filterLessonParticipant, setFilterLessonParticipant] =
    useState<number>(0);

  // 현재 날짜
  const today = new Date().toISOString().split("T")[0];

  const [locationsInfo, setLocationsInfo] = useState<ResortLocations[]>([]);

  const {
    resortName,
    lessonType,
    studentCount,
    lessonDate,
    startTime,
    duration,
    level,
    setReservationInfo,
  } = userReserveStore();

  // 초기 리조트 정보 설정
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient().get("/common/resort");
        console.log(response.data.data);
        setLocationsInfo(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilterLessonType(lessonType);
    setFilterLessonLocation(resortName);
    setFilterLessonParticipant(studentCount);
    setFilterDate(lessonDate);
    setFilterLessonTime(startTime);
    setFilterLessonDuration(duration);
    setFilterLessonLevel(level);
  }, []);

  // 초기 리조트 정보 설정
  useEffect(() => {
    const selectedResort = locationsInfo.find(
      (location) => location.resortName === resortName
    );
    if (selectedResort) {
      setFilterLessonDurationTimes(selectedResort.lessonTime);
    }
  }, []);

  // 장소 변경 핸들러
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterLessonLocation(e.target.value); //장소 선택
    //장소에 따른 시간 설정
    const selectedResort = locationsInfo.find(
      //선택된 리조트 정보
      (location) => location.resortName === e.target.value //선택된 장소와 일치하는 리조트 정보
    );
    if (selectedResort) {
      //선택된 리조트 정보가 있으면
      setFilterLessonDurationTimes(selectedResort.lessonTime); //가능 시간 설정
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-5 py-10">
      <div className="flex flex-row w-full justify-center space-x-5">
        <div
          className={`flex items-center justify-center w-1/3 sm:h-14 h-12 rounded-lg cursor-pointer transition-all ${
            selectedLessonType === "SKI"
              ? "bg-primary-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setFilterLessonType("SKI")}
        >
          <FaSkiing size="24" className="mr-2" />
          <span className="font-bold">스키</span>
        </div>
        <div
          className={`flex items-center justify-center w-1/3 sm:h-14 h-12 rounded-lg cursor-pointer transition-all ${
            selectedLessonType === "BOARD"
              ? "bg-primary-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setFilterLessonType("BOARD")}
        >
          <FaSkiing size="24" className="mr-2 -scale-x-100" />
          <span className="font-bold">보드</span>
        </div>
      </div>

      <div className="flex flex-wrap bg-primary-50 rounded-lg shadow-md w-full sm:mx-5 p-5 space-y-5 sm:space-y-0 justify-between">
        <div className="flex flex-col sm:flex-row w-full sm:justify-between items-center space-y-5 sm:space-y-0">
          <div className="flex flex-row w-full justify-between items-center space-x-5">
            <div className="flex flex-col items-center w-full sm:w-1/6">
              <label className="mb-1 text-sm">장소</label>
              <select
                value={filterLessonLocation}
                onChange={(e) => handleLocationChange(e)}
                className="w-full sm:w-full px-2 py-1 rounded shadow-md text-sm"
              >
                {locationsInfo.map((resort) => (
                  <option key={resort.resortId} value={resort.resortName}>
                    {resort.resortName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col items-center w-full sm:w-1/6">
              <label className="mb-1 text-sm">인원</label>
              <select
                value={filterLessonParticipant}
                onChange={(e) =>
                  setFilterLessonParticipant(parseInt(e.target.value))
                }
                className="w-full sm:w-full px-2 py-1 rounded shadow-md text-sm"
              >
                {[...Array(8).keys()].map((i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}명
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col items-center w-full sm:w-1/6">
              <label className="mb-1 text-sm">난이도</label>
              <select
                value={filterLessonLevel}
                onChange={(e) => setFilterLessonLevel(e.target.value)}
                className="w-full sm:w-full px-2 py-1 rounded shadow-md text-sm"
              >
                <option value={"BEGINNER"}>초급</option>
                <option value={"INTERMEDIATE"}>중급</option>
                <option value={"ADVANCED"}>고급</option>
              </select>
            </div>

            <div className="flex flex-col items-center w-full sm:w-1/6 relative">
              <label className="mb-1 text-sm">날짜</label>
              <div className="flex flex-1">
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="shadow-lg w-full sm:text-sm text-xs"
                  min={today}
                />
              </div>
            </div>

            <TimePicker
              startTime={filterLessonTime}
              setStartTime={setFilterLessonTime}
            />

            <div className="flex flex-col items-center w-full sm:w-1/6">
              <label className="mb-1 text-sm">강습 시간</label>
              <select
                value={filterLessonDuration}
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
        </div>

        <div className="flex justify-center w-full pt-5">
          <button
            onClick={handleSearchClick}
            className="flex items-center justify-center bg-primary-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            <IoIosSearch size="24" />
            <span className="ml-2 text-lg">검색</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
