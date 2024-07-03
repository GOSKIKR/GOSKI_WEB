import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarUser from "../../../components/common/NavbarUser";

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
};

const PayDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { lesson } = location.state || {};

    const goToCancle = () => {
        navigate(`/user/payment/cancle`, { state: { lesson } });
    };

    return (
        <div>
            <NavbarUser />
            <div className="flex flex-col w-full h-screen pl-12 items-start">
                <div className="pt-12 pb-12 font-extrabold text-black text-2xl">
                    결제 상세
                </div>
                <div className="flex flex-col bg-primary-50 w-4/5 h-4/6 rounded-lg shadow-md items-center py-12 space-y-10">
                    <div className="flex sm:flex-row flex-col bg-white w-4/5 sm:h-2/6 h-4/6 rounded-lg items-center justify-center">
                        <img
                            src={lesson.profileUrl}
                            alt="Profile"
                            className="w-24 h-24 rounded-full"
                        />
                        <div className="flex flex-col ml-4 justify-center items-center space-y-0.5">
                            <div className="font-bold text-xl">
                                {lesson.resortName}
                            </div>
                            <div>{lesson.teamName}</div>
                            <div className="text-gray-500 text-sm">
                                {formatDate(lesson.lessonDate)}{" "}
                                {lesson.startTime}
                            </div>
                            <div>{lesson.instructorName}</div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white w-4/5 h-3/6 rounded-lg p-6 space-y-4 sm:text-md text-sm">
                        <div className="flex justify-between">
                            <div>간단한 강습 정보</div>
                            <div>결제 금액</div>
                        </div>
                        <div className="flex justify-between">
                            <div>인원 추가 요금</div>
                            <div>결제 금액</div>
                        </div>
                        <div className="flex justify-between">
                            <div>난이도 추가 요금</div>
                            <div>결제 금액</div>
                        </div>
                        <div className="flex justify-between">
                            <div>강사 지정 요금</div>
                            <div>결제 금액</div>
                        </div>
                        <div className="border-t border-gray-300 pt-2 flex justify-between">
                            <div className="font-bold">최종결제 금액</div>
                            <div className="font-bold text-primary-500">
                                총 결제 금액
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={goToCancle}
                        className="flex items-center justify-center bg-slate-400 sm:w-1/6 h-12 p-1 px-2 rounded-lg text-white cursor-pointer"
                    >
                        예약 취소
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayDetail;
