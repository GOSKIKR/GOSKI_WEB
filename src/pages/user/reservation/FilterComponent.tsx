import React, { useState, useEffect } from "react";
import { FaSkiing, FaCalendarAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import userReserveStore from "../../../store/userReserveStore";
import dummyData from "./FilterDummyData";

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

type TeamsFilterResult = {
  teamId: number;
  teamName: string;
  description: string;
  cost: number;
  teamProfileUrl: string;
  rating: number;
  instructors: number[];
  teamImages: {
    teamImageId: number;
    imageUrl: string;
  }[];
  basicFee: number;
  peopleOptionFee: number;
  designatedFee: number;
  levelOptionFee: number;
  lessonType: string;
  reviewCount: number;
  reviews: {
    reviewId: number;
    rating: number;
    content: string;
    createdAt: string;
    instructorTags: {
      tagReviewId: number;
      tagName: string;
    }[];
  }[];
};

type InstructorsFilterResult = {
  instructorId: number;
  userName: string;
  teamId: number;
  teamName: string;
  position: string;
  description: string;
  instructorUrl: string;
  gender: string;
  certificateInfo: {
    certificateId: number;
    certificateName: string;
    certificateType: string;
    certificateImageUrl: string;
  }[];
  rating: number;
  reviewCount: number;
  cost: number;
  basicFee: number;
  peopleOptionFee: number;
  designatedFee: number;
  levelOptionFee: number;
  lessonType: string;
  reviews: {
    reviewId: number;
    rating: number;
    content: string;
    createdAt: string;
    instructorTags: {
      tagReviewId: number;
      tagName: string;
    }[];
  }[];
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
  const [lesstonType, setLessonType] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [lessonTime, setLessonTime] = useState<string>("");
  const [lessonDurationTimes, setLessonDurationTimes] = useState<number[]>([]);
  const [lessonDuration, setLessonDuration] = useState<number>(0);
  const [lessonLevel, setLessonLevel] = useState<string>("");
  const [lessonLocation, setLessonLocation] = useState<string>("");
  const [lessonParticipant, setLessonParticipant] = useState<number>(0);

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
    setLocationsInfo(dummyData.locationsData);
  }, []);

  // 장소 변경 핸들러
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLessonLocation(e.target.value); //장소 선택
    //장소에 따른 시간 설정
    const selectedResort = locationsInfo.find(
      //선택된 리조트 정보
      (location) => location.resortName === e.target.value //선택된 장소와 일치하는 리조트 정보
    );
    if (selectedResort) {
      //선택된 리조트 정보가 있으면
      setLessonDurationTimes(selectedResort.lessonTime); //가능 시간 설정
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-5 px-5 py-10">
      <div className="flex flex-row w-full justify-center space-x-5">
        <div
          className={`flex items-center justify-center w-1/3 sm:h-14 h-12 rounded-lg cursor-pointer transition-all ${
            selectedLessonType === "SKI"
              ? "bg-primary-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setLessonType("SKI")}
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
          onClick={() => setLessonType("BOARD")}
        >
          <FaSkiing size="24" className="mr-2 -scale-x-100" />
          <span className="font-bold">보드</span>
        </div>
      </div>

      <div className="flex flex-wrap bg-primary-50 rounded-lg shadow-md w-full sm:mx-5 p-5 space-y-5 sm:space-y-0 justify-between">
        <div className="flex flex-col sm:flex-row w-full sm:justify-between items-center space-y-5 sm:space-y-0">
          <div className="flex flex-col items-center w-full sm:w-1/3">
            <label className="mb-1 text-sm">장소</label>
            <select
              value={lessonLocation}
              onChange={(e) => handleLocationChange(e)}
              className="w-full sm:w-3/4 px-2 py-1 rounded shadow-md text-sm"
            >
              {dummyData.locationsData.map((resort) => (
                <option key={resort.resortId} value={resort.resortName}>
                  {resort.resortName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center w-full sm:w-1/3">
            <label className="mb-1 text-sm">인원</label>
            <select
              value={lessonParticipant}
              onChange={(e) => setLessonParticipant(parseInt(e.target.value))}
              className="w-full sm:w-3/4 px-2 py-1 rounded shadow-md text-sm"
            >
              {[...Array(8).keys()].map((i) => (
                <option key={i} value={i + 1}>
                  {i + 1}명
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center w-full sm:w-1/3">
            <label className="mb-1 text-sm">난이도</label>
            <select
              value={level}
              onChange={(e) => setLessonLevel(e.target.value)}
              className="w-full sm:w-3/4 px-2 py-1 rounded shadow-md text-sm"
            >
              <option value={"beginner"}>초급</option>
              <option value={"intermediate"}>중급</option>
              <option value={"advanced"}>고급</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:justify-between items-center space-y-5 sm:space-y-0">
          <div className="flex flex-col items-center w-full sm:w-1/3 relative">
            <label className="mb-1 text-sm">날짜</label>
            <div className="flex flex-1">
              <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                className="shadow-lg w-full sm:text-sm text-xs"
                min={today}
              />
            </div>
          </div>

          <div className="flex flex-col items-center w-full sm:w-1/3">
            <label className="mb-1 text-sm">시작 시간</label>
            <input
              type="time"
              step={30}
              value={startTime}
              onChange={(e) => setLessonTime(e.target.value)}
              className="w-full sm:w-3/4 px-2 py-1 rounded shadow-md text-sm"
            />
          </div>

          <div className="flex flex-col items-center w-full sm:w-1/3">
            <label className="mb-1 text-sm">총 시간</label>
            <select
              onChange={(e) => setLessonDuration(parseInt(e.target.value))}
              className="px-6 bg-white shadow-md rounded-lg flex-1 h-9"
            >
              <option value="">강습 시간을 선택하세요</option>
              {lessonDurationTimes.map((time) => (
                <option key={time} value={time}>
                  {time}시간
                </option>
              ))}
            </select>
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
