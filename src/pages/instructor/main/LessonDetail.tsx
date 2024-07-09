import React from "react";
import NavbarInstructor from "../../../components/common/NavbarInstructor";
import { useNavigate } from "react-router-dom";

const mockData = {
    status: "success",
    message: null,
    data: [
        {
            userId: 1,
            isFinished: false,
            messageAvailable: true,
            lessonId: 101,
            teamId: 10,
            teamName: "고사장 팀",
            resortName: "지산 리조트",
            lessonDate: "2024-11-15",
            startTime: "09:00",
            duration: 3,
            lessonStatus: "진행 예정",
            representativeName: "장승호",
            isDesignated: 0,
            studentCount: 5,
            studentInfo: [
                {
                    studentInfoId: 1,
                    name: "장승호",
                    height: "170-175cm",
                    weight: "70-75kg",
                    footSize: 270,
                    age: "20대",
                    gender: "남성",
                },
                {
                    studentInfoId: 2,
                    name: "김승호",
                    height: "160-165cm",
                    weight: "60-65kg",
                    footSize: 260,
                    age: "30대",
                    gender: "남성",
                },
                {
                    studentInfoId: 3,
                    name: "최승호",
                    height: "165-170cm",
                    weight: "65-70kg",
                    footSize: 265,
                    age: "40대",
                    gender: "남성",
                },
                {
                    studentInfoId: 4,
                    name: "박승호",
                    height: "150-155cm",
                    weight: "50-55kg",
                    footSize: 255,
                    age: "50대",
                    gender: "남성",
                },
                {
                    studentInfoId: 5,
                    name: "강승호",
                    height: "180-185cm",
                    weight: "80-85kg",
                    footSize: 275,
                    age: "60대",
                    gender: "남성",
                },
            ],
        },
    ],
};

const LessonDetail = () => {
    const navigate = useNavigate();
    const goToBack = () => {
        navigate(`/instructor/main`);
    };

    const lesson = mockData.data[0];
    const {
        teamName,
        resortName,
        lessonDate,
        startTime,
        duration,
        representativeName,
        studentCount,
        studentInfo,
    } = lesson;

    return (
        <div className="min-h-screen">
            <NavbarInstructor />
            <div className="max-w-4xl mx-auto p-4">
                <div className="flex flex-col bg-primary-50 rounded-lg shadow-md py-6 px-6 sm:px-12">
                    <div className="flex sm:text-lg font-extrabold">
                        강습 정보 상세
                    </div>
                    <div className="flex items-center justify-center space-x-8 bg-white mt-6 rounded-lg px-8">
                        <img
                            src="/assets/images/team-logo.png"
                            alt="Team Logo"
                            className="w-20 h-20 rounded-full mr-4"
                        />
                        <div className="flex flex-col justify-center items-center py-5">
                            <h2 className="sm:text-xl text-lg font-bold">
                                {resortName}
                            </h2>
                            <h3 className="sm:text-lg text-base">{teamName}</h3>
                            <p className="text-gray-500 sm:text-sm text-[8px]">{`${lessonDate} (${new Date(
                                lessonDate
                            ).toLocaleString("ko-KR", {
                                weekday: "short",
                            })}) - ${startTime} ~ ${new Date(
                                new Date(
                                    `${lessonDate}T${startTime}`
                                ).getTime() +
                                    duration * 60 * 60 * 1000
                            ).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}`}</p>
                            <p className="font-bold sm:text-lg text-sm">
                                예약자: {representativeName} 외{" "}
                                {studentCount - 1}명
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 space-y-4 bg-white p-3 rounded-lg">
                        {studentInfo.map((student, index) => (
                            <details
                                key={student.studentInfoId}
                                className="p-4 bg-gray-100 rounded-lg"
                            >
                                <summary className="cursor-pointer font-bold">
                                    {index + 1}. {student.name}
                                </summary>
                                <div className="mt-2 text-sm">
                                    <p>나이: {student.age}</p>
                                    <p>키: {student.height}</p>
                                    <p>몸무게: {student.weight}</p>
                                    <p>발 사이즈: {student.footSize}mm</p>
                                </div>
                            </details>
                        ))}
                    </div>
                    <div className="mt-6 text-right">
                        <button
                            onClick={goToBack}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        >
                            돌아가기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonDetail;
