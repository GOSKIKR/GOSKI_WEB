import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarInstructor from "../../../components/common/NavbarInstructor";
import { LessonService } from "../../../api/LessonService";
import {
    InstructorLessonInfoDTO,
    StudentInfo,
} from "../../../dto/InstructorLessonInfoDTO";

const LessonDetail = () => {
    const navigate = useNavigate();
    const { lessonId } = useParams<{ lessonId: string }>();
    const [lesson, setLesson] = useState<InstructorLessonInfoDTO | null>(null);

    useEffect(() => {
        const fetchLessonDetails = async () => {
            const lessonService = new LessonService();
            const lessons = await lessonService.getInstructorLessonList();
            if (lessons) {
                const selectedLesson = lessons.find(
                    (lesson) => lesson.lessonId === Number(lessonId)
                );
                setLesson(selectedLesson || null);
            }
        };

        if (lessonId) {
            fetchLessonDetails();
        }
    }, [lessonId]);

    const formatTime = (time: string) => {
        return time.slice(0, 2) + ":" + time.slice(2);
    };

    const formatHeight = (height: string) => {
        switch (height) {
            case "HEIGHT_150CM_TO_159CM":
                return "150cm ~ 159cm";
            case "HEIGHT_160CM_TO_169CM":
                return "160cm ~ 169cm";
            case "HEIGHT_170CM_TO_179CM":
                return "170cm ~ 179cm";
            case "HEIGHT_180CM_TO_189CM":
                return "180cm ~ 189cm";
            default:
                return height;
        }
    };

    const formatWeight = (weight: string) => {
        switch (weight) {
            case "WEIGHT_50KG_TO_59KG":
                return "50kg ~ 59kg";
            case "WEIGHT_60KG_TO_69KG":
                return "60kg ~ 69kg";
            case "WEIGHT_70KG_TO_79KG":
                return "70kg ~ 79kg";
            case "WEIGHT_80KG_TO_89KG":
                return "80kg ~ 89kg";
            default:
                return weight;
        }
    };

    const formatAge = (age: string) => {
        switch (age) {
            case "TEENS":
                return "10대";
            case "TWENTIES":
                return "20대";
            case "THIRTIES":
                return "30대";
            case "FORTIES":
                return "40대";
            case "FIFTIES":
                return "50대";
            case "SIXTIES":
                return "60대";
            default:
                return age;
        }
    };

    const goToBack = () => {
        navigate(`/instructor/main`);
    };

    if (!lesson) {
        return <div>Loading...</div>;
    }

    const {
        teamName,
        profileUrl,
        resortName,
        lessonDate,
        startTime,
        duration,
        representativeName,
        studentCount,
        studentInfoResponseDTOs,
    } = lesson;

    return (
        <div className="min-h-screen">
            <NavbarInstructor />
            <div className="flex flex-col w-full h-screen pl-12 items-start">
                <div className="pt-12 pb-12 font-extrabold text-black text-2xl">
                    강습 정보 상세
                </div>
                <div className="flex flex-col bg-primary-50 w-4/5 h-4/6 rounded-lg shadow-md items-center py-12 space-y-10">
                    <div className="flex sm:flex-row flex-col bg-white w-4/5 sm:h-1/2 h-2/3 rounded-lg items-center justify-center py-6">
                        <img
                            src={profileUrl}
                            alt="Team Logo"
                            className="w-24 h-24 rounded-full"
                        />
                        <div className="flex flex-col ml-4 justify-center items-center space-y-2">
                            <div className="font-bold text-xl">
                                {resortName}
                            </div>
                            <div>{teamName}</div>
                            <div className="text-gray-500 text-base text-[8px]">{`${lessonDate} (${new Date(
                                lessonDate
                            ).toLocaleString("ko-KR", {
                                weekday: "short",
                            })}) - ${formatTime(startTime)} ~ ${new Date(
                                new Date(
                                    `${lessonDate}T${formatTime(startTime)}`
                                ).getTime() +
                                    duration * 60 * 60 * 1000
                            ).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}`}</div>
                            <div className="font-bold sm:text-lg text-sm">
                                예약자:
                                {studentCount > 1 &&
                                    `${representativeName} 외 ${
                                        studentCount - 1
                                    }명`}
                                {studentCount == 1 && ` ${studentCount}명 `}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 space-y-4 bg-white p-3 rounded-lg w-4/5 sm:h-1/ h-4/6">
                        {studentInfoResponseDTOs &&
                            studentInfoResponseDTOs !== null &&
                            studentInfoResponseDTOs.map((student, index) => (
                                <details
                                    key={student.studentInfoId}
                                    className="p-4 bg-gray-100 rounded-lg"
                                >
                                    <summary className="cursor-pointer font-bold">
                                        {index + 1}. {student.name}
                                    </summary>
                                    <div className="mt-2 text-sm">
                                        <div>
                                            나이: {formatAge(student.age)}
                                        </div>
                                        <div>
                                            키: {formatHeight(student.height)}
                                        </div>
                                        <div>
                                            몸무게:{" "}
                                            {formatWeight(student.weight)}
                                        </div>
                                        <div>
                                            발 사이즈: {student.footSize}mm
                                        </div>
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
