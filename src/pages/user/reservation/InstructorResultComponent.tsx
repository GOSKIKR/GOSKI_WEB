import React from "react";

interface InstructorResultComponentProps {
  data: {
    instructorId: number;
    userName: string;
    teamId: number;
    teamName: string;
    position: string;
    description: string;
    instructorUrl: string;
    gender: string;
    certificateInfo: {
      certificateId: number;
      certificateName: string;
      certificateType: string;
      certificateImageUrl: string;
    }[];
    rating: number;
    reviewCount: number;
    cost: number;
    basicFee: number;
    peopleOptionFee: number;
    designatedFee: number;
    levelOptionFee: number;
    lessonType: string;
    reviews: {
      reviewId: number;
      rating: number;
      content: string;
      createdAt: string;
      instructorTags: {
        tagReviewId: number;
        tagName: string;
      }[];
    }[];
  };
  goToInstructorDetail: () => void;
}

const InstructorResultComponent: React.FC<InstructorResultComponentProps> = ({
  data,
  goToInstructorDetail,
}) => {
  return (
    <div
      key={data.instructorId}
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 ease-in-out transform  w-64 h-full flex flex-col justify-center m-4"
      onClick={goToInstructorDetail}
    >
      {/* 강사 사진 (1/3 영역) */}
      <div className="h-40 overflow-hidden">
        <img
          src={data.instructorUrl}
          alt="instructor"
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
        />
      </div>

      {/* 정보 영역 (2/3) */}
      <div className="h-2/3 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2">{data.userName}</h3>
          <div>
            <div className="font-medium">자격증</div>
            <p className="text-sm text-gray-600 mb-4">
              {data.certificateInfo
                .map((certificate) => certificate.certificateName)
                .join(", ")}
            </p>
          </div>
          <p className="text-lg font-medium">
            평점: {data.rating} | 리뷰: {data.reviewCount}개
          </p>
        </div>
        <div>
          <p className="text-lg font-bold">
            가격: {data.basicFee.toLocaleString()}원 ~
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstructorResultComponent;
