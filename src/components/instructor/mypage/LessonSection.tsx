import React from "react";
import LessonCard from "./LessonCard";
import { InstructorLessonInfoDTO } from "../../../dto/InstructorLessonInfoDTO";

interface LessonSectionProps {
    title: string;
    lessons: InstructorLessonInfoDTO[];
}

const LessonSection: React.FC<LessonSectionProps> = ({ title, lessons }) => (
    <div className="mb-6">
        <div className="text-xl font-bold mb-4">{title} ({lessons.length})</div>
        <div className="grid grid-cols-2 gap-4">
            {lessons.map((lesson, index) => (
                <LessonCard key={index} lesson={lesson} />
            ))}
        </div>
    </div>
);

export default LessonSection;
