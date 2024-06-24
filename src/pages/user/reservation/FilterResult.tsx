import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarUser from "../../../components/common/NavbarUser";
import { FaPersonSnowboarding } from "react-icons/fa6";
import { FaSkiing } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

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
        description:
            "팀 소개가 들어가는 부분1\n팀 소개가 들어가는 부분2\n팀 소개가 들어가는 부분3",
        teamProfileUrl: "https://example.com/teamA-profile.jpg",
        rating: 3.5,
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
        cost: 100000,
        basicFee: 30000,
        peopleOptionFee: 10000,
        designatedFee: 5000,
        levelOptionFee: 5000,
        lessonType: "Ski",
        reviewCount: 30,
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
        description:
            "팀 소개가 들어가는 부분1\n팀 소개가 들어가는 부분2\n팀 소개가 들어가는 부분3",
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
        cost: 100000,
        basicFee: 35000,
        peopleOptionFee: 15000,
        designatedFee: 7000,
        levelOptionFee: 5000,
        lessonType: "Snowboard",
        reviewCount: 30,
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

const dummyInstructorData: Instructor[] = [
    {
        instructorId: 1,
        userName: "Instructor A",
        teamId: 1,
        teamName: "Team A",
        position: 1,
        description: "강사 레벨",
        instructorUrl: "https://example.com/instructorA-profile.jpg",
        gender: "Male",
        certificateInfo: [
            {
                certificateId: 1,
                certificateName: "Ski Instructor Level 1",
                certificateType: "Ski",
                certificateImageUrl: "https://example.com/certificate1.jpg",
            },
        ],
        rating: 3.5,
        reviewCount: 30,
        cost: 100000,
        basicFee: 30000,
        peopleOptionFee: 10000,
        designatedFee: 5000,
        levelOptionFee: 5000,
        lessonType: "Ski",
        reviews: [
            {
                reviewId: 1,
                rating: 4,
                content: "Great instructor with a lot of patience.",
                createdAt: "2024-06-15T14:30:00",
                instructorTags: [
                    {
                        tagReviewId: 101,
                        tagName: "Patient",
                    },
                    {
                        tagReviewId: 102,
                        tagName: "Friendly",
                    },
                ],
            },
        ],
    },
    {
        instructorId: 2,
        userName: "Instructor B",
        teamId: 1,
        teamName: "Team A",
        position: 2,
        description: "Experienced snowboard instructor",
        instructorUrl: "https://example.com/instructorB-profile.jpg",
        gender: "Female",
        certificateInfo: [
            {
                certificateId: 2,
                certificateName: "Snowboard Instructor Level 2",
                certificateType: "Snowboard",
                certificateImageUrl: "https://example.com/certificate2.jpg",
            },
        ],
        rating: 3.5,
        reviewCount: 30,
        cost: 100000,
        basicFee: 35000,
        peopleOptionFee: 15000,
        designatedFee: 7000,
        levelOptionFee: 5000,
        lessonType: "Snowboard",
        reviews: [
            {
                reviewId: 2,
                rating: 5,
                content: "Fantastic instructor!",
                createdAt: "2024-06-16T10:00:00",
                instructorTags: [
                    {
                        tagReviewId: 103,
                        tagName: "Experienced",
                    },
                    {
                        tagReviewId: 104,
                        tagName: "Knowledgeable",
                    },
                ],
            },
        ],
    },
    // Add more dummy instructor entries as needed
];


