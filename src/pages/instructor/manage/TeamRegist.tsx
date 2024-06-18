import React from "react";
import Editor from "../../../components/common/Editor";
import TeamManageHeader from "../../../components/instructor/TeamManageHeader";

const TeamRegist : React.FC = () => {


    return (
        <div>
            <TeamManageHeader/>
            <div className="flex justify-center mt-10"> 
                <div className="p-6">
                    <div className="team-profile-image mb-6 bg-primary-100 rounded-lg w-[600px] h-[350px]">
                        <div className="text-lg font-bold p-6">팀 프로필 사진</div>
                        <div className = "flex items-center justify-center">
                            <div className="inner bg-white p-3 rounded-lg text-center w-[200px]">
                                <div className="w-40 h-40 bg-primary-100 mx-auto flex items-center justify-center text-gray-500 rounded mb-4">
                                    팀 프로필 사진
                                </div>
                                <button className="bg-primary-500 text-white px-4 py-2 rounded">
                                    사진 찾기
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="team-intro mb-6 bg-primary-100 rounded-lg">
                        <div className="flex justify-between items-center p-6">
                            <div className="text-lg font-bold text-center align-middle">팀 소개글</div>
                            <button className="bg-primary-500 text-white rounded px-4 py-2">업로드</button>
                        </div>
                        <div className="px-6 pb-6">
                            <Editor/>
                        </div>
                    </div>
                    <div className="team-member mb-6 bg-primary-100 rounded-lg">
                        <div className="flex justify-between items-center p-6">
                            <div className="text-lg font-bold text-center align-middle">팀원 정보</div>
                            <button className="bg-primary-500 text-white rounded px-4 py-2">추가하기</button>
                        </div>
                        <div className="">

                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-primary-700 text-white m-2 px-4 py-2 rounded">
                            팀 등록
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

export default TeamRegist;