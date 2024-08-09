import React from "react";

import instructorInfoStore from "../../../store/instructorInfoStore";
import { IoIosStar } from "react-icons/io";
interface CertificateInfoVO {
    certificateId: number;
    certificateName: string;
    certificateType: string;
    certificateImageUrl: string;
}

interface Review {
    reviewId: number;
    rating: number;
    content: string;
    createdAt: string;
    instructorTags: {
        tagReviewId: number;
        tagName: string;
    }[];
}
interface Instructor {
    basicFee: number;
    certificateInfoVOs: CertificateInfoVO[];
    cost: number;
    description: string;
    designatedFee: number;
    gender: string;
    instructorId: number;
    instructorUrl: string;
    lessonType: string;
    levelOptionFee: number;
    peopleOptionFee: number;
    position: string;
    rating: number;
    reviewCount: number;
    reviews: Review[];
    teamId: number;
    teamName: string;
    userName: string;
}

interface InstructorResultComponentProps {
    data: Instructor;
    goToInstructorDetail: () => void;
}

const InstructorResultComponent: React.FC<InstructorResultComponentProps> = ({
    data,
    goToInstructorDetail,
}) => {
    const { setInstructorInfo } = instructorInfoStore();

    const handleInstructorClicked = (id: number) => {
        goToInstructorDetail();

        if (data.instructorId === id) {
            setInstructorInfo({
                instructorId: data.instructorId,
                userName: data.userName,
                teamId: data.teamId,
                teamName: data.teamName,
                position: data.position,
                description: data.description,
                instructorUrl: data.instructorUrl,
                gender: data.gender,
                certificateInfo: data.certificateInfoVOs,
                rating: data.rating,
                reviewCount: data.reviewCount,
                cost: data.cost,
                basicFee: data.basicFee,
                peopleOptionFee: data.peopleOptionFee,
                designatedFee: data.designatedFee,
                levelOptionFee: data.levelOptionFee,
                lessonType: data.lessonType,
                reviews: data.reviews,
            });
        }
    };

    return (
        <div
            key={data.instructorId}
            className=" bg-primary-50 shadow-md min-w-32 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg flex flex-col items-center justify-center mx-3 py-3 h-72 w-40"
            onClick={() => handleInstructorClicked(data.instructorId)}
        >
            {/* 강사 사진 (1/3 영역) */}
            <div className="sm:h-32 sm:w-32 h-20 w-20 overflow-hidden rounded-lg">
                <img
                    src={data.instructorUrl}
                    alt="instructor"
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                />
            </div>

            {/* 정보 영역 (2/3) */}
            <div className="h-1/2 w-full px-4 pt-3 flex flex-col justify-center">
                <h3 className="text-base font-semibold mb-2">
                    {data.userName}
                </h3>
                <div>
                    <div className="text-xs text-primary-400">자격증</div>
                    <p className="text-[10px] text-gray-600 mb-4">
                        {data.certificateInfoVOs
                            .map((certificate) => certificate.certificateName)
                            .join(" ")}
                    </p>
                </div>

                <div>
                    {data.reviewCount > 0 && (
                        <p className="flex w-full flex-row text-xs font-medium items-center">
                            <IoIosStar className="text-yellow-400 mr-1" />
                            {Math.round((data.rating + Number.EPSILON) * 100) /
                                100}{" "}
                            ({data.reviewCount})
                        </p>
                    )}
                    <p className="text-xs font-bold">
                        가격 {data.basicFee.toLocaleString()}원 ~
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InstructorResultComponent;
