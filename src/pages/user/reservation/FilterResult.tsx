import React from 'react';
import NavbarUser from '../../../components/common/NavbarUser';
import { FaPersonSnowboarding } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { FaSkiing } from "react-icons/fa";

interface CertificateInfo {
    certificateId: number;
    certificateName: string;
    certificateType: string;
    certificateImageUrl: string;
}
interface Review {
    reviewId: number;
    rating: number;
    content: string;
    createdAt: string; // Assuming LocalDateTime is represented as a string
    instructorTags: {
        tagReviewId: number;
        tagName: string;
    }[];
}
interface Instructor {
    instructorId: number;
    userName: string;
    teamId: number;
    teamName: string;
    position: number;
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
    reviews: Review[];
}

interface Team {
    teamId: number;
    teamName: string;
    description: string;
    teamProfileUrl: string;
    rating: number;
    instructors: number[];
    teamImages: {
        teamImageId: number;
        imageUrl: string;
    }[];
    cost: number;
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
        createdAt: string; // Assuming LocalDateTime is represented as a string
        instructorTags: {
            tagReviewId: number;
            tagName: string;
        }[];
    }[];
}

const dummyTeamData: Team[] = [
    {
        teamId: 1,
        teamName: 'Team A',
        description: 'This is Team A, specializing in skiing lessons.',
        teamProfileUrl: 'https://example.com/teamA-profile.jpg',
        rating: 3,
        instructors: [1, 2],
        teamImages: [
            { teamImageId: 1, imageUrl: 'https://example.com/teamA-image1.jpg' },
            { teamImageId: 2, imageUrl: 'https://example.com/teamA-image2.jpg' }
        ],
        cost: 50,
        basicFee: 30,
        peopleOptionFee: 10,
        designatedFee: 5,
        levelOptionFee: 5,
        lessonType: 'Ski',
        reviewCount: 15,
        reviews: [
            {
                reviewId: 1,
                rating: 4,
                content: 'Great team with experienced instructors.',
                createdAt: '2024-06-15T14:30:00', // Example date/time in ISO format
                instructorTags: [
                    { tagReviewId: 101, tagName: 'Experienced' },
                    { tagReviewId: 102, tagName: 'Friendly' }
                ]
            },
            {
                reviewId: 2,
                rating: 5,
                content: 'Fantastic lessons, highly recommend!',
                createdAt: '2024-06-16T10:00:00',
                instructorTags: [
                    { tagReviewId: 103, tagName: 'Patient' },
                    { tagReviewId: 104, tagName: 'Knowledgeable' }
                ]
            }
        ]
    },
    {
        teamId: 2,
        teamName: 'Team B',
        description: 'Team B provides snowboarding lessons for all levels.',
        teamProfileUrl: 'https://example.com/teamB-profile.jpg',
        rating: 4,
        instructors: [3],
        teamImages: [
            { teamImageId: 3, imageUrl: 'https://example.com/teamB-image1.jpg' },
            { teamImageId: 4, imageUrl: 'https://example.com/teamB-image2.jpg' }
        ],
        cost: 60,
        basicFee: 35,
        peopleOptionFee: 15,
        designatedFee: 7,
        levelOptionFee: 5,
        lessonType: 'Snowboard',
        reviewCount: 12,
        reviews: [
            {
                reviewId: 3,
                rating: 4,
                content: 'Good instructors and well-organized lessons.',
                createdAt: '2024-06-17T09:30:00',
                instructorTags: [
                    { tagReviewId: 105, tagName: 'Organized' },
                    { tagReviewId: 106, tagName: 'Enthusiastic' }
                ]
            },
            {
                reviewId: 4,
                rating: 3,
                content: 'Decent lessons but room for improvement.',
                createdAt: '2024-06-18T15:00:00',
                instructorTags: [
                    { tagReviewId: 107, tagName: 'Helpful' },
                    { tagReviewId: 108, tagName: 'Informative' }
                ]
            }
        ]
    }
    // Add more dummy data entries as needed
];

const renderStars = (score: number) => {
    const filledStars = Math.floor(score);
    const emptyStars = Math.floor(5 - score);
    
    const stars = [];
    for (let i = 0; i < filledStars; i++) {
        stars.push(
            <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFF00" className="w-6 h-6">
                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
            </svg>
        );
    }
    for (let i = 0; i < emptyStars; i++) {
        stars.push(
            <svg xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
        );
    }
    return stars;
}

const FilterResult: React.FC = () => {
	const navigate = useNavigate();

    const goToDetail = () => {
        navigate(`/reserve/detail`);
    }

    return (
        <div>
            <NavbarUser />
            <div className='flex flex-col space-y-10 w-full h-full'>
                <div className='flex flex-row py-16 w-full justify-center space-x-5 justify-items-center'>
                    <div className='flex flex-row bg-primary-600 w-2/5 h-14 rounded-lg items-center place-content-between'>
                        <FaSkiing color='white' size='35' className='w-1/6'/>
                        <div className='text-white w-2/3 font-bold text-lg text-center'>스키</div>
                    </div>
                    <div className='flex flex-row bg-gray-200 w-2/5 h-14 rounded-lg items-center place-content-between'>
                        <div className='text-gray-700 w-2/3 font-bold text-lg text-center'>보드</div>
                        <FaPersonSnowboarding color='gray-700' size='35' className='w-1/6 -scale-x-100'/>
                    </div>
                </div>
                {dummyTeamData.map((team, index) => (
                    <div onClick={goToDetail} key={index} className='flex flex-row h-28 w-3/5 rounded-lg shadow-md bg-primary-50 cursor-pointer'>
                        <img src={team.teamProfileUrl} className='h-24 w-24'/>
						<div className='flex flex-col pl-10 justify-center'>
                            <div className='text-lg'>{team.teamName}</div>
                            <div>{team.description}</div>
                            <div className='flex flex-row'>
								<div className='flex flex-row'>{renderStars(team.rating)}</div>
								<div>{team.rating}</div>
								<div>({team.reviewCount})</div>
							</div>
                        </div>
                        <div className='flex flex-col pl-20 justify-center'>
                            <div>{team.basicFee}원~</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterResult;