const FilterResult: React.FC = () => {
    const navigate = useNavigate();
    const filterState = useLocation().state as {
        type: string;
        location: string;
        participant: number;
        dateRange: [Date, Date] | null;
        startTime: string;
        entireTime: number;
        level: number;
    };
    const [type, setType] = useState("스키");
    const [location, setLocation] = useState(filterState.location);
    const [participant, setParticipant] = useState(filterState.participant);
    const [dateRange, setDateRange] = useState<[Date, Date] | null>(
        filterState.dateRange
    );
    const [startTime, setStartTime] = useState(filterState.startTime);
    const [entireTime, setEntireTime] = useState(filterState.entireTime);
    const [level, setLevel] = useState(filterState.level);
    const [calendarOpen, setCalendarOpen] = useState(false);

    const [filteredData, setFilteredData] = useState(
        level === 1 ? dummyTeamData : dummyInstructorData
    );

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

    const applyFilter = () => {
        const newFilteredData =
            level === 1 ? dummyTeamData : dummyInstructorData;
        setFilteredData(newFilteredData);
    };

    const goToTeamDetail = () => {
        navigate("/reserve/info/team");
    };

    const goToInstructorDetail = () => {
        navigate("/reserve/info/instructor");
    };

    return (
        <div>
            <NavbarUser />
            <div className="flex flex-col w-full h-full items-center">
                {/* 필터 */}
                <div className="w-full flex flex-col items-center justify-center space-y-3">
                    <div className="flex flex-row pt-16 w-full justify-center space-x-5 px-3">
                        <div
                            className={`flex flex-row ${
                                type==='스키' ? "bg-primary-600" : "bg-gray-200"
                            } w-2/5 h-14 rounded-lg items-center place-content-between cursor-pointer`}
                            onClick={() => setType('스키')}
                        >
                            <FaSkiing
                                color={type==='스키' ? "white" : "black"}
                                size="30"
                                className="w-1/6"
                            />
                            <div
                                className={`text-base font-bold text-center w-2/3 ${
                                    type==='스키' ? "text-white" : "text-gray-700"
                                }`}
                            >
                                스키
                            </div>
                        </div>
                        <div
                            className={`flex flex-row ${
                                type==='보드'
                                    ? "bg-primary-600"
                                    : "bg-gray-200"
                            } w-2/5 h-14 rounded-lg items-center place-content-between cursor-pointer`}
                            onClick={() => setType('보드')}
                        >
                            <div
                                className={`text-base font-bold text-center w-2/3 ${
                                    type==='보드'
                                        ? "text-white"
                                        : "text-gray-700"
                                }`}
                            >
                                보드
                            </div>
                            <FaPersonSnowboarding
                                color={
                                    type==='보드'
                                        ? "white"
                                        : "black"
                                }
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
                                {["a스키장", "b스키장", "c스키장"].map(
                                    (loc, index) => (
                                        <option key={index} value={loc}>
                                            {loc}
                                        </option>
                                    )
                                )}
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
                                value={startTime}
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
                            onClick={applyFilter}
                            className="flex flex-col mb-4 justify-center items-center cursor-pointer"
                        >
                            <IoIosSearch size="20" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-8 pt-12 w-full items-center">
                    {filteredData.map((data, index) =>
                        level === 1 ? (
                            <div
                                onClick={goToTeamDetail}
                                key={index}
                                className="flex flex-row w-4/5 h-28 rounded-lg shadow-md bg-primary-50 cursor-pointer items-center p-4"
                            >
                                <div className="h-24 w-24 bg-gray-300 rounded-md flex justify-center items-center">
                                    팀/개인 사진
                                </div>
                                <div className="flex flex-col pl-10 justify-center w-3/5">
                                    <div className="text-lg font-bold">
                                        {data.teamName}
                                    </div>
                                    <div className="text-sm text-gray-600 whitespace-pre-line">
                                        {data.description}
                                    </div>
                                    <div className="flex flex-row items-center mt-2">
                                        <FaStar color="#FEFD48"/>
                                        <div className="ml-2 text-sm text-gray-600">
                                            {data.rating}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            ({data.reviewCount})
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center w-1/5 items-end">
                                    <div className="text-lg font-bold">
                                        {data.cost}원~
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div
                                onClick={goToInstructorDetail}
                                key={index}
                                className="flex flex-col w-60 h-80 rounded-lg shadow-md bg-primary-50 cursor-pointer items-center p-4"
                            >
                                <img
                                    src={data.instructorUrl}
                                    className="h-24 w-24 rounded-full"
                                />
                                <div className="flex flex-col justify-center items-center mt-4">
                                    <div className="text-lg">
                                        {data.userName}
                                    </div>
                                    <div>{data.description}</div>
                                    
                                    <div className="mt-2">{data.cost}원~</div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilterResult;

