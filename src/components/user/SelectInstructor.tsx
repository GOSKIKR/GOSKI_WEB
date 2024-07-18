import React, { useState } from "react";
import { Instructor } from "../../dto/UserInstructorDTO";

interface SelectInstructorProps {
    instructors: Instructor[];
    onSelect: (instructor: Instructor) => void;
}

const SelectInstructor: React.FC<SelectInstructorProps> = ({
    instructors,
    onSelect,
}) => {
    const [selectedInstructor, setSelectedInstructor] =
        useState<Instructor | null>(null);
    const [expandedDescription, setExpandedDescription] = useState<
        number | null
    >(null);

    const toggleDescription = (id: number) => {
        setExpandedDescription(expandedDescription === id ? null : id);
    };

    const handleInstructorClick = (instructor: Instructor) => {
        setSelectedInstructor(instructor);
        onSelect(instructor);
    };

    return (
        <div className="w-full sm:h-[500px] bg-primary-50 rounded-lg shadow-md flex sm:flex-row flex-col items-center sm:justify-center sm:space-x-5 sm:space-y-0 space-y-3 py-5">
            <div className="flex flex-col bg-white sm:h-full sm:w-5/12 rounded-lg p-4">
                <div className="flex flex-col justify-center items-center">
                    <div className="font-extrabold text-xl">강사 목록</div>
                    <div className="font-thin text-xs text-gray-500 pt-0.5">
                        지정 강사 선택 시 추가 요금이 부과됩니다.
                    </div>
                </div>
                <div className="space-y-2 mt-4 overflow-auto flex flex-col items-center">
                    {instructors.map((instructor) => (
                        <div
                            key={instructor.instructorId}
                            className="cursor-pointer p-3 flex flex-row space-x-3 w-11/12 shadow-md justify-between items-center bg-primary-100 rounded-md"
                            onClick={() => handleInstructorClick(instructor)}
                        >
                            <div className="w-1/4 flex justify-center">
                                <img
                                    src={instructor.instructorUrl}
                                    alt={instructor.userName}
                                    className="w-12 h-12 rounded-full"
                                />
                            </div>
                            <div className="flex flex-col space-y-1 w-3/4">
                                <div className="flex flex-row space-x-3">
                                    <div className="text-xs font-extrabold">
                                        직책
                                    </div>
                                    <div className="text-xs bg-primary-400 w-5 text-center text-white px-0.5 rounded-md">
                                        {instructor.position}
                                    </div>
                                </div>
                                <div className="flex flex-row space-x-2">
                                    <div className="text-xs font-extrabold">
                                        이름
                                    </div>
                                    <div className="text-xs text-black px-0.5 rounded-sm">
                                        {instructor.userName}
                                    </div>
                                </div>
                                <div className="text-[10px] text-gray-500 px-0.5 rounded-sm">
                                    {expandedDescription ===
                                    instructor.instructorId ? (
                                        <>
                                            {instructor.description}{" "}
                                            <span
                                                className="text-primary-500 cursor-pointer"
                                                onClick={() =>
                                                    toggleDescription(
                                                        instructor.instructorId
                                                    )
                                                }
                                            >
                                                (접기)
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            {instructor.description.length > 50
                                                ? instructor.description.substring(
                                                      0,
                                                      50
                                                  ) + "..."
                                                : instructor.description}{" "}
                                            {instructor.description.length >
                                                50 && (
                                                <span
                                                    className="text-primary-500 cursor-pointer"
                                                    onClick={() =>
                                                        toggleDescription(
                                                            instructor.instructorId
                                                        )
                                                    }
                                                >
                                                    (더보기)
                                                </span>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-10/12 bg-white sm:h-full sm:w-5/12 rounded-lg p-4">
                {selectedInstructor ? (
                    <div className="flex flex-col relative h-full">
                        <div className="font-extrabold text-xl text-center">
                            강사 프로필
                        </div>
                        <div className="flex items-center justify-center w-full mt-4">
                            <img
                                src={selectedInstructor.instructorUrl}
                                alt={selectedInstructor.userName}
                                className="w-24 h-24 rounded-full"
                            />
                        </div>
                        <div className="flex flex-col space-y-3 pt-5 pb-3">
                            <div className="flex flex-row items-center space-x-2">
                                <div className="text-xs font-extrabold w-20">
                                    직책
                                </div>
                                <div className="text-xs text-white px-2 flex-1">
                                    <div className="bg-primary-400 w-5 text-center rounded-md">
                                        {selectedInstructor.position}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row items-center space-x-2">
                                <div className="text-xs font-extrabold w-20">
                                    이름
                                </div>
                                <div className="text-xs text-black px-2 rounded-sm flex-1">
                                    {selectedInstructor.userName}
                                </div>
                            </div>
                            <div className="flex flex-row items-center space-x-2">
                                <div className="text-xs font-extrabold w-20">
                                    성별
                                </div>
                                <div className="text-xs text-black px-2 rounded-sm flex-1">
                                    {selectedInstructor.gender}
                                </div>
                            </div>
                            <div className="flex flex-row items-center space-x-2">
                                <div className="text-xs font-extrabold w-20">
                                    자격명
                                </div>
                                <div className="text-xs text-black px-2 rounded-sm flex-1">
                                    {selectedInstructor.certificateInfo &&
                                    selectedInstructor.certificateInfo.length >
                                        0 ? (
                                        selectedInstructor.certificateInfo.map(
                                            (cert) => (
                                                <div key={cert.certificateId}>
                                                    {cert.certificateName} (
                                                    {cert.certificateType})
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <div>자격 정보 없음</div>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-row items-center space-x-2">
                                <div className="text-xs font-extrabold w-20">
                                    자기소개
                                </div>
                                <div className="text-xs text-black px-2 rounded-sm flex-1">
                                    {selectedInstructor.description}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center absolute bottom-0.5 items-center w-full">
                            <div
                                onClick={() =>
                                    handleInstructorClick(selectedInstructor)
                                }
                                className="bg-primary-500 text-white font-extrabold text-lg w-20 py-1 text-center items-center justify-center rounded-lg cursor-pointer"
                            >
                                선택
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-full text-gray-500">
                        강사를 선택해 주세요
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectInstructor;
