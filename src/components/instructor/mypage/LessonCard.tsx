import React from "react";
import { InstructorLessonInfoDTO } from "../../../dto/InstructorLessonInfoDTO";

interface LessonCardProps {
    lesson: InstructorLessonInfoDTO;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => (
    <div className="bg-white rounded shadow p-4">
        <div className="text-gray-600 text-sm mb-1">{lesson.lessonDate} {lesson.startTime} ~ {lesson.startTime}</div>
        <div className="font-bold text-lg">{lesson.resortName}</div>
        <div className="text-gray-800 text-md">{lesson.teamName}</div>
        <div className="text-gray-500 text-sm">{lesson.representativeName} 외 {lesson.studentCount}명</div>
        {lesson.lessonStatus === "lessonFinished" && (
            <div className="flex justify-end">
                <button className="mt-2 bg-primary-500 text-white py-1 px-2 rounded">피드백 작성하기</button>
            </div>
        )}
        {lesson.lessonStatus === "yesFeedback" && (
            <div className="flex justify-end">
                <button className="mt-2 mr-2 bg-primary-500 text-white py-1 px-2 rounded">피드백 수정하기</button>
                <button className="mt-2 bg-primary-700 text-white py-1 px-2 rounded">리뷰 확인하기</button>
            </div>
        )}
    </div>
);

export default LessonCard;
