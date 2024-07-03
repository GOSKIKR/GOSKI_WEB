import React from "react";

const LessonReserveInfo : React.FC = () => {


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
                                곤지암 리조트
                            </div>
                        </div>
                        <div className="flex justify-start my-3">
                            <div className="sm:ml-10 sm:mr-20 sm:text-lg font-bold w-[100px]">
                                팀 정보
                            </div>
                            <div className="sm:ml-20">
                                고승민의 스키교실
                            </div>
                        </div>
                        <div className="flex justify-start my-3">
                            <div className="sm:ml-10 sm:mr-20 sm:text-lg font-bold w-[100px]">
                                일시
                            </div>
                            <div className="sm:ml-20">
                                2024.11.30(토) 15:00 ~ 17:00
                            </div>
                        </div>
                        <div className="flex justify-start my-3">
                            <div className="sm:ml-10 sm:mr-20 sm:text-lg font-bold w-[100px]">
                                강습
                            </div>
                            <div className="sm:ml-20">
                                1:2 스키
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default LessonReserveInfo