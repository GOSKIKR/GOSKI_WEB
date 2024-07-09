import React,{useState, useEffect} from "react";
import NavbarInstructor from "../../../components/common/NavbarInstructor";
import LessonSection from "../../../components/instructor/mypage/LessonSection";
import { InstructorLessonInfoDTO } from "../../../dto/InstructorLessonInfoDTO";
import NavbarInstructorMobile from "../../../components/common/NavbarInstructorMobile";
import { LessonService } from "../../../api/LessonService";

const lessonService = new LessonService();

const MyLessonList: React.FC = () => {
    const[innerWidth,setInnerWidth] = useState(window.innerWidth);
    const[lessons, setLessons] = useState<InstructorLessonInfoDTO[]>([]);

    const handleResize = () => {
        setInnerWidth(window.innerWidth);
    }

    const fetchLessons = async () => {
        const data = await lessonService.getInstructorLessonList();
        if(data) setLessons(data);
    }

    useEffect(() => {
        fetchLessons();

        window.addEventListener("resize",handleResize);
        return(() => window.removeEventListener("resize",handleResize))
    },[])

    return (
        <div>
            {innerWidth > 640 ? <NavbarInstructor/>  : <NavbarInstructorMobile/>}
            <div className="flex justify-center mt-20 text-3xl font-bold mb-10">
                강습 내역
            </div>
            <div className="flex justify-center">
                <div className="bg-primary-50 w-[350px] sm:w-[1000px] rounded p-8">
                    <LessonSection
                        title="진행 예정"
                        lessons={lessons.filter(lesson => lesson.lessonStatus === "notStart")}
                    />
                    <LessonSection
                        title="피드백 미작성"
                        lessons={lessons.filter(lesson => lesson.lessonStatus === "lessonFinished")}
                    />
                    <LessonSection
                        title="피드백 작성"
                        lessons={lessons.filter(lesson => lesson.lessonStatus === "yesFeedback")}
                    />
                </div>
            </div>
        </div>
    );
};

export default MyLessonList;
