import React from "react";

const LessonReserveInfo : React.FC = () => {


    return(
        <div className="flex flex-col items-center">
                <div className="text-left text-2xl font-bold w-[1000px] my-3">
                    강습 예약 정보
                </div>
                <div className="flex justify-center bg-primary-100 w-[1000px] rounded p-6">
                    <div className=" bg-white w-[800px] rounded p-6">
                        <div className="flex justify-start my-5">
                            <div className="ml-10 mr-20 text-lg font-bold w-[100px]">
                                장소
                            </div>
                            <div className="ml-20">
                                곤지암 리조트
                            </div>
                        </div>
                        <div className="flex justify-start my-5">
                            <div className="ml-10 mr-20 text-lg font-bold w-[100px]">
                                팀 정보
                            </div>
                            <div className="ml-20">
                                고승민의 스키교실
                            </div>
                        </div>
                        <div className="flex justify-start my-5">
                            <div className="ml-10 mr-20 text-lg font-bold w-[100px]">
                                일시
                            </div>
                            <div className="ml-20">
                                2024.11.30(토) 15:00 ~ 17:00
                            </div>
                        </div>
                        <div className="flex justify-start my-5">
                            <div className="ml-10 mr-20 text-lg font-bold w-[100px]">
                                강습
                            </div>
                            <div className="ml-20">
                                1:2 스키
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default LessonReserveInfo