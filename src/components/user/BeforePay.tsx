import React, { useState } from "react";
import SelectInstructor from "./SelectInstructor";
import { useNavigate } from "react-router-dom";
import {
    IoIosArrowDown,
    IoIosArrowUp,
    IoIosInformationCircleOutline,
} from "react-icons/io";
import teamInfoStore from "../../store/teamInfoStore";
import userReserveStore from "../../store/userReserveStore";
import { Instructor } from "../../dto/UserInstructorDTO";
import { Tooltip } from "react-tooltip";
import "../../../public/assets/css/tooltip.css";

interface BeforePayProps {
    onClose: () => void;
    instructorList: Instructor[];
}

const BeforePay: React.FC<BeforePayProps> = ({ onClose, instructorList }) => {
    const navigate = useNavigate();
    const [view, setView] = useState<boolean>(false);
    const [selectedInstructor, setSelectedInstructor] =
        useState<Instructor | null>(null);

    const { basicFee, levelOptionFee, designatedFee, peopleOptionFee } =
        teamInfoStore();

    const {
        resortName: reserveResortName,
        lessonType: reserveLessonType,
        studentCount,
        lessonDate,
        startTime,
        duration,
    } = userReserveStore();

    const goToPay = () => {
        navigate(`/user/payment`, {
            state: {
                selectedInstructor,
                designatedFee: selectedInstructor?.designatedFee,
                levelOptionFee,
                basicFee,
                peopleOptionFee,
                duration,
            },
        });
    };

    const handleInstructorSelect = (instructor: Instructor) => {
        setSelectedInstructor(instructor);
    };

    const calculateFee = (fee: number | undefined, duration: number) => {
        return fee && fee > 0
            ? {
                  text: `${fee * duration}원`,
                  calculation: `${fee}원 x ${duration} = ${fee * duration}원`,
              }
            : { text: "0원", calculation: "" };
    };

    const basicFeeResult = calculateFee(basicFee, duration);
    const levelOptionFeeResult = calculateFee(levelOptionFee, duration);
    const peopleOptionFeeResult = calculateFee(peopleOptionFee, duration);
    const designatedFeeResult = selectedInstructor?.designatedFee
        ? `${selectedInstructor.designatedFee}원`
        : "0원";

    const totalFee =
        (basicFee + peopleOptionFee + (levelOptionFee ?? 0)) * duration +
        (selectedInstructor?.designatedFee ?? 0);

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
                    className="w-full underline font-bold cursor-pointer"
                >
                    지정 강사 선택하기 (추가 요금)
                </div>
                <div
                    onClick={() => {
                        setView(!view);
                    }}
                    className="flex w-12 justify-end cursor-pointer"
                >
                    {view ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
            </div>
            {view && (
                <SelectInstructor
                    instructors={instructorList}
                    onSelect={handleInstructorSelect}
                />
            )}
            <div className="w-full h-52 flex flex-col space-y-1 bg-primary-50 rounded-lg shadow-md px-6 py-3 text-sm">
                <div className="flex flex-row items-center pb-2">
                    <div className="font-extrabold">최종 결제금액</div>
                    <div
                        className="ml-3 w-4 text-black cursor-pointer"
                        data-tooltip-id="explain-fee"
                        data-tooltip-place="top"
                        data-tip="최종 결제 금액 산출 = (기본 강습비 + 인원 옵션비 + 레벨 옵션비) x 강습 시간 + 지정 옵션비"
                    >
                        <IoIosInformationCircleOutline />
                    </div>
                    <Tooltip place="top" id="explain-fee">
                        기본 강습비, 인원 옵션비, 레벨 옵션비에 강습 시간을
                        곱하고 지정 옵션비를 더한 금액입니다.
                    </Tooltip>
                </div>

                <div className="flex flex-row justify-between items-center">
                    <div className="text-sm text-gray-500">기본 강습비</div>
                    <div className="flex flex-col items-end">
                        <div className="text-gray-400 text-xs">
                            {basicFeeResult.calculation}
                        </div>
                        <div>{basicFeeResult.text}</div>
                    </div>
                </div>
                <div className="w-full my-1 border-[0.5px] border-gray-300"></div>
                <div className="flex flex-row justify-between items-center">
                    <div className="text-sm text-gray-500">레벨 옵션비</div>
                    <div className="flex flex-col items-end">
                        <div className="text-gray-400 text-xs">
                            {levelOptionFeeResult.calculation}
                        </div>
                        <div>{levelOptionFeeResult.text}</div>
                    </div>
                </div>
                <div className="w-full my-1 border-[0.5px] border-gray-300"></div>
                <div className="flex flex-row justify-between items-center">
                    <div className="text-sm text-gray-500">인원 옵션비</div>
                    <div className="flex flex-col items-end">
                        <div className="text-gray-400 text-xs">
                            {peopleOptionFeeResult.calculation}
                        </div>
                        <div>{peopleOptionFeeResult.text}</div>
                    </div>
                </div>
                <div className="w-full my-1 border-[0.5px] border-gray-300"></div>
                <div className="flex flex-row justify-between">
                    <div className="text-sm text-gray-500">지정 옵션비</div>
                    <div>{designatedFeeResult}</div>
                </div>
                <div className="w-full my-[1%] border-[1px] border-black"></div>
                <div className="flex flex-row justify-between pb-3">
                    <div className="font-extrabold">총 결제금액</div>
                    <div className="text-blue-500 font-extrabold">
                        {totalFee}원
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div
                    onClick={goToPay}
                    className="w-24 h-12 text-lg bg-primary-500 rounded-lg text-white flex items-center justify-center cursor-pointer my-4"
                >
                    결제하기
                </div>
            </div>
        </div>
    );
};

export default BeforePay;
