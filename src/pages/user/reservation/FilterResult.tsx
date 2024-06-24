import React, { useState } from "react";
import NavbarUser from "../../../components/common/NavbarUser";
import { FaPersonSnowboarding } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaSkiing } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

interface CertificateInfo {
    certificateId: number;
    certificateName: string;
    certificateType: string;
    certificateImageUrl: string;
}
interface Review {
    reviewId: number;
    rating: number;
    content: string;
    createdAt: string; // Assuming LocalDateTime is represented as a string
    instructorTags: {
        tagReviewId: number;
        tagName: string;
    }[];
}
interface Instructor {
    instructorId: number;
    userName: string;
    teamId: number;
    teamName: string;
    position: number;
    description: string;
    instructorUrl: string;
    gender: string;
    certificateInfo: CertificateInfo[];
    rating: number;
    reviewCount: number;
    cost: number;
    basicFee: number;
    peopleOptionFee: number;
    designatedFee: number;
    levelOptionFee: number;
    lessonType: string;
    reviews: Review[];
}

interface Team {
    teamId: number;
    teamName: string;
    description: string;
    teamProfileUrl: string;
    rating: number;
    instructors: number[];
    teamImages: {
        teamImageId: number;
        imageUrl: string;
    }[];
    cost: number;
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
        createdAt: string; // Assuming LocalDateTime is represented as a string
        instructorTags: {
            tagReviewId: number;
            tagName: string;
        }[];
    }[];
}

const dummyTeamData: Team[] = [
    {
        teamId: 1,
        teamName: "Team A",
        description: "This is Team A, specializing in skiing lessons.",
        teamProfileUrl: "https://example.com/teamA-profile.jpg",
        rating: 3,
        instructors: [1, 2],
        teamImages: [
            {
                teamImageId: 1,
                imageUrl: "https://example.com/teamA-image1.jpg",
            },
            {
                teamImageId: 2,
                imageUrl: "https://example.com/teamA-image2.jpg",
            },
        ],
        cost: 50,
        basicFee: 30,
        peopleOptionFee: 10,
        designatedFee: 5,
        levelOptionFee: 5,
        lessonType: "Ski",
        reviewCount: 15,
        reviews: [
            {
                reviewId: 1,
                rating: 4,
                content: "Great team with experienced instructors.",
                createdAt: "2024-06-15T14:30:00", // Example date/time in ISO format
                instructorTags: [
                    {
                        tagReviewId: 101,
                        tagName: "Experienced",
                    },
                    {
                        tagReviewId: 102,
                        tagName: "Friendly",
                    },
                ],
            },
            {
                reviewId: 2,
                rating: 5,
                content: "Fantastic lessons, highly recommend!",
                createdAt: "2024-06-16T10:00:00",
                instructorTags: [
                    {
                        tagReviewId: 103,
                        tagName: "Patient",
                    },
                    {
                        tagReviewId: 104,
                        tagName: "Knowledgeable",
                    },
                ],
            },
        ],
    },
    {
        teamId: 2,
        teamName: "Team B",
        description: "Team B provides snowboarding lessons for all levels.",
        teamProfileUrl: "https://example.com/teamB-profile.jpg",
        rating: 4,
        instructors: [3],
        teamImages: [
            {
                teamImageId: 3,
                imageUrl: "https://example.com/teamB-image1.jpg",
            },
            {
                teamImageId: 4,
                imageUrl: "https://example.com/teamB-image2.jpg",
            },
        ],
        cost: 60,
        basicFee: 35,
        peopleOptionFee: 15,
        designatedFee: 7,
        levelOptionFee: 5,
        lessonType: "Snowboard",
        reviewCount: 12,
        reviews: [
            {
                reviewId: 3,
                rating: 4,
                content: "Good instructors and well-organized lessons.",
                createdAt: "2024-06-17T09:30:00",
                instructorTags: [
                    {
                        tagReviewId: 105,
                        tagName: "Organized",
                    },
                    {
                        tagReviewId: 106,
                        tagName: "Enthusiastic",
                    },
                ],
            },
            {
                reviewId: 4,
                rating: 3,
                content: "Decent lessons but room for improvement.",
                createdAt: "2024-06-18T15:00:00",
                instructorTags: [
                    {
                        tagReviewId: 107,
                        tagName: "Helpful",
                    },
                    {
                        tagReviewId: 108,
                        tagName: "Informative",
                    },
                ],
            },
        ],
    },
    // Add more dummy data entries as needed
];

