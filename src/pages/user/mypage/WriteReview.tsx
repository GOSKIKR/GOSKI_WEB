import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import NavbarUser from "../../../components/common/NavbarUser";
import NavbarUserMobile from "../../../components/common/NavbarUserMobile";
import { Tag } from "../../../dto/ReviewDTO";
import { UserReviewDTO } from "../../../dto/UserReviewDTO";
import { ReviewTagService } from "../../../api/ReviewTagService";
import { UserReviewService } from "../../../api/UserReviewService";

const WriteReview: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { lesson } = location.state || {};

    const [rating, setRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [reviewContent, setReviewContent] = useState<string>("");
    const [tags, setTags] = useState<Tag[]>([]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "notStart":
                return "bg-yellow-100";
            case "onGoing":
                return "bg-green-100";
            case "lessonFinished":
                return "bg-blue-100";
            case "cancelLesson":
                return "bg-red-100";
            default:
                return "bg-transparent";
        }
    };

    const getStatusName = (status: string) => {
        switch (status) {
            case "notStart":
                return "강습 예정";
            case "onGoing":
                return "진행 중";
            case "lessonFinished":
                return "강습 완료";
            case "cancelLesson":
                return "취소된 강습";
            default:
                return "";
        }
    };

    useEffect(() => {
        const fetchTags = async () => {
            const reviewTagService = new ReviewTagService();
            const tagList = await reviewTagService.getTags();
            setTags(tagList);
        };
        fetchTags();
    }, []);

    const handleTagClick = (id: number) => {
        setSelectedTags((prevTags) =>
            prevTags.includes(id)
                ? prevTags.filter((tag) => tag !== id)
                : [...prevTags, id]
        );
    };

    const handleSubmit = async () => {
        if (rating === 0) {
            alert("별점을 선택해주세요.");
            return;
        }

        if (reviewContent.trim() === "") {
            alert("리뷰 내용을 작성해주세요.");
            return;
        }

        if (selectedTags.length === 0) {
            alert("태그를 선택해주세요.");
            return;
        }

        const reviewData: UserReviewDTO = {
            lessonId: lesson.lessonId,
            rating,
            content: reviewContent,
            reviewTags: selectedTags,
        };
        // console.log(reviewData);

        const userReviewService = new UserReviewService();
        const result = await userReviewService.writeUserReview(reviewData);

        if (result) {
            alert("리뷰가 성공적으로 등록되었습니다.");
            console.log(reviewData);
            navigate(-1);
        } else {
            alert("리뷰 등록에 실패했습니다.");
        }
    };

    const formatTime = (time: string) => {
        return time.slice(0, 2) + ":" + time.slice(2);
    };

    return (
        <div>
            <div className="w-full">
                {innerWidth > 640 ? <NavbarUser /> : <NavbarUserMobile />}
            </div>
            <div className="flex flex-col w-full min-w-[500px] h-full items-center mb-12">
                <div className="w-full px-12 pt-8 pb-12 font-extrabold text-black text-2xl h-full">
                    리뷰 작성
                </div>
                <div className="flex flex-col bg-primary-50 w-4/5 rounded-lg shadow-md items-center py-12 space-y-10">
                    <div className="flex sm:flex-row flex-col space-y-4 sm:space-y-0 bg-white w-4/5 sm:h-1/2 h-4/6 rounded-lg items-center justify-center py-10">
                        <img
                            src={lesson.profileUrl}
                            alt="Profile"
                            className="w-32 h-32 rounded-full"
                        />
                        <div className="flex flex-col sm:ml-8 items-center sm:items-start space-y-2">
                            <div
                                className={`font-extrabold w-20 text-center rounded-md ${getStatusColor(
                                    lesson.lessonStatus
                                )}`}
                            >
                                {getStatusName(lesson.lessonStatus)}
                            </div>
                            <div className="font-bold text-xl">
                                {lesson.resortName}
                            </div>
                            <p className="text-gray-500 sm:text-sm text-xs">
                                {`${lesson.lessonDate} (${new Date(
                                    lesson.lessonDate
                                ).toLocaleString("ko-KR", {
                                    weekday: "short",
                                })}) `}
                                {`${formatTime(lesson.startTime)} ~ ${new Date(
                                    new Date(
                                        `${lesson.lessonDate}T${formatTime(
                                            lesson.startTime
                                        )}`
                                    ).getTime() +
                                        lesson.duration * 60 * 60 * 1000
                                ).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}`}
                            </p>
                            <div className="flex flex-row space-x-3">
                                <div className="flex flex-row">
                                    <div className="text-primary-600">
                                        {lesson.teamName}
                                    </div>
                                    <div>팀</div>
                                </div>
                                {lesson.instructorName &&
                                    lesson.instructorName != null && (
                                        <div className="flex flex-row">
                                            <div>강사</div>
                                            <div className="text-primary-600 ml-1">
                                                {lesson.instructorName}
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white w-4/5 rounded-lg p-6">
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-col items-center space-y-2">
                                <div className="font-bold text-lg">
                                    이번 강습 어땠나요?
                                </div>
                                <div className="flex flex-row space-x-1">
                                    {[...Array(5)].map((_, index) => {
                                        const starValue = index + 1;
                                        return (
                                            <label key={starValue}>
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    value={starValue}
                                                    onClick={() =>
                                                        setRating(starValue)
                                                    }
                                                    className="hidden"
                                                />
                                                <FaStar
                                                    size={24}
                                                    color={
                                                        hoverRating >=
                                                            starValue ||
                                                        rating >= starValue / 2
                                                            ? "orange"
                                                            : "gray"
                                                    }
                                                    onMouseEnter={() =>
                                                        setHoverRating(
                                                            starValue
                                                        )
                                                    }
                                                    onMouseLeave={() =>
                                                        setHoverRating(0)
                                                    }
                                                />
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-4 gap-2 justify-items-center">
                                {tags.map((tag) => (
                                    <button
                                        key={tag.tagReviewId}
                                        className={`px-2 py-2 w-36 sm:text-md text-xs h-8 rounded-full truncate ${
                                            selectedTags.includes(
                                                tag.tagReviewId
                                            )
                                                ? "bg-blue-500 text-white"
                                                : "bg-blue-100"
                                        }`}
                                        onClick={() =>
                                            handleTagClick(tag.tagReviewId)
                                        }
                                    >
                                        {tag.tagName}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white w-4/5 rounded-lg p-6">
                        <label htmlFor="review" className="font-bold pb-5">
                            리뷰를 작성해주세요
                        </label>
                        <input
                            type="text"
                            id="review"
                            value={reviewContent}
                            onChange={(e) => setReviewContent(e.target.value)}
                            className="p-4 bg-gray-100 rounded-lg w-full h-32"
                        ></input>
                    </div>
                    <button
                        className="flex items-center justify-center bg-primary-500 sm:w-1/6 h-12 p-1 px-2  rounded-lg text-white"
                        onClick={handleSubmit}
                    >
                        작성 완료
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WriteReview;
