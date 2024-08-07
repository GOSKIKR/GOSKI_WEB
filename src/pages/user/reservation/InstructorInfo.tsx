import React, { useEffect, useState } from "react";
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
import NavbarUserMobile from "../../../components/common/NavbarUserMobile";
import instructorInfoStore from "../../../store/instructorInfoStore";
import userReserveStore from "../../../store/userReserveStore";
import "react-tooltip/dist/react-tooltip.css";
import "../../../../public/assets/css/tooltip.css";
import { Instructor } from "../../../dto/UserInstructorDTO";
import TimePicker from "../../../components/common/TimePicker";
import userResortsStore from "../../../store/userResortsStore";

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
                className="w-4 h-4"
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
                className="w-4 h-4"
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

const calculateFee = (fee: number | undefined, duration: number) => {
    return fee && fee > 0
        ? {
              text: `${fee * duration}원`,
              calculation: `${fee}원 x ${duration} = ${fee * duration}원`,
          }
        : { text: "0원", calculation: "" };
};

const InstructorInfo = () => {
    const navigate = useNavigate();
    const [selectedInstructor, setSelectedInstructor] =
        useState<Instructor | null>(null);

    const settings = {
        arrows: true,
        dots: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: <FaArrowAltCircleLeft color="#697BE7" />,
        nextArrow: <FaArrowAltCircleRight color="#697BE7" />,
    };

    const {
        instructorId,
        userName,
        teamId,
        teamName,
        position,
        description,
        instructorUrl,
        gender,
        certificateInfo,
        rating,
        reviewCount,
        cost,
        basicFee,
        peopleOptionFee,
        designatedFee,
        levelOptionFee,
        lessonType,
        reviews,
    } = instructorInfoStore();

    const {
        resortId: reserveResortId,
        resortName: reserveResortName,
        lessonType: reserveLessonType,
        studentCount,
        lessonDate,
        startTime,
        duration,
        level,
        setReservationInfo,
    } = userReserveStore();

    const { resortId, resortName, lessonTime } = userResortsStore();

    const [selectedStartTime, setSelectedStartTime] =
        useState<string>(startTime);
    const [selectedLessonTime, setSelectedLessonTime] = useState(duration);
    const [filterLessonDurationTimes, setFilterLessonDurationTimes] = useState<
        number[]
    >([]);
    const [filterLessonDuration, setFilterLessonDuration] = useState<number>(0);

    useEffect(() => {
        console.log(reviews);
    }, [reviews]);

    const basicFeeResult = calculateFee(basicFee, duration);
    const levelOptionFeeResult = calculateFee(levelOptionFee, duration);
    const peopleOptionFeeResult = calculateFee(peopleOptionFee, duration);
    const designatedFeeResult = designatedFee ? `${designatedFee}원` : "0원";

    const totalFee =
        (basicFee + peopleOptionFee + (levelOptionFee ?? 0)) * duration +
        (designatedFee ?? 0);

    //새로고침시 경고창
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        setSelectedInstructor({
            instructorId,
            userName,
            basicFee,
            peopleOptionFee,
            designatedFee,
            levelOptionFee,
            teamId,
            teamName,
            position,
            description,
            instructorUrl,
            gender,
            certificateInfo,
            rating,
            reviewCount,
            cost,
            lessonType,
            reviews,
        });
    }, [
        instructorId,
        userName,
        basicFee,
        peopleOptionFee,
        designatedFee,
        levelOptionFee,
        teamId,
        teamName,
        position,
        description,
        instructorUrl,
        gender,
        certificateInfo,
        rating,
        reviewCount,
        cost,
        lessonType,
        reviews,
    ]);

    useEffect(() => {
        setFilterLessonDuration(duration);
        setFilterLessonDurationTimes(lessonTime);
        setSelectedStartTime(startTime);
    }, [lessonTime]);

    const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTime = e.target.value;
        setSelectedStartTime(selectedTime.replace(":", ""));
    };

    const handleDurationChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const duration = parseInt(event.target.value);
        setFilterLessonDuration(duration);
        setSelectedLessonTime(duration);
    };

    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 8; hour < 22; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const timeString = `${hour.toString().padStart(2, "0")}:${minute
                    .toString()
                    .padStart(2, "0")}`;
                options.push(timeString);
            }
        }
        options.push(`22:00`);
        return options;
    };

    const timeOptions = generateTimeOptions();

    const goToPay = () => {
        if (!sessionStorage.getItem("accesstoken")) {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/login");
            return;
        }

        setReservationInfo({
            resortId,
            resortName,
            lessonType,
            studentCount,
            lessonDate,
            startTime: selectedStartTime,
            duration: filterLessonDuration,
            level,
        });

        navigate("/user/payment", {
            state: {
                selectedInstructor,
                userName,
                designatedFee,
                levelOptionFee,
                basicFee,
                peopleOptionFee,
                duration: selectedLessonTime,
            },
        });
    };

    return (
        <div className="min-h-screen h-auto bg-gray-50">
            <div className="w-full">
                {innerWidth > 640 ? <NavbarUser /> : <NavbarUserMobile />}
            </div>
            <div className="flex flex-col justify-center items-center px-4 py-8 space-y-3">
                <img
                    src="/assets/images/AppLogo.png"
                    alt="App Logo"
                    className="w-16 h-auto"
                />
                <div className="text-2xl font-extrabold text-gray-800">
                    GOSKI 강습 예약
                </div>
            </div>
            <div className="flex flex-col sm:flex-row px-6 sm:px-12 sm:space-x-6 space-y-6 w-full">
                <div className="flex flex-col w-full sm:w-7/12 bg-white rounded-lg shadow-lg p-8">
                    <div className="w-full sm:pb-6 pb-3 text-lg font-extrabold text-gray-700">
                        강사 소개
                    </div>
                    <div className="flex flex-row w-full h-40 bg-gray-100 rounded-lg items-center px-10 sm:py-6 justify-center space-x-6">
                        <img
                            src={instructorUrl}
                            alt="Instructor"
                            className="w-28 h-28 rounded-full object-cover"
                        />
                        <div className="w-3/5 flex flex-col space-y-1 items-center justify-center">
                            <div className="w-40 flex flex-row items-center">
                                <div className="font-bold w-1/3 text-gray-600">
                                    직책
                                </div>
                                <div className="bg-primary-400 text-white px-2 py-1 rounded-md text-sm">
                                    {position === "HEAD" ? (
                                        <div>팀장</div>
                                    ) : (
                                        <div>강사</div>
                                    )}
                                </div>
                            </div>
                            <div className="w-40 flex flex-row items-center">
                                <div className="font-bold w-1/3 text-gray-600">
                                    이름
                                </div>
                                <div className="font-bold text-gray-800">
                                    {userName}
                                </div>
                            </div>
                            <div className="w-40 flex flex-row items-center">
                                <div className="font-bold w-1/3 text-gray-600">
                                    성별
                                </div>
                                {gender === "MALE" ? (
                                    <div>남성</div>
                                ) : (
                                    <div>여성</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 자기소개 */}
                    <div className="w-full pt-10 sm:pb-6 pb-3 text-lg font-extrabold text-gray-700">
                        자기 소개
                    </div>
                    <div className="flex flex-row w-full h-32 bg-gray-100 rounded-lg items-center px-6 py-4 text-gray-700">
                        {description}
                    </div>

                    {/* 자격증 */}
                    <div className="w-full pt-10 sm:pb-6 pb-3 text-lg font-extrabold text-gray-700">
                        자격증
                    </div>
                    <div className="w-full h-48 bg-gray-100 rounded-lg px-6 py-4">
                        <Slider {...settings}>
                            {certificateInfo.map((data, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center px-3 py-5"
                                >
                                    <div className="w-full sm:h-24 object-cover bg-gray-200 rounded-md mb-2">
                                        <img
                                            src={data.certificateImageUrl}
                                            alt={data.certificateName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="text-gray-700">
                                        {data.certificateName}
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>

                    {/* 리뷰 */}
                    <div className="w-full flex flex-row pt-10 sm:pb-6 pb-3 text-lg font-extrabold  items-center space-x-4">
                        <div>리뷰 ({reviewCount})</div>
                        <div className="flex flex-row items-center space-x-1">
                            <FaStar color="#FEFD48" />
                            <div className="text-base text-gray-500">
                                {Math.round(rating * 10) / 10}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-120 justify-between items-center text-lg font-extrabold text-gray-700 overflow-hidden">
                        <div className="w-full overflow-y-auto snap-proximity">
                            {reviews?.length > 0 ? (
                                reviews.map((data, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col w-full snap-start bg-gray-100 space-y-2 p-4 my-2 rounded-md shadow-sm"
                                    >
                                        <div className="flex flex-row justify-between items-center">
                                            <div className="flex flex-row">
                                                {renderStars(data.rating)}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {formatDate(data.createdAt)}
                                            </div>
                                        </div>
                                        <div className="text-gray-700 text-xs">
                                            {data.content}
                                        </div>
                                        <div className="flex flex-row space-x-2">
                                            {data.instructorTags?.length > 0 &&
                                                data.instructorTags.map(
                                                    (tag, tagIndex) => (
                                                        <div
                                                            key={tagIndex}
                                                            className="bg-primary-300 rounded-lg px-2 py-1 text-sm text-white"
                                                        >
                                                            {tag.tagName}
                                                        </div>
                                                    )
                                                )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col w-full bg-white space-y-2 p-4 my-2 rounded-md shadow-sm">
                                    <div className="text-gray-700">
                                        리뷰가 없습니다.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full sm:w-4/12 self-start sticky top-5">
                    <div className="w-full">
                        <div className="flex flex-row items-center sm:space-x-4 mb-4">
                            <label className="mb-1 sm:mb-0 sm:w-28 text-center w-24 font-bold">
                                시작 시간
                            </label>
                            <select
                                value={`${selectedStartTime.slice(
                                    0,
                                    2
                                )}:${selectedStartTime.slice(2)}`}
                                onChange={handleTimeChange}
                                className="px-2 w-full bg-white shadow-md rounded-md flex-1 h-9 text-xs py-1 sm:text-sm"
                            >
                                {timeOptions.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mb-4">
                            <label className="mb-1 sm:mb-0 sm:w-28 text-center w-24 font-bold">
                                강습 시간
                            </label>
                            <select
                                value={filterLessonDuration}
                                onChange={handleDurationChange}
                                className="border rounded-md p-1"
                            >
                                {filterLessonDurationTimes.map(
                                    (time, index) => (
                                        <option key={index} value={time}>
                                            {time}시간
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col px-3 py-6 space-y-2 w-full h-72 bg-primary-50 rounded-lg shadow-md items-center justify-center mb-8">
                        <div className="font-extrabold pb-2 w-full">
                            최종 결제금액
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <div className="text-xs">기존 강습비</div>
                            <div className="flex flex-col items-end">
                                <div className="text-gray-400 text-xs">
                                    {basicFeeResult.calculation}
                                </div>
                                <div className="text-sm">
                                    {basicFeeResult.text}
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <div className="text-xs">레벨 옵션비</div>
                            <div className="flex flex-col items-end">
                                <div className="text-gray-400 text-xs">
                                    {levelOptionFeeResult.calculation}
                                </div>
                                <div>{levelOptionFeeResult.text}</div>
                            </div>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <div className="text-xs">인원 옵션비</div>
                            <div className="flex flex-col items-end">
                                <div className="text-gray-400 text-xs">
                                    {peopleOptionFeeResult.calculation}
                                </div>
                                <div>{peopleOptionFeeResult.text}</div>
                            </div>
                        </div>
                        <div className="w-full my-[1%] border-[1px] border-black"></div>
                        <div className="w-full flex flex-row justify-between pb-3">
                            <div className="font-extrabold">총 결제금액</div>
                            <div className="text-blue-500 font-extrabold">
                                {totalFee}원
                            </div>
                        </div>

                        <div
                            onClick={goToPay}
                            className="h-20 w-1/2 p-1 bg-white rounded-lg shadow-md text-black text-center flex items-center justify-center cursor-pointer hover:bg-slate-200"
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