const renderStars = (score: number) => {
    const filledStars = Math.floor(score);
    const emptyStars = Math.floor(5 - score);

    const stars = [];
    for (let i = 0; i < filledStars; i++) {
        stars.push(
            <svg
                xmlns="https://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#FFFF00"
                className="w-6 h-6"
            >
                <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clip-rule="evenodd"
                />
            </svg>
        );
    }
    for (let i = 0; i < emptyStars; i++) {
        stars.push(
            <svg
                xmlns="https://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
            </svg>
        );
    }
    return stars;
};

const FilterResult: React.FC = () => {
    const navigate = useNavigate();
    const [location, setLocation] = useState("");
    const locations = ["a스키장", "b스키장", "c스키장"];
    const [participant, setParticipant] = useState(0);
    const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
    const [startTime, setStartTime] = useState("");
    const [entireTime, setEntireTime] = useState(0);
    const [level, setLevel] = useState(1);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [type, setType] = useState("ski");

    const goToDetail = () => {
        navigate(`/reserve/info`);
    };

    const handleTypeChange = (selectedType: string) => {
        setType(selectedType);
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

    const goToResult = () => {
        navigate(`/reserve/result`);
    };

    const timeSlots = generateTimeSlots();

    const today = new Date();

    return (
        <div>
            <NavbarUser />
            <div className="flex flex-col w-full h-full items-center">
                {/* 필터 */}
                <div className="w-full flex flex-col items-center justify-center space-y-3">
                    <div className="flex flex-row pt-16 w-full justify-center space-x-5 px-3">
                        <div
                            className={`flex flex-row ${
                                type === "ski"
                                    ? "bg-primary-600"
                                    : "bg-gray-200"
                            } w-2/5 h-14 rounded-lg items-center place-content-between cursor-pointer`}
                            onClick={() => handleTypeChange("ski")}
                        >
                            <FaSkiing
                                color={type === "ski" ? "white" : "black"}
                                size="30"
                                className="w-1/6"
                            />
                            <div
                                className={`text-base font-bold text-center w-2/3 ${
                                    type === "ski"
                                        ? "text-white"
                                        : "text-gray-700"
                                }`}
                            >
                                스키
                            </div>
                        </div>
                        <div
                            className={`flex flex-row ${
                                type === "board"
                                    ? "bg-primary-600"
                                    : "bg-gray-200"
                            } w-2/5 h-14 rounded-lg items-center place-content-between cursor-pointer`}
                            onClick={() => handleTypeChange("board")}
                        >
                            <div
                                className={`text-base font-bold text-center w-2/3 ${
                                    type === "board"
                                        ? "text-white"
                                        : "text-gray-700"
                                }`}
                            >
                                보드
                            </div>
                            <FaPersonSnowboarding
                                color={type === "board" ? "white" : "black"}
                                size="35"
                                className="w-1/6 -scale-x-100"
                            />
                        </div>
                    </div>
                    {/* 하단 필터 */}
                    <div className="flex flex-row bg-primary-50 rounded-lg shadow-md w-4/5 px-5 justify-between">
                        {/* 장소 */}
                        <div className="flex flex-col justify-center items-center space-y-3">
                            <div>장소 *</div>
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="mt-1 p-2 block border border-gray-300 rounded"
                            >
                                {locations.map((loc, index) => (
                                    <option key={index} value={loc}>
                                        {loc}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* 강습 인원 */}
                        <div className="flex flex-col justify-center items-center">
                            <div>강습인원 *</div>
                            <div className="flex flex-row items-center space-x-3">
                                <button
                                    onClick={handleParticipantDecrement}
                                    className={`w-1/3 h-full text-2xl font-extrabold ${
                                        participant === 0
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                    }`}
                                    disabled={participant === 0}
                                >
                                    -
                                </button>
                                <div className="w-1/3 h-full flex justify-center items-center">
                                    {participant === 10 ? "10+" : participant}
                                </div>
                                <button
                                    onClick={handleParticipantIncrement}
                                    className={`w-1/3 h-full text-2xl font-extrabold ${
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
                        {/* 일정 선택 */}
                        <div className="flex flex-col justify-center items-center">
                            <div>일정 선택 *</div>
                            <div className="flex items-center">
                                <button
                                    onClick={toggleCalendar}
                                    className="p-2 border border-gray-300 rounded"
                                >
                                    <FaCalendarAlt />
                                </button>
                                {dateRange && (
                                    <div className="ml-2">
                                        {dateRange[0].toLocaleDateString()} -{" "}
                                        {dateRange[1].toLocaleDateString()}
                                    </div>
                                )}
                            </div>
                            {calendarOpen && (
                                <div className="absolute mt-2">
                                    <Calendar
                                        selectRange
                                        onChange={(range: [Date, Date]) => {
                                            setDateRange(range);
                                            setCalendarOpen(false);
                                        }}
                                        className="border border-gray-300 rounded shadow-lg"
                                        minDate={today}
                                    />
                                </div>
                            )}
                        </div>
                        {/* 강습시간 선택 */}
                        <div className="flex flex-col justify-center items-center">
                            <div>시작 시간</div>
                            <input
                                type="time"
                                value={entireTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="mt-1 p-2 block border border-gray-300 rounded"
                                step="1800" // 30 minutes
                            />
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div>강습 시간</div>
                            <div className="flex flex-row items-center space-x-3">
                                <button
                                    onClick={handleTimeDecrement}
                                    className={`w-1/3 h-full text-2xl font-extrabold ${
                                        entireTime === 0
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                    }`}
                                    disabled={entireTime === 0}
                                >
                                    -
                                </button>
                                <div className="w-1/3 h-full flex justify-center items-center">
                                    {entireTime === 10 ? "10+" : entireTime}
                                </div>
                                <button
                                    onClick={handleTimeIncrement}
                                    className={`w-1/3 h-full text-2xl font-extrabold ${
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
                        {/* 레벨 선택 */}
                        <div className="flex flex-col mb-4 justify-center items-center">
                            <div className="w-16">레벨 선택 *</div>
                            <div className="w-20 h-10">
                                <button
                                    className={`w-1/3 h-full ${
                                        level === 1
                                            ? "bg-primary-600 text-white"
                                            : "bg-gray-100"
                                    } rounded-l-lg border-x-2 border-y-2 border-gray-400`}
                                    onClick={() => setLevel(1)}
                                >
                                    레벨 1
                                </button>
                                <button
                                    className={`w-1/3 h-full ${
                                        level === 2
                                            ? "bg-primary-600 text-white"
                                            : "bg-gray-100"
                                    } border-x-2 border-y-2 border-gray-400`}
                                    onClick={() => setLevel(2)}
                                >
                                    레벨 2
                                </button>
                                <button
                                    className={`w-1/3 h-full ${
                                        level === 3
                                            ? "bg-primary-600 text-white"
                                            : "bg-gray-100"
                                    } rounded-r-lg border-x-2 border-y-2 border-gray-400`}
                                    onClick={() => setLevel(3)}
                                >
                                    레벨 3
                                </button>
                            </div>
                        </div>
                        {/* 검색 */}
                        <div
                            onClick={goToResult}
                            className="flex flex-col mb-4 justify-center items-center"
                        >
                            <IoIosSearch size="20" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-8 pt-12 w-full items-center">
                    {dummyTeamData.map((team, index) => (
                        <div
                            onClick={goToDetail}
                            key={index}
                            className="flex flex-row w-4/5 h-28 rounded-lg shadow-md bg-primary-50 cursor-pointer items-center"
                        >
                            <img
                                src={team.teamProfileUrl}
                                className="h-24 w-24"
                            />
                            <div className="flex flex-col pl-10 justify-center">
                                <div className="text-lg">{team.teamName}</div>
                                <div>{team.description}</div>
                                <div className="flex flex-row">
                                    <div className="flex flex-row">
                                        {renderStars(team.rating)}
                                    </div>
                                    <div>{team.rating}</div>
                                    <div>({team.reviewCount})</div>
                                </div>
                            </div>
                            <div className="flex flex-col pl-20 justify-center">
                                <div>
                                    {team.basicFee}
                                    원~
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterResult;
