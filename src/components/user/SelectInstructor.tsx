import React, { useState } from "react";

interface CertificateInfo {
    certificateId: number;
    certificateName: string;
    certificateType: string;
    certificateImageUrl: string;
}

interface Instructor {
    instructorId: number;
    userName: string;
    teamId: number;
    teamName: string;
    position: string;
    description: string;
    instructorUrl: string;
    gender: string;
    certificateInfo: CertificateInfo[];
    rating: number;
    reviewCount: number;
    cost: number;
    basicFee: number;
    peopleOptionFee: number;
    designatedFee: number;
    levelOptionFee: number;
    lessonType: string;
    reviews: any[];
}

const dummyInstructors = [
    {
        instructorId: 1,
        userName: "고승민",
        teamId: 1,
        teamName: "팀A",
        position: "교육팀장",
        description: "소개소개소개",
        instructorUrl: "https://via.placeholder.com/150",
        gender: "남성",
        certificateInfo: [
            {
                certificateId: 1,
                certificateName: "Level 1",
                certificateType: "Ski",
                certificateImageUrl: "https://via.placeholder.com/50",
            },
        ],
        rating: 4.5,
        reviewCount: 10,
        cost: 100000,
        basicFee: 100000,
        peopleOptionFee: 10000,
        designatedFee: 50000,
        levelOptionFee: 20000,
        lessonType: "Ski",
        reviews: [],
    },
    {
        instructorId: 2,
        userName: "임종률",
        teamId: 2,
        teamName: "팀B",
        position: "교육팀장",
        description: "소개소개소개",
        instructorUrl: "https://via.placeholder.com/150",
        gender: "남성",
        certificateInfo: [
            {
                certificateId: 2,
                certificateName: "Level 1",
                certificateType: "Board",
                certificateImageUrl: "https://via.placeholder.com/50",
            },
        ],
        rating: 4.7,
        reviewCount: 12,
        cost: 100000,
        basicFee: 100000,
        peopleOptionFee: 10000,
        designatedFee: 50000,
        levelOptionFee: 20000,
        lessonType: "Board",
        reviews: [],
    },
];

const SelectInstructor: React.FC = () => {
    const [selectedInstructor, setSelectedInstructor] =
        useState<Instructor | null>(null);
    const [instructors] = useState<Instructor[]>(dummyInstructors);

    return (
        <div className="w-full sm:h-96 bg-primary-50 rounded-lg shadow-md flex sm:flex-row flex-col items-center sm:justify-center sm:space-x-5 space-y-3 py-5">
            <div className="flex flex-col bg-white sm:h-full sm:w-5/12 rounded-lg p-4">
                <div className="flex flex-col justify-center items-center">
                    <div className="font-extrabold text-xl">강사 목록</div>
                    <div className="font-thin text-xs text-gray-500 pt-2">
                        지정 강사 선택 시 추가 요금이 부과됩니다.
                    </div>
                </div>
                <div className="space-y-2 pt-2">
                    {instructors.map((instructor) => (
                        <div
                            key={instructor.instructorId}
                            className="cursor-pointer p-2 border-b border-gray-200 flex items-center bg-primary-100 rounded-md"
                            onClick={() => setSelectedInstructor(instructor)}
                        >
                            <img
                                src={instructor.instructorUrl}
                                alt={instructor.userName}
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <div className="flex flex-col space-y-0.5">
                                <div className="flex flex-row space-x-3">
                                    <div className="text-xs font-extrabold">
                                        직책
                                    </div>
                                    <div className="text-xs bg-primary-400 text-white px-0.5 rounded-sm">
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
                                <div className="text-xs text-gray-500 px-0.5 rounded-sm">
                                    {instructor.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className=" w-10/12 bg-white sm:h-full sm:w-5/12 rounded-lg p-4">
                {selectedInstructor ? (
                    <>
                        <div className="font-extrabold text-xl text-center">
                            강사 프로필
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <img
                                src={selectedInstructor.instructorUrl}
                                alt={selectedInstructor.userName}
                                className="w-24 h-24 rounded-full"
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5 pt-5 pb-3">
                            <div className="flex flex-row space-x-6">
                                <div className="text-xs font-extrabold">
                                    직책
                                </div>
                                <div className="text-xs bg-primary-400 text-white px-0.5 rounded-sm">
                                    {selectedInstructor.position}
                                </div>
                            </div>
                            <div className="flex flex-row space-x-6">
                                <div className="text-xs font-extrabold">
                                    이름
                                </div>
                                <div className="text-xs text-black px-0.5 rounded-sm">
                                    {selectedInstructor.userName}
                                </div>
                            </div>
                            <div className="flex flex-row space-x-6">
                                <div className="text-xs font-extrabold">
                                    성별
                                </div>
                                <div className="text-xs text-black px-0.5 rounded-sm">
                                    {selectedInstructor.gender}
                                </div>
                            </div>
                            <div className="flex flex-row space-x-4">
                                <div className="text-xs font-extrabold">
                                    자격명
                                </div>
                                <div className="text-xs text-black px-0.5 rounded-sm">
                                    {selectedInstructor.certificateInfo.map(
                                        (cert) => (
                                            <div key={cert.certificateId}>
                                                {cert.certificateName} (
                                                {cert.certificateType})
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-row space-x-2">
                                <div className="text-xs font-extrabold">
                                    자기소개
                                </div>
                                <div className="text-xs text-black px-0.5 rounded-sm">
                                    {selectedInstructor.description}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="bg-primary-500 text-white font-extrabold text-lg w-12 text-center items-center justify-center rounded-lg">
                                선택
                            </div>
                        </div>
                    </>
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
