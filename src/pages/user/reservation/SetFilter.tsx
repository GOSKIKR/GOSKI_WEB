import React, { useState } from "react";
import NavbarUser from "../../../components/common/NavbarUser";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt } from "react-icons/fa";

const SetFilter: React.FC = () => {
    const navigate = useNavigate();
    const [type, setType] = useState("스키");
    const types = ["스키", "보드"];
    const [location, setLocation] = useState("");
    const locations = ["a스키장", "b스키장", "c스키장"];
    const [participant, setParticipant] = useState(0);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [startTime, setStartTime] = useState("");
    const [entireTime, setEntireTime] = useState(0);
    const [level, setLevel] = useState(1);
    const [calendarOpen, setCalendarOpen] = useState(false);

    const goToResult = () => {
        navigate("/reserve/result", {
            state: {
                type,
                location,
                participant,
                selectedDate,
                startTime,
                entireTime,
                level,
            },
        });
    };

    const handleParticipantIncrement = () => {
        if (participant < 10) {
            setParticipant((prev) => prev + 1);
        }
    };

    const handleParticipantDecrement = () => {
        if (participant > 0) {
            setParticipant((prev) => prev - 1);
        }
    };

    const handleTimeIncrement = () => {
        if (entireTime < 10) {
            setEntireTime((prev) => prev + 1);
        }
    };

    const handleTimeDecrement = () => {
        if (entireTime > 0) {
            setEntireTime((prev) => prev - 1);
        }
    };

    const toggleCalendar = () => {
        setCalendarOpen(!calendarOpen);
    };

    const generateTimeSlots = () => {
        const slots = [];
        for (let i = 0; i < 24; i++) {
            slots.push(`${i.toString().padStart(2, "0")}:00`);
            slots.push(`${i.toString().padStart(2, "0")}:30`);
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    const today = new Date();

    return (
        <div className="min-h-screen flex flex-col">
            <NavbarUser />
            <div className="flex flex-col justify-center items-center px-4 py-8 space-y-3">
                <img
                    src="/assets/images/AppLogo.png"
                    alt="App Logo"
                    className="w-16 h-auto"
                />
                <div className="text-xl font-extrabold">GOSKI 강습 예약</div>
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-10 w-full justify-center items-center sm:items-stretch">
                <div className="p-6 w-full sm:w-1/2 bg-primary-50 border border-gray-300 rounded-lg shadow-sm space-y-4">
                    <div className="flex items-center mb-4">
                        <label className="mb-1 mr-4 sm:w-20 w-24 font-bold">
                            종류 *
                        </label>
                        <div className="flex flex-1">
                            <button
                                className={`flex-1 h-9 rounded-l-lg border-y-2 border-l-2 border-gray-400 ${
                                    type === "스키"
                                        ? "bg-gray-700 text-white"
                                        : "bg-gray-100"
                                }`}
                                onClick={() => setType("스키")}
                            >
                                스키
                            </button>
                            <button
                                className={`flex-1 h-9 rounded-r-lg border-x-2 border-y-2 border-gray-400 ${
                                    type === "보드"
                                        ? "bg-gray-700 text-white"
                                        : "bg-gray-100"
                                }`}
                                onClick={() => setType("보드")}
                            >
                                보드
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="mb-1 mr-4 sm:w-20 w-24 font-bold">
                            장소 *
                        </label>
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="px-6 bg-gray-200 border-2 border-gray-400 rounded-lg flex-1 h-9"
                        >
                            {locations.map((loc, index) => (
                                <option key={index} value={loc}>
                                    {loc}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="mb-1 mr-4 sm:w-20 w-24 font-bold">
                            강습인원 *
                        </label>
                        <div className="flex items-center flex-1 bg-gray-200 rounded-lg border-2 border-gray-400 h-9">
                            <button
                                onClick={handleParticipantDecrement}
                                className={`h-9 w-1/3 text-2xl font-extrabold ${
                                    participant === 0
                                        ? "cursor-not-allowed opacity-50"
                                        : ""
                                }`}
                                disabled={participant === 0}
                            >
                                -
                            </button>
                            <div className="h-9 w-1/3 flex justify-center items-center flex-1">
                                {participant === 10 ? "10+" : participant}
                            </div>
                            <button
                                onClick={handleParticipantIncrement}
                                className={`h-9 w-1/3 text-2xl font-extrabold ${
                                    participant === 10
                                        ? "cursor-not-allowed opacity-50"
                                        : ""
                                }`}
                                disabled={participant === 10}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="mb-1 mr-4 sm:w-20 w-24 font-bold">
                            일정 선택 *
                        </label>
                        <div className="flex items-center flex-1 bg-gray-200 rounded-lg border-2 border-gray-400 h-9">
                            <button onClick={toggleCalendar} className="px-6">
                                <FaCalendarAlt />
                            </button>
                            {selectedDate && (
                                <div className="ml-2">
                                    {selectedDate.toLocaleDateString()}
                                </div>
                            )}
                        </div>
                        {calendarOpen && (
                            <div className="relative mt-2">
                                <Calendar
                                    onChange={(date: Date) => {
                                        setSelectedDate(date);
                                        setCalendarOpen(false);
                                    }}
                                    className="border border-gray-300 rounded shadow-lg"
                                    minDate={today}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="mb-1 mr-4 sm:w-20 w-24 font-bold">
                            시작 시간
                        </label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="flex flex-1 p-2 bg-gray-200 rounded-lg border-2 border-gray-400 h-9"
                            step="1800" // 30 minutes
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="mb-1 mr-4 sm:w-20 w-24 font-bold">
                            강습 시간
                        </label>
                        <div className="flex items-center flex-1 bg-gray-200 rounded-lg border-2 border-gray-400 h-9">
                            <button
                                onClick={handleTimeDecrement}
                                className={`h-10 w-1/3 text-2xl font-extrabold ${
                                    entireTime === 0
                                        ? "cursor-not-allowed opacity-50"
                                        : ""
                                }`}
                                disabled={entireTime === 0}
                            >
                                -
                            </button>
                            <div className="h-10 w-1/3 flex justify-center items-center flex-1">
                                {entireTime === 10 ? "10+" : entireTime}
                            </div>
                            <button
                                onClick={handleTimeIncrement}
                                className={`h-10 w-1/3 text-2xl font-extrabold ${
                                    entireTime === 10
                                        ? "cursor-not-allowed opacity-50"
                                        : ""
                                }`}
                                disabled={entireTime === 10}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="mb-1 mr-4 sm:w-20  font-bold">
                            레벨 선택 *
                        </label>
                        <div className="flex flex-1">
                            <button
                                className={`h-14 ${
                                    level === 1
                                        ? "bg-gray-700 text-white"
                                        : "bg-gray-100"
                                } w-1/3 flex flex-col items-center justify-center rounded-l-lg border-x-2 border-y-2 border-gray-400`}
                                onClick={() => setLevel(1)}
                            >
                                <div className="sm:text-lg text-md">초급</div>
                                <div className="sm:text-xs text-[10px]">
                                    Level 1 이상 강사진
                                </div>
                            </button>
                            <button
                                className={`h-14 ${
                                    level === 2
                                        ? "bg-gray-700 text-white"
                                        : "bg-gray-100"
                                } w-1/3 flex flex-col items-center justify-center border-y-2 border-gray-400`}
                                onClick={() => setLevel(2)}
                            >
                                <div className="sm:text-lg text-md">중급</div>
                                <div className="sm:text-xs text-[10px]">
                                    Level 2 이상 강사진
                                </div>
                            </button>
                            <button
                                className={`h-14 ${
                                    level === 3
                                        ? "bg-gray-700 text-white"
                                        : "bg-gray-100"
                                } w-1/3 flex flex-col items-center justify-center rounded-r-lg border-x-2 border-y-2 border-gray-400`}
                                onClick={() => setLevel(3)}
                            >
                                <div className="sm:text-lg text-md">고급</div>
                                <div className="sm:text-xs text-[10px]">
                                    Level 3 이상 프리미엄 강사진
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <div
                            onClick={goToResult}
                            className="w-full sm:w-20 h-12 bg-primary-500 text-white flex justify-center items-center cursor-pointer rounded-lg"
                        >
                            강습 조회
                        </div>
                    </div>
                </div>

                <div className="w-full sm:w-2/6 h-4/5 bg-primary-50 rounded-lg shadow-md flex justify-center items-center mt-8 sm:mt-0">
                    hi
                </div>
            </div>
        </div>
    );
};

export default SetFilter;
