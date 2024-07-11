import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarUser from "../../../components/common/NavbarUser";

const formatTime = (time: string) => {
    return time.slice(0, 2) + ":" + time.slice(2);
};

const PayDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { lesson, paymentDetail } = location.state || {};

    const goToCancle = () => {
        navigate(`/user/payment/cancel`, { state: { lesson, paymentDetail } });
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
                            <p className="text-gray-500 sm:text-sm text-xs px-1.5">{`${
                                lesson.lessonDate
                            } (${new Date(lesson.lessonDate).toLocaleString(
                                "ko-KR",
                                {
                                    weekday: "short",
                                }
                            )}) `}</p>
                            <div className="text-gray-500 sm:text-sm text-xs px-1.5">{`${formatTime(
                                lesson.startTime
                            )} ~ ${new Date(
                                new Date(
                                    `${lesson.lessonDate}T${formatTime(
                                        lesson.startTime
                                    )}`
                                ).getTime() +
                                    lesson.duration * 60 * 60 * 1000
                            ).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}`}</div>
                            <div>{lesson.instructorName}</div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white w-4/5 h-3/6 rounded-lg p-6 space-y-4 sm:text-md text-sm">
                        {paymentDetail && (
                            <>
                                <div className="flex justify-between">
                                    <div className="font-extrabold">
                                        {lesson.teamName}의 강습
                                    </div>
                                    <div>{paymentDetail.basicFee}원</div>
                                </div>
                                {paymentDetail.peopleOptionFee > 0 && (
                                    <div className="flex justify-between">
                                        <div>인원 추가 요금</div>
                                        <div>
                                            {paymentDetail.peopleOptionFee}원
                                        </div>
                                    </div>
                                )}
                                {paymentDetail.levelOptionFee > 0 && (
                                    <div className="flex justify-between">
                                        <div>난이도 추가 요금</div>
                                        <div>
                                            {paymentDetail.levelOptionFee}원
                                        </div>
                                    </div>
                                )}
                                {paymentDetail.designatedFee > 0 && (
                                    <div className="flex justify-between">
                                        <div>강사 지정 요금</div>
                                        <div>
                                            {paymentDetail.designatedFee}원
                                        </div>
                                    </div>
                                )}
                                <div className="border-t border-gray-300 pt-2 flex justify-between">
                                    <div className="font-bold">
                                        최종결제 금액
                                    </div>
                                    <div className="font-bold text-primary-500">
                                        {paymentDetail.totalAmount}원
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    {lesson.lessonStatus == "notStart" && (
                        <div
                            onClick={goToCancle}
                            className="flex items-center justify-center bg-slate-400 sm:w-1/6 h-12 p-1 px-2 rounded-lg text-white cursor-pointer"
                        >
                            예약 취소
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PayDetail;
