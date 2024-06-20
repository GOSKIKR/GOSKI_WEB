import React from 'react';
import { useNavigate } from 'react-router-dom';

const LessonlistCard = () => {

    const navigate = useNavigate();
    const goToPayDetail = () => {
        navigate(`/user/payment/detail`);
    }
    const goToWriteReview = () => {
        navigate(`/user/review`);
    }
    const goToFeedback = () => {
        navigate(`/user/feedback`);
    }

    return (
        <div className='bg-primary-50 h-40 rounded-md shadow-lg flex flex-row space-x-16'>
            <div>사진</div>
            <div className='flex flex-col'>
                <div>진행 예정</div>
                <div>리조트이름</div>
                <div>예약 시간</div>
                <div>팀, 강사 정보</div>
            </div>
            <div className='flex flex-col'>
                <div>결제금액</div>
                <div onClick={goToPayDetail}>결제상세</div>
                <div onClick={goToFeedback}>피드백 확인</div>
                <div onClick={goToWriteReview}>리뷰 작성</div>
            </div>
        </div>
    );
};

export default LessonlistCard;