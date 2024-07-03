import React from "react";
import { ReviewDTO } from "../../../dto/ReviewDTO";

interface ReviewModalProps {
    review: ReviewDTO;
    onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ review, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-primary-100 rounded-lg p-6 sm:w-[400px] w-[350px] text-center" onClick={(e) => e.stopPropagation()}>
                <div className="text-lg font-bold mb-4">리뷰</div>
                <div className="mb-4">
                    <div className="text-black">{review.content}</div>
                    <div className="flex justify-center flex-wrap mt-2">
                        {review.instructorTags.map((tag) => (
                            <span
                                key={tag.tagReviewId}
                                className="bg-black text-white rounded-full px-3 py-1 text-sm m-1"
                            >
                                {tag.tagName}
                            </span>
                        ))}
                    </div>
                </div>
                <button className="mt-4 bg-primary-700 text-white px-4 py-2 rounded" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default ReviewModal;
