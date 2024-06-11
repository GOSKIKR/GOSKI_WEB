import React, { useState } from 'react';
import SelectInstructor from '../../../components/user/SelectInstructor';
import { useNavigate } from 'react-router-dom';

const BeforePay = () => {
    const navigate = useNavigate();
    const [view, setView] = useState(false);

    const goToPay = () => {
        navigate(`/user/payment`);
    }
    
    return (
        <div className='flex flex-col justify-center place-content-center space-y-5'>
            <div className='w-9/12'>결제 금액을 확인해주세요</div>
            <div className='w-9/12 h-11 bg-primary-50 rounded-lg shadow-md'>
                <div onClick={() => {setView(!view)}}>
                    지정 강사 선택하기 (추가 요금)
                    {view ? '^' : '⌄'}
                </div>
            </div>
            {view && <SelectInstructor/>}
            <div className='w-9/12 h-32 bg-primary-50 rounded-lg shadow-md'>
                최종 결제 금액
                <div onClick={goToPay} className='w-16 h-6 bg-primary-500 rounded-lg text-white'>결제하기</div>
            </div>
        </div>
    );
};

export default BeforePay;