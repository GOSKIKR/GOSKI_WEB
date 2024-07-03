import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarUser from "../../../components/common/NavbarUser";
import BeforePay from "../../../components/user/BeforePay";
import NavbarUserMobile from "../../../components/common/NavbarUserMobile";

const TeamInfo: React.FC = () => {
    const [startTime, setStartTime] = useState<string>("");
    const [entireTime, setEntireTime] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleTimeIncrement = () => {
        if (entireTime < 10) {
            setEntireTime((prev) => prev + 1);
        }
    };

    const handleTimeDecrement = () => {
        if (entireTime > 0) {
            setEntireTime((prev) => prev - 1);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="w-full">
                {innerWidth > 640 ? <NavbarUser /> : <NavbarUserMobile />}
            </div>
            <div className="flex flex-col justify-center items-center px-4 py-8 space-y-3">
                <img
                    src="/assets/images/AppLogo.png"
                    alt="App Logo"
                    className="w-16 h-auto"
                />
                <div className="text-xl font-extrabold">GOSKI 강습 예약</div>
            </div>
            <div className="flex flex-col sm:flex-row px-12 sm:space-x-6 space-y-6">
                <div className="w-full sm:w-7/12 h-96 bg-primary-50 rounded-lg shadow-md">
                    <div className="px-6 py-6 text-lg font-bold">팀 소개</div>
                </div>
                <div className="flex flex-col sm:w-4/12 justify-center">
                    <div className="w-full">
                        <div className="flex items-center mb-4">
                            <label className="mb-1 mr-4 sm:w-20 w-24 font-bold">
                                시작 시간
                            </label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="flex flex-1 p-2 bg-gray-200 rounded-lg border-2 border-gray-400 h-9"
                                step="1800" // 30 minutes
                            />
                        </div>
                        <div className="flex items-center mb-4">
                            <label className="mb-1 mr-4 sm:w-20 w-24 font-bold">
                                강습 시간
                            </label>
                            <div className="flex items-center flex-1 bg-gray-200 rounded-lg border-2 border-gray-400 h-9">
                                <button
                                    onClick={handleTimeDecrement}
                                    className={`h-10 w-1/3 text-2xl font-extrabold ${
                                        entireTime === 0
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                    }`}
                                    disabled={entireTime === 0}
                                >
                                    -
                                </button>
                                <div className="h-10 w-1/3 flex justify-center items-center flex-1">
                                    {entireTime === 10 ? "10+" : entireTime}
                                </div>
                                <button
                                    onClick={handleTimeIncrement}
                                    className={`h-10 w-1/3 text-2xl font-extrabold ${
                                        entireTime === 10
                                            ? "cursor-not-allowed opacity-50"
                                            : ""
                                    }`}
                                    disabled={entireTime === 10}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col px-8 py-6 space-y-3 w-full h-60 bg-primary-50 rounded-lg shadow-md items-center justify-center mb-8">
                        <div className="font-extrabold pb-2 w-full">
                            최종 결제금액
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <div>기존 강습비</div>
                            <div>10000원</div>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <div>레벨 옵션비</div>
                            <div>10000원</div>
                        </div>
                        <div className="w-full my-[1%] border-[1px] border-black"></div>
                        <div className="w-full flex flex-row justify-between pb-3">
                            <div className="font-extrabold">총 결제금액</div>
                            <div className="text-blue-500 font-extrabold">
                                20000원
                            </div>
                        </div>

                        <div
                            onClick={openModal}
                            className="h-20 w-1/2 bg-white rounded-lg shadow-md text-black text-center flex items-center justify-center cursor-pointer"
                        >
                            예약하기
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg relative sm:w-10/12 h-5/6 overflow-y-auto ">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                            &times;
                        </button>
                        <BeforePay onClose={closeModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamInfo;
