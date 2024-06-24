import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaStar } from "react-icons/fa";
import NavbarUser from '../../../components/common/NavbarUser';

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

const dummyInstructorData : Instructor = 
    {
        instructorId: 1,
        userName: "Instructor A",
        teamId: 1,
        teamName: "Team A",
        position: 1,
        description: "강사 레벨",
        instructorUrl: "https://example.com/instructorA-profile.jpg",
        gender: "Male",
        certificateInfo: [
            {
                certificateId: 1,
                certificateName: "Ski Instructor Level 1",
                certificateType: "Ski",
                certificateImageUrl: "https://example.com/certificate1.jpg",
            },
            {
                certificateId: 2,
                certificateName: "Ski Instructor Level 2",
                certificateType: "Ski",
                certificateImageUrl: "https://example.com/certificate2.jpg",
            },
            {
                certificateId: 3,
                certificateName: "Ski Instructor Level 3",
                certificateType: "Ski",
                certificateImageUrl: "https://example.com/certificate2.jpg",
            },
        ],
        rating: 3.5,
        reviewCount: 30,
        cost: 100000,
        basicFee: 30000,
        peopleOptionFee: 10000,
        designatedFee: 5000,
        levelOptionFee: 5000,
        lessonType: "Ski",
        reviews: [
            {
                reviewId: 1,
                rating: 4,
                content: "Great instructor with a lot of patience.",
                createdAt: "2024-06-15T14:30:00",
                instructorTags: [
                    {
                        tagReviewId: 101,
                        tagName: "Patient",
                    },
                    {
                        tagReviewId: 102,
                        tagName: "Friendly",
                    },
                ],
            },
            {
                reviewId: 2,
                rating: 3,
                content: "Great instructor with a lot of patience.",
                createdAt: "2024-06-15T14:30:00",
                instructorTags: [
                    {
                        tagReviewId: 101,
                        tagName: "Patient",
                    },
                    {
                        tagReviewId: 102,
                        tagName: "Friendly",
                    },
                ],
            },
            {
                reviewId: 3,
                rating: 1,
                content: "Great instructor with a lot of patience.",
                createdAt: "2024-06-15T14:30:00",
                instructorTags: [
                    {
                        tagReviewId: 101,
                        tagName: "Patient",
                    },
                    {
                        tagReviewId: 102,
                        tagName: "Friendly",
                    },
                ],
            },
        ],
    }

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

const InstructorInfo = () => {
    const navigate = useNavigate();

    const goToPay = () => {
        navigate('/user/payment');
    }

    const settings = {
        arrows: true,
        dots: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: <FaArrowAltCircleLeft color='#697BE7' />,
        nextArrow: <FaArrowAltCircleRight color='#697BE7' />
    };

    return (
        <div>
            <NavbarUser/>
            <div className='py-12 pl-12'>예약하기</div>
            <div className='flex flex-row px-12 space-x-6 h-screen w-screen'>
                <div className='flex flex-col w-7/12 bg-primary-50 rounded-lg shadow-md items-center px-8'>
                    <div className='w-full pt-10 pb-6 text-lg font-extrabold'>강사 소개</div>
                    <div className='flex flex-row w-full h-40 bg-primary-100 rounded-lg items-center px-6'>
                        <div className='w-24 h-28 bg-gray-200'></div>
                        <div className='flex flex-col px-8 space-y-1'>
                            <div className='flex flex-row space-x-8'>
                                <div className='font-bold'>직책</div>
                                <div className='bg-primary-400 text-white px-1 rounded-md'>{dummyInstructorData.description}</div>
                            </div>
                            <div className='flex flex-row space-x-8'>
                                <div className='font-bold'>이름</div>
                                <div>{dummyInstructorData.userName}</div>
                            </div>
                            <div className='flex flex-row space-x-8'>
                                <div className='font-bold'>성별</div>
                                {dummyInstructorData.gender === 'Male' ? <div>남성</div> : <div>여성</div>}
                            </div>
                            <div className='flex flex-row space-x-8'>
                                <div>자격명</div>
                                {dummyInstructorData.certificateInfo.map((data, index) => 
                                    <div key={index}>{data.certificateName}</div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* 자기소개 */}
                    <div className='w-full pt-10 pb-6 text-lg font-extrabold'>자기 소개</div>
                    <div className='flex flex-row w-full h-40 bg-white rounded-lg items-center px-6'>
                        자기소개
                    </div>

                    {/* 자격증 */}
                    <div className='w-full pt-10 pb-6 text-lg font-extrabold'>자격증</div>
                    <div className='w-full h-45 bg-white rounded-lg px-6'>
                        <Slider {...settings}>
                            {dummyInstructorData.certificateInfo.map((data, index) => (
                                <div key={index} className='flex flex-col items-center px-3 py-5'>
                                    <div className='w-full h-32 object-cover bg-gray-200'>자격증 이미지</div>
                                    <div>{data.certificateName}</div>
                                </div>
                            ))}
                        </Slider>
                    </div>

                    {/* 리뷰 */}
                    <div className='flex flex-row w-full justify-between items-center pt-10 pb-6 text-lg font-extrabold'>
                        <div>리뷰
                        ({dummyInstructorData.reviewCount}개)</div>
                        <div className='flex flex-row'>
                            <FaStar color="#FEFD48"/>
                            <div className="ml-2 text-sm text-gray-600 font-extrabold">
                                {dummyInstructorData.rating}
                            </div>
                        </div>
                    </div>
                    {dummyInstructorData.reviews.map((data, index) => (
                        <div className='flex flex-col w-full h-32 bg-white space-y-2 px-3 py-2'>
                            <div className='flex flex-row'>
                                <div className='flex flex-row'>{renderStars(data.rating)}</div>
                                <div>{data.createdAt}</div>
                            </div>
                            <div>{data.content}</div>
                            <div className='flex flex-row space-x-2'>
                                {data.instructorTags.map((data, index) =>(
                                <div className='bg-primary-300 rounded-lg px-1'>{data.tagName}</div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex flex-col px-6 py-6 space-y-2 w-3/12 h-60 bg-primary-50 rounded-lg shadow-md'>
                    <div>최종 결제금액</div>
                    <div>기존 강습비</div>
                    <div>레벨 옵션비</div>
                    <div>총 결제금액</div>
                    <div onClick={goToPay} className='h-12 bg-white rounded-lg shadow-md text-black text-center flex items-center justify-center cursor-pointer'>
                        예약하기
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorInfo;