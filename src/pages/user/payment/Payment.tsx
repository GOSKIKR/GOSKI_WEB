import React from 'react';

const Payment = () => {
        return (
        <div>
            결제하기
            <div className='flex flex-row space-x-5'>
                <div className='w-3/5 space-y-5'> 
                    <div className='bg-primary-50 h-20 rounded-lg shadow-md'>강습예약정보</div>
                    <div className='bg-primary-50 h-20 rounded-lg shadow-md'>예약자정보</div>
                    <div className='bg-primary-50 h-20 rounded-lg shadow-md'>강습인원정보</div>
                </div>
                <div className='w-2/5 space-y-5'> 
                    <div className='bg-primary-50 h-20 rounded-lg shadow-md'>최종결제금액</div>
                    <div className='bg-primary-50 h-20 rounded-lg shadow-md'>약관동의</div>
                    <div className='bg-primary-50 h-20 rounded-lg shadow-md'>결제</div>
                    <div className='bg-primary-500 h-16 rounded-lg shadow-md text-white'>예약하기</div>
                </div>
            </div>
        </div>
    );
};

export default Payment;