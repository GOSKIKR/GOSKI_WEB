import React, { useState } from "react";
import { FaSkiing, FaCalendarAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useStore from "../../../store/store";

interface FilterComponentProps {
  applyFilter: (filters: {
    type: string;
    location: string;
    participant: number;
    selectedDate: Date | null;
    startTime: string;
    entireTime: number;
    level: number;
  }) => void;
  isSearchClicked: () => void;
}

//전역에서 상태 받아오기
const ReservationResult = () => {
  const { type, location, participants, date, startTime, duration, level } =
    useStore();

  return (
    <div>
      <p>종류: {type}</p>
      <p>장소: {location}</p>
    </div>
  );
};

const FilterComponent: React.FC<FilterComponentProps> = ({
  applyFilter,
  isSearchClicked,
}) => {
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [participant, setParticipant] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState("");
  const [entireTime, setEntireTime] = useState(0);
  const [level, setLevel] = useState(0);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const today = new Date();

  const toggleCalendar = () => {
    setCalendarOpen(!calendarOpen);
  };

  const handleSearch = () => {
    applyFilter({
      type,
      location,
      participant,
      selectedDate,
      startTime,
      entireTime,
      level,
    });
    isSearchClicked();
  };

  return (
    <div className="w-full flex flex-col items-center space-y-5 px-5 py-10">
      <div className="flex flex-row w-full justify-center space-x-5">
        <div
          className={`flex items-center justify-center w-1/3 sm:h-14 h-12 rounded-lg cursor-pointer transition-all ${
            type === "스키"
              ? "bg-primary-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setType("스키")}
        >
          <FaSkiing size="24" className="mr-2" />
          <span className="font-bold">스키</span>
        </div>
        <div
          className={`flex items-center justify-center w-1/3 sm:h-14 h-12 rounded-lg cursor-pointer transition-all ${
            type === "보드"
              ? "bg-primary-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setType("보드")}
        >
          <FaSkiing size="24" className="mr-2 -scale-x-100" />
          <span className="font-bold">보드</span>
        </div>
      </div>

      <div className="flex flex-wrap bg-primary-50 rounded-lg shadow-md w-full sm:mx-5 p-5 space-y-5 sm:space-y-0 justify-between">
        <div className="flex flex-col sm:flex-row w-full sm:justify-between items-center space-y-5 sm:space-y-0">
          <div className="flex flex-col items-center w-full sm:w-1/3">
            <label className="mb-1 text-sm">장소 *</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full sm:w-3/4 px-2 py-1 rounded shadow-md text-sm"
            >
              {["a스키장", "b스키장", "c스키장"].map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center w-full sm:w-1/3">
            <label className="mb-1 text-sm">인원 *</label>
            <select
              value={participant}
              onChange={(e) => setParticipant(parseInt(e.target.value))}
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
            <label className="mb-1 text-sm">난이도 *</label>
            <select
              value={level}
              onChange={(e) => setLevel(parseInt(e.target.value))}
              className="w-full sm:w-3/4 px-2 py-1 rounded shadow-md text-sm"
            >
              <option value={1}>초급</option>
              <option value={2}>중급</option>
              <option value={3}>고급</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:justify-between items-center space-y-5 sm:space-y-0">
          <div className="flex flex-col items-center w-full sm:w-1/3 relative">
            <label className="mb-1 text-sm">날짜</label>
            <div
              className="flex items-center cursor-pointer"
              onClick={toggleCalendar}
            >
              <FaCalendarAlt size="24" className="mr-2" />
              <span>
                {selectedDate
                  ? selectedDate.toLocaleDateString()
                  : "Select Date"}
              </span>
            </div>
            {calendarOpen && (
              <div className="absolute top-full mt-2 z-10">
                <Calendar
                  onClickDay={(value) => {
                    setSelectedDate(value);
                    setCalendarOpen(false);
                  }}
                  minDate={today}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col items-center w-full sm:w-1/3">
            <label className="mb-1 text-sm">시간</label>
            <input
              type="time"
              step={30}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full sm:w-3/4 px-2 py-1 rounded shadow-md text-sm"
            />
          </div>

          <div className="flex flex-col items-center w-full sm:w-1/3">
            <label className="mb-1 text-sm">총 시간</label>
            <input
              type="number"
              value={entireTime}
              onChange={(e) => setEntireTime(parseInt(e.target.value))}
              className="w-full sm:w-3/4 px-2 py-1 rounded shadow-md text-sm"
            />
          </div>
        </div>

        <div className="flex justify-center w-full pt-5">
          <button
            onClick={handleSearch}
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
