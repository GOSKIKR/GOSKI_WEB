import React from "react";
import { Link, useLocation } from "react-router-dom";

const TeamManageHeader: React.FC = () => {
    const location = useLocation();
    
    return (
        <div>
            <div className="flex justify-between items-center mt-20">
                <div className="text-left">
                    <span className="text-3xl font-bold ml-[450px]">팀 관리</span>
                </div>
                <div className="text-right mr-[450px]">
                    <Link 
                        to="/instructor/team/regist" 
                        className={`ml-4 cursor-pointer ${location.pathname ==='/instructor/team/regist' ? 'text-primary-700' : 'text-black'}`}>팀 등록</Link>
                    <Link 
                        to="/instructor/team/edit" 
                        className={`ml-4 cursor-pointer ${location.pathname ==='/instructor/team/edit' ? 'text-primary-700' : 'text-black'}`}>팀 정보 수정</Link>
                    <Link 
                        to="/instructor/team/member" 
                        className={`ml-4 cursor-pointer ${location.pathname ==='/instructor/team/member' ? 'text-primary-700' : 'text-black'}`}>팀원 관리</Link>
                    <Link 
                        to="/instructor/team/lessonfee" 
                        className={`ml-4 cursor-pointer ${location.pathname ==='/instructor/team/lessonfee' ? 'text-primary-700' : 'text-black'}`}>강습비 설정</Link>
                </div>
            </div>
        </div>
    );
}

export default TeamManageHeader;
