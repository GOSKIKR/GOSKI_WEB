import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LessonInformation = () => {

    const navigate = useNavigate();

    const goToPay = () => {
        navigate(`/user/payment/before`);
    }

    return (
        <div>
            <div className='py-12 pl-12'>예약하기</div>
            <div className='flex flex-row px-12 space-x-6'>
                <div className='w-7/12 h-96 bg-primary-50 rounded-lg shadow-md'>
                    <div className='px-6 py-6 text-lg font-bold'>팀 소개</div>
                </div>
                <div className='flex flex-col px-6 py-6 space-y-2 w-3/12 h-60 bg-primary-50 rounded-lg shadow-md'>
                    <div>최종 결제금액</div>
                    <div>기존 강습비</div>
                    <div>레벨 옵션비</div>
                    <div>총 결제금액</div>
                    <div onClick={goToPay} className='h-12 bg-white rounded-lg shadow-md text-black text-center'>예약하기</div>
                </div>
            </div>
        </div>
    );
};

export default LessonInformation;