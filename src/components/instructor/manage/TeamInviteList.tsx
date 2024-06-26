import React from "react";
import { TeamInviteDTO } from "../../../dto/TeamInviteDTO";

interface TeamInviteListProps {
    inviteMembers : TeamInviteDTO[];
}


const TeamInviteList : React.FC<TeamInviteListProps> = ({inviteMembers}) => {

   
    return (
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
    )
}

export default TeamInviteList