import React, { useEffect, useState } from "react";
import NavbarUser from "../../../components/common/NavbarUser";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../../../public/assets/css/calendar.css";
import NavbarUserMobile from "../../../components/common/NavbarUserMobile";
import { ResortService } from "../../../api/ResortService";
import { ResortDTO } from "../../../dto/ResortDTO";
import { ReserveDTO } from "../../../dto/ReserveDTO";
import userReserveStore from "../../../store/userReserveStore";
import userResortsStore from "../../../store/userResortsStore";
import TimePicker from "../../../components/common/TimePicker";
import lessonInfoData from "../../../../public/assets/text/lessonInfo.json";

const SetFilter: React.FC = () => {
    const navigate = useNavigate();
    const [type, setType] = useState("SKI");
    const [location, setLocation] = useState("");
    const [locations, setLocations] = useState<any[]>([]);
    const [participant, setParticipant] = useState(0);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [startTime, setStartTime] = useState("");
    const [formattedStartTime, setFormattedStartTime] = useState("");
    const [level, setLevel] = useState<string>("");
    const [lessonTime, setLessonTime] = useState(0);
    const [lessonTimes, setLessonTimes] = useState<number[]>([]);

    const { setReservationInfo } = userReserveStore();
    const { setResortInfo } = userResortsStore();
    const [lessonInfo, setLessonInfo] = useState<any>(null);

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
        setLessonInfo(lessonInfoData);
    }, []);

    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedResort = locations.find(
            (resort) => resort.resortName === e.target.value
        );
        setLocation(e.target.value);
        setLessonTimes(selectedResort ? selectedResort.lessonTime : []);
    };

    const handleSaveReservation = () => {
        if (
            !type ||
            !location ||
            participant === 0 ||
            !selectedDate ||
            !startTime ||
            lessonTime === 0 ||
            !level
        ) {
            alert("모든 필드를 선택해주세요.");
            return;
        }

        const selectedResort = locations.find(
            (resort) => resort.resortName === location
        );
        if (!selectedResort) {
            alert("유효한 장소를 선택해주세요.");
            return;
        }

        setReservationInfo({
            resortId: selectedResort.resortId,
            resortName: location,
            lessonType: type,
            studentCount: participant,
            lessonDate: selectedDate.toISOString().split("T")[0],
            startTime: formattedStartTime,
            duration: lessonTime,
            level,
        });

        setResortInfo({
            resortId: selectedResort.resortId,
            resortName: location,
            resortLocation: selectedResort.resortLocation,
            longitude: selectedResort.longitude,
            latitude: selectedResort.latitude,
            lessonTime: selectedResort.lessonTime,
        });

        navigate("/reserve/result");
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

    const today = new Date();

    const formatTime = (time: string) => {
        return time.replace(":", "");
    };

    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 8; hour < 22; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const timeString = `${hour.toString().padStart(2, "0")}:${minute
                    .toString()
                    .padStart(2, "0")}`;
                options.push(timeString);
            }
        }
        options.push(`22:00`);
        return options;
    };

    const timeOptions = generateTimeOptions();

    const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTime = e.target.value;
        setStartTime(selectedTime);
        setFormattedStartTime(selectedTime.replace(":", ""));
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="w-full">
                {innerWidth > 640 ? <NavbarUser /> : <NavbarUserMobile />}
            </div>
            <div className="flex flex-col justify-center items-center px-4 pb-12 pt-20 space-y-3">
                <img
                    src="/assets/images/AppLogo.png"
                    alt="App Logo"
                    className="w-16 h-auto"
                />
                <div className="text-xl font-[1000]">GOSKI 강습 예약</div>
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

                        <select
                            value={startTime}
                            onChange={handleTimeChange}
                            className="px-6 bg-white shadow-md rounded-lg flex-1 h-9"
                        >
                            <option value="">시작 시간을 선택하세요</option>
                            {timeOptions.map((time) => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
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
                                    level === "BEGINNER"
                                        ? "bg-primary-500 text-white"
                                        : "bg-gray-100"
                                } w-1/3 flex flex-col items-center justify-center rounded-l-lg border-r-2`}
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
                                } w-1/3 flex flex-col items-center justify-center border-r-2`}
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
                                } w-1/3 flex flex-col items-center justify-center rounded-r-lg px-1`}
                                onClick={() => setLevel("ADVANCED")}
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
                            onClick={handleSaveReservation}
                            className="mt-3 w-32 h-8 sm:w-20 sm:h-12 bg-primary-500 text-white flex justify-center items-center cursor-pointer rounded-lg shadow-md"
                        >
                            강습 조회
                        </div>
                    </div>
                </div>

                <div className="w-[380px] sm:w-2/6 h-4/5 bg-primary-50 rounded-lg shadow-md flex justify-center items-center mt-8 sm:mt-0">
                    {lessonInfo && (
                        <div className="p-6">
                            <h2 className="text-lg font-bold w-full text-center tetx-lg">
                                강습 레벨
                            </h2>
                            <div className="flex flex-col space-y-2 pt-2">
                                <div className="flex flex-col">
                                    <p className="font-bold">초급 강습</p>
                                    <p className="text-sm pt-1 text-gray-600 ">
                                        {lessonInfo.lessonTypes.BEGINNER}
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold">중급 강습</p>
                                    <p className="text-sm pt-1 text-gray-600">
                                        {lessonInfo.lessonTypes.INTERMEDIATE}
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold">고급 강습</p>
                                    <p className="text-sm pt-1 text-gray-600">
                                        {lessonInfo.lessonTypes.ADVANCED}
                                    </p>
                                </div>
                            </div>

                            <h2 className="text-lg font-bold mt-4">준비물</h2>
                            <p className="text-sm pt-1 text-gray-600">
                                {lessonInfo.equipment}
                            </p>
                            <h2 className="text-lg font-bold mt-4">
                                유의 사항
                            </h2>
                            <p className="text-sm pt-1 text-gray-600">
                                {lessonInfo.precautions}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SetFilter;
