import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarInstructor from "../../../components/common/NavbarInstructor";
import { LessonService } from "../../../api/LessonService";
import { InstructorLessonInfoDTO } from "../../../dto/InstructorLessonInfoDTO";

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

    const getStatusColor = (status: string) => {
        switch (status) {
            case "notStart":
                return "bg-yellow-100";
            case "onGoing":
                return "bg-green-100";
            case "lessonFinished":
                return "bg-blue-100";
            case "cancelLesson":
                return "bg-red-100";
            default:
                return "bg-transparent";
        }
    };

    const getStatusName = (status: string) => {
        switch (status) {
            case "notStart":
                return "강습 예정";
            case "onGoing":
                return "진행 중";
            case "lessonFinished":
                return "강습 완료";
            case "cancelLesson":
                return "취소된 강습";
            default:
                return "";
        }
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
        <div className="min-h-screen pb-12">
            <NavbarInstructor />
            <div className="flex flex-col w-full min-h-screen pl-12 items-start">
                <div className="pt-12 pb-12 font-extrabold text-black text-2xl">
                    강습 정보 상세
                </div>
                <div className="flex flex-col bg-primary-50 w-4/5 h-full rounded-lg shadow-md items-center py-12 space-y-10">
                    <div className="flex sm:flex-row flex-col bg-white w-4/5 sm:h-1/2 h-4/6 rounded-lg items-center justify-center py-10">
                        <img
                            src={lesson.profileUrl}
                            alt="Profile"
                            className="w-32 h-32 rounded-full"
                        />
                        <div className="flex flex-col ml-8 items-start space-y-2">
                            <div
                                className={`font-extrabold w-20 text-center rounded-md ${getStatusColor(
                                    lesson.lessonStatus
                                )}`}
                            >
                                {getStatusName(lesson.lessonStatus)}
                            </div>
                            <div className="font-bold text-xl">
                                {lesson.resortName}
                            </div>

                            <p className="text-gray-500 sm:text-sm text-xs">
                                {`${lesson.lessonDate} (${new Date(
                                    lesson.lessonDate
                                ).toLocaleString("ko-KR", {
                                    weekday: "short",
                                })}) `}
                                {`${formatTime(lesson.startTime)} ~ ${new Date(
                                    new Date(
                                        `${lesson.lessonDate}T${formatTime(
                                            lesson.startTime
                                        )}`
                                    ).getTime() +
                                        lesson.duration * 60 * 60 * 1000
                                ).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}`}
                            </p>

                            <div className="flex flex-row space-x-3">
                                <div className="flex flex-row">
                                    <div className="text-primary-600">
                                        {lesson.teamName}
                                    </div>
                                    <div>팀</div>
                                </div>
                            </div>
                        </div>
                        {studentInfoResponseDTOs &&
                            studentInfoResponseDTOs.length > 0 && (
                                <div className="mt-6 space-y-4 bg-white p-3 rounded-lg w-4/5">
                                    {studentInfoResponseDTOs.map(
                                        (student, index) => (
                                            <details
                                                key={student.studentInfoId}
                                                className="p-4 bg-gray-100 rounded-lg"
                                            >
                                                <summary className="cursor-pointer font-bold">
                                                    {index + 1}. {student.name}
                                                </summary>
                                                <div className="mt-2 text-sm">
                                                    <div>
                                                        나이:{" "}
                                                        {formatAge(student.age)}
                                                    </div>
                                                    <div>
                                                        키:{" "}
                                                        {formatHeight(
                                                            student.height
                                                        )}
                                                    </div>
                                                    <div>
                                                        몸무게:{" "}
                                                        {formatWeight(
                                                            student.weight
                                                        )}
                                                    </div>
                                                    <div>
                                                        발 사이즈:{" "}
                                                        {student.footSize}mm
                                                    </div>
                                                </div>
                                            </details>
                                        )
                                    )}
                                </div>
                            )}
                    </div>
                    <div className="mt-6 text-right w-full flex justify-center pr-6">
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
