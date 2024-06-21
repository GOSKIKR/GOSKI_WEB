import React from "react";
import NavbarInstructor from "../../../components/common/NavbarInstructor";
import LessonSection from "../../../components/instructor/mypage/LessonSection";
import { dummyInstructorLessonData } from "../../../dto/InstructorLessonInfoDTO";

const MyLessonList: React.FC = () => {
    return (
        <div>
            <NavbarInstructor />
            <div className="flex justify-center mt-20">
                <div className="text-2xl font-bold mb-10">강습내역</div>
            </div>
            <div className="flex justify-center">
                <div className="bg-primary-100 w-[1000px] rounded p-6">
                    <LessonSection
                        title="진행 예정"
                        lessons={dummyInstructorLessonData.filter(lesson => lesson.lessonStatus === "notStart")}
                    />
                    <LessonSection
                        title="피드백 미작성"
                        lessons={dummyInstructorLessonData.filter(lesson => lesson.lessonStatus === "lessonFinished")}
                    />
                    <LessonSection
                        title="피드백 작성"
                        lessons={dummyInstructorLessonData.filter(lesson => lesson.lessonStatus === "yesFeedback")}
                    />
                </div>
            </div>
        </div>
    );
};

export default MyLessonList;
