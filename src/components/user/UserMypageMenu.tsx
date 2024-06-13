import React from 'react';

interface UserMypageMenuProps {
    activePage: string;
    setActivePage: (page: string) => void;
}

const UserMypageMenu: React.FC<UserMypageMenuProps> = ({ activePage, setActivePage }) => {
    const getMenuItemClass = (page: string) => {
        return activePage === page ? 'text-blue-500 font-bold' : 'text-black';
    };

    return (
        <div className='flex flex-row space-x-4 py-6'>
            <div className={`cursor-pointer text-black text-xl font-bold`} onClick={() => setActivePage('lessonHistory')}>마이페이지</div>
            <div className={`cursor-pointer ${getMenuItemClass('lessonHistory')}`} onClick={() => setActivePage('lessonHistory')}>강습 내역</div>
            <div className={`cursor-pointer ${getMenuItemClass('coupon')}`} onClick={() => setActivePage('coupon')}>쿠폰함</div>
            <div className={`cursor-pointer ${getMenuItemClass('modify')}`} onClick={() => setActivePage('modify')}>개인정보 수정</div>
        </div>
    );
};

export default UserMypageMenu;
