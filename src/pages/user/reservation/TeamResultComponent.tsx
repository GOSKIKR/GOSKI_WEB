import React from "react";
import teamInfoStore from "../../../store/teamInfoStore";

interface TeamResultComponentProps {
  data: {
    teamId: number;
    teamName: string;
    description: string;
    cost: number;
    teamProfileUrl: string;
    rating: number;
    instructors: number[];
    teamImages: {
      teamImageId: number;
      imageUrl: string;
    }[];
    basicFee: number;
    peopleOptionFee: number;
    designatedFee: number;
    levelOptionFee: number;
    lessonType: string;
    reviewCount: number;
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
  goToTeamDetail: () => void;
}

const TeamResultComponent: React.FC<TeamResultComponentProps> = ({
  data,
  goToTeamDetail,
}) => {
  const { setTeamInfo } = teamInfoStore();

  const handleTeamClicked = (id: number) => {
    goToTeamDetail();

    if (data.teamId === id) {
      setTeamInfo({
        teamId: data.teamId,
        teamName: data.teamName,
        description: data.description,
        cost: data.cost,
        teamProfileUrl: data.teamProfileUrl,
        rating: data.rating,
        instructors: data.instructors,
        teamImages: data.teamImages,
        basicFee: data.basicFee,
        peopleOptionFee: data.peopleOptionFee,
        designatedFee: data.designatedFee,
        levelOptionFee: data.levelOptionFee,
        lessonType: data.lessonType,
        reviewCount: data.reviewCount,
        reviews: data.reviews,
      });
    }
  };

  return (
    <div
      key={data.teamId}
      className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer mb-4 w-full"
      onClick={() => handleTeamClicked(data.teamId)}
    >
      <div className="flex">
        {/* Image 박스 */}
        <div className="w-1/6">
          <img
            src={data.teamProfileUrl}
            alt="team-profile"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Team Info 박스 */}
        <div className="w-3/6 p-4">
          <h3 className="text-xl font-semibold mb-2">{data.teamName}</h3>
          <p className="text-sm text-gray-600 mb-4">{data.description}</p>
          <div className="flex items-center mb-2">
            <span className="text-lg font-semibold mr-4">
              평점: {Math.round(data.rating * 100) / 100}
            </span>
            <span className="bg-primary-500 text-white text-sm px-2 py-1 rounded">
              리뷰 {data.reviewCount}개
            </span>
          </div>
          <p className="text-sm">레슨 유형: {data.lessonType}</p>
        </div>

        {/* Price 박스 */}
        <div className="w-2/6 bg-primary-100 p-4">
          <h4 className="font-semibold mb-4">요금 정보</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">기본 요금</p>
              <p className="text-lg font-bold">
                {data.basicFee.toLocaleString()}원
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">인원 옵션 요금</p>
              <p className="text-base">
                {data.peopleOptionFee.toLocaleString()}원
              </p>
            </div>
            {/* <div>
              <p className="text-sm font-medium">지정 요금</p>
              <p className="text-base">
                {data.designatedFee.toLocaleString()}원
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">레벨 옵션 요금</p>
              <p className="text-base">
                {data.levelOptionFee.toLocaleString()}원
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamResultComponent;
