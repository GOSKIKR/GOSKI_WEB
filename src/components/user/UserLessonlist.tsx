import React, { useState } from "react";
import LessonlistCard from "./LessonlistCard";
import NavbarUser from "../common/NavbarUser";
import UserMypageMenu from "./UserMypageMenu";

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

const lessons: Lesson[] = [
    {
        lessonId: 1,
        teamId: 1,
        teamName: "Team A",
        resortName: "Resort 1",
        instructorId: 1,
        instructorName: "Instructor 1",
        profileUrl: "profile1.jpg",
        lessonDate: "2024-06-21T10:00:00",
        lessonStatus: "진행 예정",
        startTime: "10:00 AM",
        duration: 60,
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
        lessonDate: "2024-06-22T11:00:00",
        lessonStatus: "진행 예정",
        startTime: "11:00 AM",
        duration: 90,
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
        lessonDate: "2024-06-23T12:00:00",
        lessonStatus: "진행 중",
        startTime: "12:00 PM",
        duration: 120,
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
        lessonDate: "2024-06-24T01:00:00",
        lessonStatus: "강습 완료",
        startTime: "01:00 PM",
        duration: 60,
        hasReview: true,
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
        lessonDate: "2024-06-25T02:00:00",
        lessonStatus: "진행 예정",
        startTime: "02:00 PM",
        duration: 75,
        hasReview: false,
        studentCount: 6,
    },
];

const UserLessonlist = () => {
    const [selectedStatus, setSelectedStatus] = useState<string>("진행 예정");

    const handleStatusClick = (status: string) => {
        setSelectedStatus(status);
    };

    const filteredLessons = lessons.filter(
        (lesson) => lesson.lessonStatus === selectedStatus
    );

    return (
        <div className="flex flex-col space-y-10 w-full">
            <div className="w-full h-16 bg-primary-50 rounded-3xl shadow-md flex flex-row items-center text-center divide-x divide-black">
                {["진행 예정", "진행 중", "강습 완료"].map((status) => (
                    <div
                        key={status}
                        className={`w-1/3 cursor-pointer ${
                            selectedStatus === status ? "font-extrabold" : ""
                        }`}
                        onClick={() => handleStatusClick(status)}
                    >
                        {status}
                    </div>
                ))}
            </div>
            {filteredLessons.map((lesson) => (
                <LessonlistCard key={lesson.lessonId} lesson={lesson} />
            ))}
        </div>
    );
};

export default UserLessonlist;
