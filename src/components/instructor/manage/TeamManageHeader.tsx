import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useLoginStore from "../../../store/loginStore";

const TeamManageHeader: React.FC = () => {
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 640);

    const {role} = useLoginStore();

    const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 640);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        if (isDropdownOpen) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [isDropdownOpen]);

    return (
        <div className="flex justify-center items-center">
            <div className="sm:flex sm:flex-row sm:justify-between sm:w-[600px] sm:items-center w-[200px] sm:mt-20 mt-10 flex flex-col items-center">
                <div className="sm:text-center text-center mb-2 sm:mb-0">
                    <span className="sm:text-xl font-bold">팀 관리</span>
                </div>
                {isSmallScreen ? (
                    <div className="relative">
                        <div 
                            onClick={toggleDropdown} 
                            className="flex justify-center items-center bg-primary-50 text-black px-6 py-2 rounded-lg shadow-lg w-[250px]">
                            팀 관리 메뉴 {isDropdownOpen ? '▲' : '▼'}
                        </div>
                        {isDropdownOpen && (
                            <div className="absolute left-0 right-0 mt-2 bg-primary-50 border rounded shadow-lg z-10">
                                {role === "OWNER" && (
                                <Link
                                    to="/instructor/team/regist"
                                    className={`block px-4 py-2 text-center ${location.pathname === '/instructor/team/regist' ? 'text-primary-700' : 'text-black'}`}
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    팀 등록
                                </Link>
                                )}
                                <Link
                                    to="/instructor/team/edit"
                                    className={`block px-4 py-2 text-center ${location.pathname === '/instructor/team/edit' ? 'text-primary-700' : 'text-black'}`}
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    팀 정보 수정
                                </Link>
                                <Link
                                    to="/instructor/team/member"
                                    className={`block px-4 py-2 text-center ${location.pathname === '/instructor/team/member' ? 'text-primary-700' : 'text-black'}`}
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    팀원 관리
                                </Link>
                                <Link
                                    to="/instructor/team/lessonfee"
                                    className={`block px-4 py-2 text-center ${location.pathname === '/instructor/team/lessonfee' ? 'text-primary-700' : 'text-black'}`}
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    강습비 설정
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="sm:flex sm:flex-row sm:text-right text-center flex flex-col items-center">
                        <div className="flex sm:flex-row flex-col">
                            <Link 
                                to="/instructor/team/regist" 
                                className={`sm:ml-1 mb-2 sm:mb-0 cursor-pointer ${location.pathname ==='/instructor/team/regist' ? 'text-primary-700' : 'text-black'}`}
                            >
                                팀 등록 |
                            </Link>
                            <Link 
                                to="/instructor/team/edit" 
                                className={`sm:ml-1 mb-2 sm:mb-0 cursor-pointer ${location.pathname ==='/instructor/team/edit' ? 'text-primary-700' : 'text-black'}`}
                            >
                                팀 정보 수정 |
                            </Link>
                        </div>
                        <div className="flex sm:flex-row flex-col">
                            <Link 
                                to="/instructor/team/member" 
                                className={`sm:ml-1 mb-2 sm:mb-0 cursor-pointer ${location.pathname ==='/instructor/team/member' ? 'text-primary-700' : 'text-black'}`}
                            >
                                팀원 관리 | 
                            </Link>
                            <Link 
                                to="/instructor/team/lessonfee" 
                                className={`sm:ml-1 cursor-pointer ${location.pathname ==='/instructor/team/lessonfee' ? 'text-primary-700' : 'text-black'}`}
                            >
                                강습비 설정
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TeamManageHeader;
