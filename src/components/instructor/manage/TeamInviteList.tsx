import React from "react";
import { TeamInviteDTO } from "../../../dto/TeamDTO";

interface TeamInviteListProps {
    inviteMembers: TeamInviteDTO[] | null;
}

const TeamInviteList: React.FC<TeamInviteListProps> = ({ inviteMembers }) => {
    const hasInviteMembers = inviteMembers && inviteMembers.length > 0;

    return (
        <div className="team-member mb-2 bg-primary-50 rounded-lg sm:w-[1200px] w-[350px] mx-auto">
            <div className="flex justify-between items-center px-6 pt-6 pb-2">
                <div className="sm:text-lg text-sm font-bold">팀원 초대하기</div>
                <div className="pl-6 sm:text-lg text-sm font-bold text-primary-500">
                    수락 대기 중 <span className="text-black">({hasInviteMembers ? inviteMembers.length : 0}명)</span>
                </div>
                <div className="space-x-2">
                    <button className="bg-primary-600 text-white rounded px-2 py-2 hover:bg-primary-500">+팀원초대</button>
                </div>
            </div>
            {hasInviteMembers ? (
                <>
                    <div className="hidden sm:block shadow-lg">
                        <table className="min-w-full rounded">
                            <thead className="bg-primary-50">
                                <tr>
                                    <th className="w-1/8 py-2 text-center">강사명</th>
                                    <th className="w-3/8 py-2 text-center">전화번호</th>
                                    <th className="w-2/8 py-2 text-center">신청일</th>
                                </tr>
                            </thead>
                            <tbody className="text-center items-center">
                                {inviteMembers.map((member, index) => (
                                    <tr key={index} className="border-t bg-primary-50">
                                        <td className="py-2 px-4 flex justify-center items-center">
                                            <img 
                                                src={member.profileUrl} 
                                                className="w-8 h-8 bg-gray-50 rounded-full mr-2">
                                            </img>
                                            {member.name}
                                        </td>
                                        <td className="py-2 px-4">{member.phoneNumber}</td>
                                        <td className="py-2 px-4">{member.enrollmentDate}</td>
                                        <td className="py-2 px-4">
                                            <button className="bg-primary-700 text-white rounded px-2 py-1 hover:bg-primary-500">
                                                신청취소
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="block sm:hidden w-[300px] mx-auto p-2">
                        {inviteMembers.map((member, index) => (
                            <div key={index} className="bg-white rounded shadow p-4 mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-gray-100 rounded-full mr-2"></div>
                                        <div className="text-sm font-bold">{member.name}</div>
                                    </div>
                                </div>
                                <div className="text-sm mb-2">
                                    <span className="font-bold">전화번호: </span>{member.phoneNumber}
                                </div>
                                <div className="text-sm mb-2">
                                    <span className="font-bold">신청일: </span>{member.enrollmentDate}
                                </div>
                                <div className="text-right">
                                    <button className="bg-primary-700 text-white rounded w-full px-2 py-1">
                                        신청취소
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center py-6 text-gray-700">
                    팀 초대 수락 대기 인원이 없습니다
                </div>
            )}
        </div>
    );
};

export default TeamInviteList;
