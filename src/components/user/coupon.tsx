import React, { useState } from 'react';
import NavbarUser from '../common/NavbarUser';
import UserMypageMenu from './UserMypageMenu';

interface Coupon {
    name: string;
    place: string;
    status: string;
    period: string;
    registrationDate: string;
}

const Coupon: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('전체');

    const dummyData: Coupon[] = [
        { name: '쿠폰 A', place: '사용처 A', status: '사용 전', period: '2024-01-01 ~ 2024-12-31', registrationDate: '2024-01-01' },
        { name: '쿠폰 B', place: '사용처 B', status: '사용 완료', period: '2024-02-01 ~ 2024-11-30', registrationDate: '2024-02-01' },
        { name: '쿠폰 C', place: '사용처 C', status: '사용 전', period: '2024-03-01 ~ 2024-10-31', registrationDate: '2024-03-01' },
    ];

    const renderTableContent = () => {
        const filteredData = dummyData.filter(coupon => {
            if (activeTab === '전체') return true;
            return coupon.status === activeTab;
        });

        return (
            <table className='min-w-full border-collapse border border-gray-300'>
                <thead>
                    <tr>
                        <th className='border border-gray-300 p-2'>쿠폰명</th>
                        <th className='border border-gray-300 p-2'>사용처</th>
                        <th className='border border-gray-300 p-2'>상태</th>
                        <th className='border border-gray-300 p-2'>사용기간</th>
                        <th className='border border-gray-300 p-2'>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((coupon, index) => (
                        <tr key={index}>
                            <td className='border border-gray-300 p-2'>{coupon.name}</td>
                            <td className='border border-gray-300 p-2'>{coupon.place}</td>
                            <td className='border border-gray-300 p-2'>{coupon.status}</td>
                            <td className='border border-gray-300 p-2'>{coupon.period}</td>
                            <td className='border border-gray-300 p-2'>{coupon.registrationDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div>
            <div className='text-xl font-bold flex flex-col'>
                <div className='flex flex-row space-x-4'>
                    <div
                        className={`cursor-pointer ${activeTab === '전체' ? 'text-blue-500' : ''}`}
                        onClick={() => setActiveTab('전체')}
                    >
                        전체
                    </div>
                    <div
                        className={`cursor-pointer ${activeTab === '사용 전' ? 'text-blue-500' : ''}`}
                        onClick={() => setActiveTab('사용 전')}
                    >
                        사용 전
                    </div>
                    <div
                        className={`cursor-pointer ${activeTab === '사용 완료' ? 'text-blue-500' : ''}`}
                        onClick={() => setActiveTab('사용 완료')}
                    >
                        사용 완료
                    </div>
                </div>
                <div className='mt-4'>
                    {renderTableContent()}
                </div>
            </div>
        </div>
    );
};

export default Coupon;
