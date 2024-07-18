import React, { useState } from "react";
import SelectInstructor from "./SelectInstructor";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import teamInfoStore from "../../store/teamInfoStore";
import userReserveStore from "../../store/userReserveStore";
import { Instructor } from "../../dto/UserInstructorDTO";

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
            },
        });
    };

    const handleInstructorSelect = (instructor: Instructor) => {
        setSelectedInstructor(instructor);
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
                    className="flex w-12 justify-end"
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
            {view && (
                <SelectInstructor
                    instructors={instructorList}
                    onSelect={handleInstructorSelect}
                />
            )}
            <div className="w-full h-44 flex flex-col space-y-1 bg-primary-50 rounded-lg shadow-md px-6 py-3 text-sm">
                <div className="font-extrabold pb-2 w-full">최종 결제금액</div>
                <div className="w-full sm:px-40">
                    <div className="flex flex-row justify-between">
                        <div className="w-20 text-center">기본 강습비</div>
                        <div className="w-20 text-end">{basicFee}원</div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="w-20 text-center">레벨 옵션비</div>
                        <div className="w-20 text-end">
                            {levelOptionFee ? levelOptionFee : 0}원
                        </div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="w-20 text-center">지정 옵션비</div>
                        <div className="w-20 text-end">
                            {selectedInstructor
                                ? selectedInstructor.designatedFee
                                : 0}
                            원
                        </div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div className="w-20 text-center">인원 옵션비</div>
                        <div className="w-20 text-end">
                            {peopleOptionFee ? peopleOptionFee : 0}원
                        </div>
                    </div>
                    <div className="w-full my-[1px] border-[1px] border-black sm:px-40"></div>
                    <div className="flex flex-row justify-between">
                        <div className="font-extrabold w-20 text-center">
                            총 결제금액
                        </div>
                        <div className="text-blue-500 font-extrabold">
                            {basicFee +
                                (levelOptionFee ? levelOptionFee : 0) +
                                (selectedInstructor
                                    ? selectedInstructor.designatedFee
                                    : 0) +
                                (peopleOptionFee ? peopleOptionFee : 0)}
                            원
                        </div>
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
