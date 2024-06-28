import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    FaArrowAltCircleLeft,
    FaArrowAltCircleRight,
    FaStar,
} from "react-icons/fa";
import NavbarUser from "../../../components/common/NavbarUser";

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

const dummyInstructorData: Instructor = {
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
};

const renderStars = (score: number) => {
    const filledStars = Math.floor(score);
    const emptyStars = Math.floor(5 - score);

    const stars = [];
    for (let i = 0; i < filledStars; i++) {
        stars.push(
            <svg
                key={i}
                xmlns="https://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#FFFF00"
                className="w-6 h-6"
            >
                <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                />
            </svg>
        );
    }
    for (let i = 0; i < emptyStars; i++) {
        stars.push(
            <svg
                key={filledStars + i}
                xmlns="https://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
            </svg>
        );
    }
    return stars;
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
};

const InstructorInfo = () => {
    const navigate = useNavigate();

    const goToPay = () => {
        navigate("/user/payment");
    };

    const settings = {
        arrows: true,
        dots: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: <FaArrowAltCircleLeft color="#697BE7" />,
        nextArrow: <FaArrowAltCircleRight color="#697BE7" />,
    };

    return (
        <div>
            <NavbarUser />
            <div className="flex flex-col justify-center items-center px-4 py-8 space-y-3">
                <img
                    src="/assets/images/AppLogo.png"
                    alt="App Logo"
                    className="w-16 h-auto"
                />
                <div className="text-xl font-extrabold">GOSKI 강습 예약</div>
            </div>
            <div className="flex flex-col sm:flex-row px-6 sm:px-12 sm:space-x-6 space-y-6 h-screen w-screen">
                <div className="flex flex-col w-full sm:w-7/12 bg-primary-50 rounded-lg shadow-md items-center px-8">
                    <div className="w-full pt-5 sm:pt-10 sm:pb-6 pb-3 text-lg font-extrabold">
                        강사 소개
                    </div>
                    <div className="flex flex-row w-full h-40 bg-primary-100 rounded-lg items-center px-6 sm:py-6 justify-between space-x-6">
                        <div className="w-28 h-28 bg-gray-200"></div>
                        <div className="w-4/5 flex flex-col sm:px-8 space-y-1">
                            <div className="flex flex-row">
                                <div className="font-bold w-1/3">직책</div>
                                <div className="bg-primary-400 text-white px-1 rounded-md">
                                    {dummyInstructorData.description}
                                </div>
                            </div>
                            <div className="flex flex-row ">
                                <div className="font-bold w-1/3">이름</div>
                                <div className="font-bold w-30">
                                    {dummyInstructorData.userName}
                                </div>
                            </div>
                            <div className="flex flex-row n">
                                <div className="font-bold w-1/3">성별</div>
                                {dummyInstructorData.gender === "Male" ? (
                                    <div>남성</div>
                                ) : (
                                    <div>여성</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 자기소개 */}
                    <div className="w-full sm:h-full pt-10 sm:pb-6 pb-3 text-lg font-extrabold">
                        자기 소개
                    </div>
                    <div className="flex flex-row w-full h-80 sm:h-60 bg-white rounded-lg items-center px-6">
                        자기소개
                    </div>

                    {/* 자격증 */}
                    <div className="w-full pt-10 sm:pb-6 pb-3 text-lg font-extrabold">
                        자격증
                    </div>
                    <div className="w-full h-48 sm:h-60 bg-white rounded-lg px-6">
                        <Slider {...settings}>
                            {dummyInstructorData.certificateInfo.map(
                                (data, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center px-3 py-5"
                                    >
                                        <div className="w-full h-auto object-cover bg-gray-200">
                                            자격증 이미지
                                        </div>
                                        <div>{data.certificateName}</div>
                                    </div>
                                )
                            )}
                        </Slider>
                    </div>

                    {/* 리뷰 */}
                    <div className="flex flex-row w-full justify-between items-center pt-10 pb-6 text-lg font-extrabold">
                        <div>리뷰 ({dummyInstructorData.reviewCount}개)</div>
                        <div className="flex flex-row">
                            <FaStar color="#FEFD48" />
                            <div className="ml-2 text-sm text-gray-600 font-extrabold">
                                {dummyInstructorData.rating}
                            </div>
                        </div>
                    </div>
                    {dummyInstructorData.reviews.map((data, index) => (
                        <div
                            key={index}
                            className="flex flex-col w-full h-32 bg-white space-y-2 px-3 py-2"
                        >
                            <div className="flex flex-row justify-between pr-3">
                                <div className="flex flex-row">
                                    {renderStars(data.rating)}
                                </div>
                                <div className="text-sm">
                                    {formatDate(data.createdAt)}
                                </div>
                            </div>
                            <div>{data.content}</div>
                            <div className="flex flex-row space-x-2">
                                {data.instructorTags.map((tag, tagIndex) => (
                                    <div
                                        key={tagIndex}
                                        className="bg-primary-300 rounded-lg px-1"
                                    >
                                        {tag.tagName}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col sm:w-4/12">
                    <div className="flex flex-col px-8 py-6 space-y-3 w-full h-60 bg-primary-50 rounded-lg shadow-md items-center justify-center">
                        <div className="font-extrabold pb-2 w-full">
                            최종 결제금액
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <div>기존 강습비</div>
                            <div>10000원</div>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <div>레벨 옵션비</div>
                            <div>10000원</div>
                        </div>
                        <div className="w-full my-[1%] border-[1px] border-black"></div>
                        <div className="w-full flex flex-row justify-between pb-3">
                            <div className="font-extrabold">총 결제금액</div>
                            <div className="text-blue-500 font-extrabold">
                                20000원
                            </div>
                        </div>

                        <div
                            onClick={goToPay}
                            className="h-20 w-1/2 bg-white rounded-lg shadow-md text-black text-center flex items-center justify-center cursor-pointer"
                        >
                            예약하기
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorInfo;
