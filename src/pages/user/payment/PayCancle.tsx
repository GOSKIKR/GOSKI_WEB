import React from 'react';
import { useNavigate } from 'react-router-dom';

const PayCancle = () => {
    const navigate = useNavigate();


    return (
        <div className='flex flex-col w-full h-screen pl-12 items-start'>
            <div className='pt-12 pb-12 font-extrabold text-black text-2xl'>결제 취소</div>
            <div className='flex flex-col bg-primary-50 w-4/5 h-4/6 rounded-lg shadow-md items-center py-12 space-y-10'>
                <div className='flex flex-row bg-white w-4/5 h-2/6 rounded-lg'></div>
                <div className='flex flex-row bg-white w-4/5 h-3/6 rounded-lg'></div>
                <div className='flex items-center justify-center bg-slate-400 w-1/6 h-12 rounded-lg text-white'>예약 취소</div>
            </div>
        </div>
    );
};

export default PayCancle;