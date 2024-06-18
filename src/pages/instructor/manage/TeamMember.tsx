import React from "react";
import TeamManageHeader from "../../../components/instructor/TeamManageHeader";
import DropdownMenu from "../../../components/instructor/TeamListDropdown";
import { TeamMemberDTO } from "../../../dto/TeamMemberDTO";
import { TeamInviteDTO } from "../../../dto/TeamInviteDTO";

// Member 인터페이스 정의


const TeamMember: React.FC = () => {
    const members: TeamMemberDTO[] = [
        { role: "교육팀장", name: "고승민", price: "+100,000원", phoneNumber: "010-9995-5107" },
        { role: "팀장", name: "유제훈", price: "+100,000원", phoneNumber: "010-9995-5107" },
        { role: "강사", name: "송준석", price: "+100,000원", phoneNumber: "010-9995-5107" },
        { role: "강사", name: "임종율", price: "+100,000원", phoneNumber: "010-9995-5107" },
        { role: "강사", name: "김태훈", price: "+100,000원", phoneNumber: "010-9995-5107" },
    ];
    
    const inviteMembers : TeamInviteDTO[] = [
        { name: "장승호",  phoneNumber: "010-9995-5107",enrollDate : "2024-06-18" },
        { name: "김승호",  phoneNumber: "010-9995-5107" ,enrollDate : "2024-06-18" },
    ]

    return (
        <div>
            <TeamManageHeader />
            <div className="flex justify-center">
                <div className="p-6">
                    <DropdownMenu />
                    <div className="team-member mb-6 bg-primary-100 rounded-lg w-[1200px]">
                        <div className="flex justify-between items-center p-6">
                            <div className="text-lg font-bold">고승민의 스키교실 (5명)</div>
                            <div className="space-x-2">
                                <button className="bg-primary-500 text-white rounded px-4 py-2">수정하기</button>
                                <button className="bg-primary-700 text-white rounded px-4 py-2">저장하기</button>
                            </div>
                        </div>
                        <table className="min-w-full rounded">
                            <thead className="bg-primary-100">
                                <tr>
                                    <th className="w-1/8 py-2 text-center">직책</th>
                                    <th className="w-1/8 py-2 text-center">강사 프로필</th>
                                    <th className="w-1/8 py-2 text-center">지정 단가</th>
                                    <th className="w-2/8 py-2 text-center">권한</th>
                                    <th className="w-3/8 py-2 text-center">전화번호</th>
                                </tr>
                            </thead>
                            <tbody className="text-center items-center">
                                {members.map((member, index) => (
                                    <tr key={index} className="border-t bg-primary-100">
                                        <td className="py-2 px-4">
                                            <button className="bg-gray-100 text-gray-800 rounded px-2 py-1">
                                                {member.role}
                                            </button>
                                        </td>
                                        <td className="py-2 px-4 flex justify-center items-center">
                                            <div className="w-8 h-8 bg-gray-100 rounded-full mr-2"></div>
                                            {member.name}
                                        </td>
                                        <td className="py-2 px-4">{member.price}</td>
                                        <td className="py-2 px-4">
                                            <span className="text-primary-900 cursor-pointer">팀 초대</span> | 
                                            <span className="text-primary-900 cursor-pointer"> 팀 스케줄 추가</span> | 
                                            <span className="text-black cursor-pointer"> 팀 스케줄 조정</span> | 
                                            <span className="text-black cursor-pointer"> 팀 스케줄 삭제</span>
                                        </td>
                                        <td className="py-2 px-4">{member.phoneNumber}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="team-member mb-2 bg-primary-100 rounded-lg w-[1200px]">
                        <div className="flex justify-between items-center px-6 pt-6 pb-2">
                            <div className="text-lg font-bold">팀원 초대하기</div>
                            <div className="space-x-2">
                                <button className="bg-primary-600 text-white rounded px-4 py-2">+팀원초대</button>
                            </div>
                        </div>
                        <div className="pl-6 text-lg font-bold text-primary-500">
                            수락 대기 중 <span className="text-black">({inviteMembers.length}명)</span>
                        </div>
                        <table className="min-w-full rounded">
                            <thead className="bg-primary-100">
                                <tr>
                                    <th className="w-1/8 py-2 text-center">강사명</th>
                                    <th className="w-3/8 py-2 text-center">전화번호</th>
                                    <th className="w-2/8 py-2 text-center">신청일</th>
                                    <th className="w-2/8 py-2 text-center">신청취소</th>
                                </tr>
                            </thead>
                            <tbody className="text-center items-center">
                                {inviteMembers.map((member, index) => (
                                    <tr key={index} className="border-t bg-primary-100">
                                        <td className="py-2 px-4 flex justify-center items-center">
                                            <div className="w-8 h-8 bg-gray-100 rounded-full mr-2"></div>
                                            {member.name}
                                        </td>
                                        <td className="py-2 px-4">{member.phoneNumber}</td>
                                        <td className="py-2 px-4">{member.enrollDate}</td>
                                        <td className="py-2 px-4">
                                            <button className="bg-primary-700 text-white rounded px-2 py-1">
                                                신청취소
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamMember;
