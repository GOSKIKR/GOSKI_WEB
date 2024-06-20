import React from "react";
import TeamManageHeader from "../../../components/instructor/manage/TeamManageHeader";
import Editor from "../../../components/common/Editor";
import DropdownMenu from "../../../components/instructor/manage/TeamListDropdown";
import NavbarInstructor from "../../../components/common/NavbarInstructor";

const TeamInfoEdit : React.FC = () => {


    return (
        <div>
            <NavbarInstructor/>
            <TeamManageHeader/>
            <div className="flex justify-center">
                <div className="p-6">
                    <DropdownMenu/>
                    <div className="team-profile-image mb-6 bg-primary-100 rounded-lg w-[600px] h-[350px]">
                        <div className="text-lg font-bold p-6">팀 프로필 사진</div>
                        <div className = "flex items-center justify-center">
                            <div className="inner bg-white p-3 rounded-lg text-center w-[200px]">
                                <div className="w-40 h-40 bg-primary-100 mx-auto flex items-center justify-center text-gray-500 rounded mb-4">
                                    팀 프로필 사진
                                </div>
                                <button className="bg-primary-500 text-white px-4 py-2 rounded">
                                    사진 수정
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="team-intro mb-6 bg-primary-100 rounded-lg">
                        <div className="flex justify-between items-center p-6">
                            <div className="text-lg font-bold text-center align-middle">팀 소개글</div>
                            <button className="bg-primary-500 text-white rounded px-4 py-2">수정하기</button>
                        </div>
                        <div className="px-6 pb-6">
                            <Editor/>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-primary-700 text-white m-2 px-4 py-2 rounded">
                            수정완료
                        </button>
                        <button className="bg-primary-900 text-white m-2 px-4 py-2 rounded">
                            돌아가기
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default TeamInfoEdit;