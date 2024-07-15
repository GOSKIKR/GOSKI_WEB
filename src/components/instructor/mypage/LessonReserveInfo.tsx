import React from "react";
import { InstructorLessonInfoDTO } from "../../../dto/InstructorLessonInfoDTO";
import { formatTime } from "../../../utils/formatTime";

interface LessonInfoProp {
    lesson : InstructorLessonInfoDTO
}


const LessonReserveInfo : React.FC<LessonInfoProp> = ({lesson}) => {
    return(
        <div className="flex flex-col items-center">
                <div className="sm:text-left sm:text-2xl sm:w-[1000px] sm:my-3 text-center text-xl w-[400px] my-2 font-bold">
                    강습 예약 정보
                </div>
                <div className="flex justify-center bg-primary-100 sm:w-[1000px] w-[350px] rounded p-6">
                    <div className=" bg-white sm:w-[800px] w-[300px] rounded sm:p-6 p-2">
                        <div className="flex justify-start my-3">
                            <div className="sm:ml-10 sm:mr-20 sm:text-lg font-bold w-[100px]">
                                장소
                            </div>
                            <div className="sm:ml-20">
                                {lesson.resortName}
                            </div>
                        </div>
                        <div className="flex justify-start my-3">
                            <div className="sm:ml-10 sm:mr-20 sm:text-lg font-bold w-[100px]">
                                팀 정보
                            </div>
                            <div className="sm:ml-20">
                                {lesson.teamName}
                            </div>
                        </div>
                        <div className="flex justify-start my-3">
                            <div className="sm:ml-10 sm:mr-20 sm:text-lg font-bold w-[100px]">
                                일시
                            </div>
                            <div className="sm:ml-20">
                                {lesson.lessonDate} {formatTime(Number(lesson.startTime), lesson.duration)}
                            </div>
                        </div>
                        <div className="flex justify-start my-3">
                            <div className="sm:ml-10 sm:mr-20 sm:text-lg font-bold w-[100px]">
                                강습
                            </div>
                            <div className="sm:ml-20">
                                1:{lesson.studentCount + 1} 강습
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default LessonReserveInfo