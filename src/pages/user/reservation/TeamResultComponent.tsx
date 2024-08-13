import React from "react";
import teamInfoStore from "../../../store/teamInfoStore";
import { IoIosStar } from "react-icons/io";

interface TeamResultComponentProps {
    data: {
        teamId: number;
        teamName: string;
        description: string;
        cost: number;
        teamProfileUrl: string;
        rating: number;
        instructors: number[];
        teamImageVOs: {
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
                teamImageVOs: data.teamImageVOs,
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
            className="w-full min-w-72 bg-primary-50 shadow-md rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer mb-4 "
            onClick={() => handleTeamClicked(data.teamId)}
        >
            <div className="flex flex-row w-full py-2 items-center justify-center space-x-3 ">
                {/* Image 박스 */}
                <div className=" sm:h-32 sm:w-32 h-20 w-20 sm:p-2 pl-2 sm:ml-4 sm:mr-4">
                    <img
                        src={data.teamProfileUrl}
                        alt="team-profile"
                        className="w-full h-full rounded-lg cursor-not-allowed"
                    />
                </div>
                <div className="flex flex-col sm:flex-row w-2/3">
                    {/* Team Info 박스 */}
                    <div className="flex flex-col space-y-2 sm:w-3/5 p-4">
                        <div className="flex flex-ro text-base font-semibold">
                            <div className="text-primary-600">
                                {data.teamName}
                            </div>
                            <div>팀</div>
                        </div>
                        <p className="text-xs text-gray-500">
                            {data.description}
                        </p>
                        <div className="flex items-center flex-row space-x-1">
                            <IoIosStar className="text-yellow-400" />
                            <div className="text-sm font-semibold mr-4">
                                {Math.round(data.rating * 100) / 100}
                            </div>
                        </div>
                    </div>
                    {/* Price 박스 */}
                    <div className="sm:w-1/3 sm:pt-10 sm:p-4 px-4 pb-4 h-full flex flex-col">
                        <div className="flex flex-row sm:space-x-2 space-x-0 items-center">
                            <p className="text-xs font-xs w-24 text-gray-500">
                                기본 요금
                            </p>
                            <p className="text-sm font-bold w-16">
                                {data.basicFee.toLocaleString()}원
                            </p>
                        </div>
                        <div className="flex flex-row sm:space-x-2 space-x-0 items-center">
                            <p className="text-xs font-xs w-24 text-gray-500">
                                인원 옵션 요금
                            </p>
                            <p className="text-sm w-16">
                                {data.peopleOptionFee.toLocaleString()}원
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamResultComponent;
