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
            className="bg-primary-50 shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 ease-in-out transform w-40 h-80 flex flex-col items-center justify-center m-4"
            onClick={() => handleInstructorClicked(data.instructorId)}
        >
            {/* 강사 사진 (1/3 영역) */}
            <div className="h-32 w-32 overflow-hidden rounded-lg">
                <img
                    src={data.instructorUrl}
                    alt="instructor"
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                />
            </div>

            {/* 정보 영역 (2/3) */}
            <div className="h-1/2 p-4 px-3 flex flex-col justify-between">
                <div>
                    <h3 className="text-base font-semibold mb-2">
                        {data.userName}
                    </h3>
                    <div>
                        <div className="text-xs text-primary-400">자격증</div>
                        <p className="text-xs text-gray-600 mb-4">
                            {data.certificateInfoVOs
                                .map(
                                    (certificate) => certificate.certificateName
                                )
                                .join(" ")}
                        </p>
                    </div>
                    <p className="flex flex-row text-xs font-medium">
                        <IoIosStar className="text-yellow-200 mr-1" />
                        평점{" "}
                        {Math.round((data.rating + Number.EPSILON) * 100) /
                            100}{" "}
                        리뷰({data.reviewCount})
                    </p>
                </div>
                <div className="pt-2">
                    <p className="text-xs font-bold">
                        가격 {data.basicFee.toLocaleString()}원 ~
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InstructorResultComponent;
