import React, { useState } from "react";
import SelectInstructor from "./SelectInstructor";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

interface BeforePayProps {
    onClose: () => void;
}

const BeforePay: React.FC<BeforePayProps> = ({ onClose }) => {
    const navigate = useNavigate();
    const [view, setView] = useState<boolean>(false);

    const goToPay = () => {
        navigate(`/user/payment`);
    };

    return (
        <div className="flex flex-col justify-center place-content-center space-y-5">
            <div className="sm:w-11/12 font-extrabold text-lg">
                결제 금액을 확인해주세요
            </div>
            <div className="flex flex-row sm:w-full h-11 bg-primary-50 rounded-lg shadow-md justify-between px-3 items-center">
                <div
                    onClick={() => {
                        setView(!view);
                    }}
                    className="w-full underline font-bold"
                >
                    지정 강사 선택하기 (추가 요금)
                </div>
                <div
                    onClick={() => {
                        setView(!view);
                    }}
                    className="flex w-12 justify-end "
                >
                    {view ? (
                        <div>
                            <IoIosArrowUp />
                        </div>
                    ) : (
                        <div>
                            <IoIosArrowDown />
                        </div>
                    )}
                </div>
            </div>
            {view && <SelectInstructor />}
            <div className="w-full h-32 bg-primary-50 rounded-lg shadow-md px-5 py-3 text-sm">
                <div className="font-extrabold pb-2 w-full">최종 결제금액</div>
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
                    <div className="text-blue-500 font-extrabold">20000원</div>
                </div>
                <div className="flex justify-center pt-3">
                    <div
                        onClick={goToPay}
                        className="w-16 h-6 bg-primary-500 rounded-lg text-white flex items-center justify-center cursor-pointer"
                    >
                        결제하기
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeforePay;
