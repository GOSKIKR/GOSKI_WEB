import React from "react";
import { Link, useLocation } from "react-router-dom";

const TeamManageHeader: React.FC = () => {
    const location = useLocation();
    
    return (
        <div className="flex justify-center">
            <div className="sm:flex sm:flex-row sm:justify-between sm:w-[600px] w-[200px] sm:mt-20 mt-10 flex flex-col items-center">
                <div className="sm:text-left text-center mb-5">
                    <span className="sm:text-3xl text-2xl font-bold">팀 관리</span>
                </div>
                <div className="sm:flex sm:flex-row sm:text-right text-center flex flex-col items-center">
                    <div className="flex sm:flex-row flex-col">
                        <Link 
                            to="/instructor/team/regist" 
                            className={`sm:ml-4 mb-2 sm:mb-0 cursor-pointer ${location.pathname ==='/instructor/team/regist' ? 'text-primary-700' : 'text-black'}`}
                        >
                            팀 등록
                        </Link>
                        <Link 
                            to="/instructor/team/edit" 
                            className={`sm:ml-4 mb-2 sm:mb-0 cursor-pointer ${location.pathname ==='/instructor/team/edit' ? 'text-primary-700' : 'text-black'}`}
                        >
                            팀 정보 수정
                        </Link>
                    </div>
                    <div className="flex sm:flex-row flex-col">
                        <Link 
                            to="/instructor/team/member" 
                            className={`sm:ml-4 mb-2 sm:mb-0 cursor-pointer ${location.pathname ==='/instructor/team/member' ? 'text-primary-700' : 'text-black'}`}
                        >
                            팀원 관리
                        </Link>
                        <Link 
                            to="/instructor/team/lessonfee" 
                            className={`sm:ml-4 cursor-pointer ${location.pathname ==='/instructor/team/lessonfee' ? 'text-primary-700' : 'text-black'}`}
                        >
                            강습비 설정
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamManageHeader;
