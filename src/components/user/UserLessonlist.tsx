import React, { useState, useEffect } from "react";
import LessonlistCard from "./LessonlistCard";
import NavbarUser from "../common/NavbarUser";
import UserMypageMenu from "./UserMypageMenu";
import apiClient from "../../utils/config/axiosConfig";

interface Lesson {
    lessonId: number;
    teamId: number;
    teamName: string;
    resortName: string;
    instructorId: number;
    instructorName: string;
    profileUrl: string;
    lessonDate: string; // Use string for simplicity
    lessonStatus: string;
    startTime: string;
    duration: number;
    hasReview: boolean;
    studentCount: number;
}

interface PaymentHistory {
    cost: number;
    paybackRate: number;
}

const lessons: Lesson[] = [
    {
        lessonId: 1,
        teamId: 1,
        teamName: "Team A",
        resortName: "Resort 1",
        instructorId: 1,
        instructorName: "Instructor 1",
        profileUrl: "profile1.jpg",
        lessonDate: "2024-06-21",
        lessonStatus: "진행 예정",
        startTime: "10:00",
        duration: 1,
        hasReview: false,
        studentCount: 3,
    },
    {
        lessonId: 2,
        teamId: 2,
        teamName: "Team B",
        resortName: "Resort 2",
        instructorId: 2,
        instructorName: "Instructor 2",
        profileUrl: "profile2.jpg",
        lessonDate: "2024-06-22",
        lessonStatus: "진행 예정",
        startTime: "11:00",
        duration: 2,
        hasReview: false,
        studentCount: 4,
    },
    {
        lessonId: 3,
        teamId: 3,
        teamName: "Team C",
        resortName: "Resort 3",
        instructorId: 3,
        instructorName: "Instructor 3",
        profileUrl: "profile3.jpg",
        lessonDate: "2024-06-23",
        lessonStatus: "진행 중",
        startTime: "12:00",
        duration: 2,
        hasReview: true,
        studentCount: 2,
    },
    {
        lessonId: 4,
        teamId: 4,
        teamName: "Team D",
        resortName: "Resort 4",
        instructorId: 4,
        instructorName: "Instructor 4",
        profileUrl: "profile4.jpg",
        lessonDate: "2024-06-24",
        lessonStatus: "강습 완료",
        startTime: "01:00",
        duration: 2,
        hasReview: false,
        studentCount: 5,
    },
    {
        lessonId: 5,
        teamId: 5,
        teamName: "Team E",
        resortName: "Resort 5",
        instructorId: 5,
        instructorName: "Instructor 5",
        profileUrl: "profile5.jpg",
        lessonDate: "2024-06-25",
        lessonStatus: "진행 예정",
        startTime: "02:00",
        duration: 3,
        hasReview: false,
        studentCount: 6,
    },
];

const dummyPaymentHistory: { [key: number]: PaymentHistory } = {
    1: { cost: 100000, paybackRate: 10 },
    2: { cost: 150000, paybackRate: 15 },
    3: { cost: 200000, paybackRate: 20 },
    4: { cost: 250000, paybackRate: 25 },
    5: { cost: 300000, paybackRate: 30 },
};

const UserLessonlist = () => {
    const [selectedStatus, setSelectedStatus] = useState<string>("진행 예정");
    const [paymentHistory, setPaymentHistory] = useState<{
        [key: number]: PaymentHistory;
    }>(dummyPaymentHistory);

    const handleStatusClick = (status: string) => {
        setSelectedStatus(status);
    };

    // const fetchPaymentHistory = async (lessonId: number) => {
    //     try {
    //         const response = await apiClient.get(
    //             `/api/v1/payment/lesson/${lessonId}`
    //         );
    //         const data = response.data.data;
    //         setPaymentHistory((prevDetails) => ({
    //             ...prevDetails,
    //             [lessonId]: data,
    //         }));
    //     } catch (error) {
    //         console.error(
    //             `Failed to fetch details for lesson ${lessonId}:`,
    //             error
    //         );
    //     }
    // };

    // useEffect(() => {
    //     lessons.forEach((lesson) => {
    //         fetchPaymentHistory(lesson.lessonId);
    //     });
    // }, []);

    const filteredLessons =
        selectedStatus === "전체"
            ? lessons
            : lessons.filter(
                  (lesson) => lesson.lessonStatus === selectedStatus
              );

    return (
        <div className="flex flex-col space-y-10 w-full mb-4">
            <div className="w-full sm:h-16 h-12 sm:text-md text-sm bg-primary-50 rounded-3xl shadow-md flex flex-row items-center text-center divide-x divide-black">
                {["전체", "진행 예정", "진행 중", "강습 완료"].map((status) => (
                    <div
                        key={status}
                        className={`w-1/3 cursor-pointer ${
                            selectedStatus === status
                                ? "font-extrabold text-md"
                                : ""
                        }`}
                        onClick={() => handleStatusClick(status)}
                    >
                        {status}
                    </div>
                ))}
            </div>
            {filteredLessons.map((lesson) => (
                <LessonlistCard
                    key={lesson.lessonId}
                    lesson={lesson}
                    paymentDetail={paymentHistory[lesson.lessonId]}
                />
            ))}
        </div>
    );
};

export default UserLessonlist;
