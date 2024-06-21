import React from "react";
import NavbarInstructor from "../../../components/common/NavbarInstructor";

import { StudentInfo, InstructorLessonInfoDTO, dummyInstructorLessonData } from "../../../dto/InstructorLessonInfoDTO";

const MyLessonList : React.FC = () => {


    return (
        <div>
            <NavbarInstructor/>
            <div className="flex justify-start text-2xl font-bold mt-20 mb-10 ml-[450px]">
                강습내역
            </div>
            <div className="flex justify-center">
                <div className="bg-primary-100 w-[1000px] rounded">
                    
                </div>
            </div>

        </div>
    )
}

export default MyLessonList;