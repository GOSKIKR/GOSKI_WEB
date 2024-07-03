import React from "react";
import { Link, useLocation } from "react-router-dom";

const MyPageHeader : React.FC = () => {
    const location = useLocation();

    return(
        <div className="flex justify-center">
            <div className="sm:flex sm:justify-between sm:w-[800px] sm:mt-20 w-[400px] mt-10">
                <div className="sm:text-2xl text-xl text-center font-bold">마이페이지</div>
                <div className="text-center">
                    <Link 
                        to="/instructor/edit-info" 
                        className={`ml-4 cursor-pointer ${location.pathname ==='/instructor/edit-info' ? 'text-primary-700' : 'text-black'}`}>프로필 수정</Link>
                    <Link 
                        to="/instructor/edit-cert" 
                        className={`ml-4 cursor-pointer ${location.pathname ==='/instructor/edit-cert' ? 'text-primary-700' : 'text-black'}`}>자격증 관리</Link>
                </div>
            </div>
        </div>
    )
}

export default MyPageHeader;