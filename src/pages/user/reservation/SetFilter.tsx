import React, { useEffect, useState } from "react";
import NavbarUser from "../../../components/common/NavbarUser";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../../../public/assets/css/calendar.css";
import NavbarUserMobile from "../../../components/common/NavbarUserMobile";
import { ResortService } from "../../../api/ResortService";
import { ResortDTO } from "../../../dto/ResortDTO";
import { LessonReserveService } from "../../../api/LessonReserveService";
import { ReserveDTO } from "../../../dto/ReserveDTO";

const SetFilter: React.FC = () => {
    const navigate = useNavigate();
    const [type, setType] = useState("SKI");
    const types = ["SKI", "BOARD"];
    const [location, setLocation] = useState("");
    const [locations, setLocations] = useState<ResortDTO[]>([]);
    const [participant, setParticipant] = useState(0);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [startTime, setStartTime] = useState("");
    const [formattedStartTime, setFormattedStartTime] = useState("");
    const [level, setLevel] = useState(1);
    const [lessonTime, setLessonTime] = useState(0);
    const [lessonTimes, setLessonTimes] = useState<number[]>([]);

    // 페이지 처음 들어올 때 스키장 목록 가져오기
    useEffect(() => {
        const fetchResorts = async () => {
            const resortService = new ResortService();
            const resorts = await resortService.getResortInformation();
            if (resorts) {
                setLocations(resorts);
                setLessonTimes(resorts[0] ? resorts[0].lessonTime : []);
            }
        };
        fetchResorts();
    }, []);

    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedResort = locations.find(
            (resort) => resort.resortName === e.target.value
        );
        setLocation(e.target.value);
        setLessonTimes(selectedResort ? selectedResort.lessonTime : []);
    };

    const goToResult = async () => {
        if (!type) {
            alert("종류를 선택해주세요.");
            return;
        }
        if (!location) {
            alert("장소를 선택해주세요.");
            return;
        }
        if (participant === 0) {
            alert("강습인원을 선택해주세요.");
            return;
        }
        if (!selectedDate) {
            alert("일정을 선택해주세요.");
            return;
        }
        if (!startTime) {
            alert("시작 시간을 입력해주세요.");
            return;
        }
        if (lessonTime === 0) {
            alert("강습 시간을 선택해주세요.");
            return;
        }
        if (level === 0) {
            alert("레벨을 선택해주세요.");
            return;
        }
        const selectedResort = locations.find(
            (resort) => resort.resortName === location
        );
        if (!selectedResort) {
            alert("유효한 장소를 선택해주세요.");
            return;
        }

        const ReserveDTO: ReserveDTO = {
            resortId: selectedResort.resortId,
            studentCount: participant,
            lessonType: type,
            lessonDate: selectedDate.toISOString().split("T")[0], // YYYY-MM-DD 형식
            startTime: formattedStartTime,
            duration: lessonTime,
        };

        const reserveService = new LessonReserveService();

        try {
            console.log(ReserveDTO);
            const response = await reserveService.reserveLesson(ReserveDTO);
            console.log("Reservation successful:", response);
            navigate("/reserve/result", {
                state: {
                    type,
                    location,
                    participant,
                    selectedDate,
                    startTime: formattedStartTime,
                    lessonTime,
                    level,
                },
            });
        } catch (error) {
            alert("강습 예약에 실패했습니다.");
        }
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

    const generateTimeSlots = () => {
        const slots = [];
        for (let i = 8; i < 22; i++) {
            const hour = i.toString().padStart(2, "0");
            slots.push(`${hour}:00`);
            slots.push(`${hour}:30`);
        }
        slots.push("22:00");
        return slots;
    };

    const timeSlots = generateTimeSlots();

    const today = new Date();

    const formatTime = (time: string) => {
        return time.replace(":", "");
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = e.target.value;
        setStartTime(time);
        setFormattedStartTime(formatTime(time));
    };

    return (
        <div className="min-h-screen flex flex-col">
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
            <div className="flex flex-col sm:flex-row sm:space-x-10 w-full justify-center items-center sm:items-stretch">
                <div className="p-6 w-[380px] sm:w-1/2 bg-primary-50 rounded-lg shadow-md space-y-6 mb-8">
                    <div className="flex items-center mb-4">
                        <label className="mb-1 mr-4 sm:w-28 text-center w-24 font-bold">
                            종류
                        </label>
                        <div className="flex flex-1 rounded-lg shadow-md">
                            <button
                                className={`flex-1 h-9 rounded-l-lg ${
                                    type === "SKI"
                                        ? "bg-primary-500 text-white"
                                        : "bg-gray-100"
                                }`}
                                onClick={() => setType("SKI")}
                            >
                                스키
                            </button>
                            <button
                                className={`flex-1 h-9 rounded-r-lg ${
                                    type === "BOARD"
                                        ? "bg-primary-500 text-white"
                                        : "bg-gray-100"
                                }`}
                                onClick={() => setType("BOARD")}
                            >
                                보드
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="mb-1 mr-4 sm:w-28 text-center w-24 font-bold">
                            장소
                        </label>
                        <select
                            value={location}
                            onChange={handleLocationChange}
                            className="px-6 bg-white rounded-lg shadow-md flex-1 h-9"
                        >
                            <option value="">장소를 선택하세요</option>
                            {locations.map((loc) => (
                                <option
                                    key={loc.resortId}
                                    value={loc.resortName}
                                >
                                    {loc.resortName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="mb-1 mr-4 sm:w-28 text-center w-24 font-bold">
                            강습인원
                        </label>
                        <div className="flex items-center flex-1 bg-white rounded-lg shadow-md h-9">
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
                                {participant}
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
                        <label className="mb-1 mr-4 sm:w-28 text-center w-24 font-bold">
                            일정 선택
                        </label>
                        <div className="flex flex-col items-center flex-1 space-y-3">
                            <div>
                                <Calendar
                                    onChange={(value) => {
                                        setSelectedDate(value as Date);
                                    }}
                                    className="shadow-lg sm:w-[250px] w-[220px] sm:text-sm text-xs"
                                    minDate={today}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="mb-1 mr-4 sm:w-28 text-center w-24 font-bold">
                            시작 시간
                        </label>
                        <div className="flex flex-1">
                            <input
                                type="time"
                                value={startTime}
                                onChange={handleTimeChange}
                                className="w-full p-2 bg-white shadow-md rounded-lg h-9 text-center"
                                step="1800" // 30 minutes
                            />
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="mb-1 mr-4 sm:w-28 text-center w-24 font-bold">
                            강습 시간
                        </label>
                        <select
                            onChange={(e) =>
                                setLessonTime(parseInt(e.target.value))
                            }
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
                    <div className="flex items-center mb-4">
                        <label className="mb-1 mr-4 sm:w-28 text-center w-24 font-bold">
                            레벨 선택
                        </label>
                        <div className="flex flex-1 shadow-md rounded-lg">
                            <button
                                className={`h-14 ${
                                    level === 1
                                        ? "bg-primary-500 text-white"
                                        : "bg-gray-100"
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
                                    level === 2
                                        ? "bg-primary-500 text-white"
                                        : "bg-gray-100"
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
                                    level === 3
                                        ? "bg-primary-500 text-white"
                                        : "bg-gray-100"
                                } w-1/3 flex flex-col items-center justify-center rounded-r-lg px-1`}
                                onClick={() => setLevel(3)}
                            >
                                <div className="sm:text-md text-sm">고급</div>
                                <div className="sm:text-[10px] text-[8px]">
                                    Level 3 이상 프리미엄 강사진
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <div
                            onClick={goToResult}
                            className="mt-3 w-32 h-8 sm:w-20 sm:h-12 bg-primary-500 text-white flex justify-center items-center cursor-pointer rounded-lg shadow-md"
                        >
                            강습 조회
                        </div>
                    </div>
                </div>

                <div className="w-[380px] sm:w-2/6 h-4/5 bg-primary-50 rounded-lg shadow-md flex justify-center items-center mt-8 sm:mt-0">
                    레벨 선택 설명 들어갈 공간
                </div>
            </div>
        </div>
    );
};

export default SetFilter;
