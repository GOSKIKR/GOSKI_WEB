import React, { useState, useEffect } from "react";
import { TeamMemberDTO } from "../../../dto/TeamMemberDTO";
import { FiMoreHorizontal } from 'react-icons/fi';
import TeamMemberDeleteConfirmModal from "./TeamMemberDeleteConfirmModal";

interface TeamMemberListProps {
    members: TeamMemberDTO[];
}

const TeamMemberList: React.FC<TeamMemberListProps> = ({ members }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
    const [selectedMember, setSelectedMember] = useState<{ name: string; role: string } | null>(null);
    const [expandedMemberIndex, setExpandedMemberIndex] = useState<number | null>(null);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [permissions, setPermissions] = useState<{ [key: string]: { [key: string]: boolean } }>(
        members.reduce((acc, member) => {
            acc[member.name] = {
                invite: false,
                addSchedule: false,
                adjustSchedule: false,
                deleteSchedule: false
            };
            return acc;
        }, {} as { [key: string]: { [key: string]: boolean } })
    );

    const handleIconClick = (event: React.MouseEvent, member: TeamMemberDTO) => {
        event.stopPropagation();
        const rect = event.currentTarget.getBoundingClientRect();
        setModalPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX + rect.width - 20 });
        setSelectedMember(member);
        setModalVisible(true);
    };

    const handleDeleteClick = () => {
        setModalVisible(false);
        setConfirmationModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setConfirmationModalVisible(false);
        setIsEditMode(false);
    };

    const confirmDelete = () => {
        closeModal();
    };

    const toggleExpand = (index: number) => {
        setExpandedMemberIndex(expandedMemberIndex === index ? null : index);
    };

    const togglePermission = (memberName: string, permission: string) => {
        if (isEditMode) {
            setPermissions((prevPermissions) => ({
                ...prevPermissions,
                [memberName]: {
                    ...prevPermissions[memberName],
                    [permission]: !prevPermissions[memberName][permission]
                }
            }));
        }
    };

    useEffect(() => {
        const handleClickOutside = () => {
            setModalVisible(false);
        };

        if (modalVisible) {
            window.addEventListener("click", handleClickOutside);
        }

        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [modalVisible]);

    return (
        <div className="team-member mb-6 bg-primary-50 rounded-lg shadow-lg sm:w-[1200px] w-[350px] mx-auto ">
            <div className="flex justify-between items-center p-6">
                <div className="text-lg font-bold">고승민의 스키교실 <span className="text-black">({members.length}명)</span></div>
                <div className="space-x-2 hidden sm:flex">
                    <button
                        className={`rounded px-4 py-2 ${isEditMode ? 'bg-primary-500' : 'bg-primary-600'} text-white hover:bg-primary-400`}
                        onClick={() => setIsEditMode(!isEditMode)}
                    >
                        {isEditMode ? "수정완료" : "수정하기"}
                    </button>
                    <button className="bg-primary-700 text-white rounded px-4 py-2 hover:bg-primary-500">저장하기</button>
                </div>
            </div>
            <div className="hidden sm:block">
                <table className="min-w-full rounded">
                    <thead className="bg-primary-50">
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
                            <tr key={index} className="border-t bg-primary-50">
                                <td className="py-2 px-4">
                                    <button className="bg-gray-50 text-gray-800 w-[80px] rounded px-2 py-1">
                                        {member.role}
                                    </button>
                                </td>
                                <td className="py-2 px-4 flex justify-center items-center">
                                    <div className="w-8 h-8 bg-gray-50 rounded-full mr-2"></div>
                                    {member.name}
                                </td>
                                <td className="py-2 px-4">{member.price}</td>
                                <td className="py-2 px-4">
                                    <span
                                        className={`${permissions[member.name]?.invite ? 'text-primary-900' : 'text-black'} cursor-pointer ml-1`}
                                        onClick={() => togglePermission(member.name, 'invite')}
                                    >
                                        팀 초대
                                    </span> |
                                    <span
                                        className={`${permissions[member.name]?.addSchedule ? 'text-primary-900' : 'text-black'} cursor-pointer ml-1`}
                                        onClick={() => togglePermission(member.name, 'addSchedule')}
                                    >
                                        팀 스케줄 추가
                                    </span> |
                                    <span
                                        className={`${permissions[member.name]?.adjustSchedule ? 'text-primary-900' : 'text-black'} cursor-pointer ml-1`}
                                        onClick={() => togglePermission(member.name, 'adjustSchedule')}
                                    >
                                        팀 스케줄 조정
                                    </span> |
                                    <span
                                        className={`${permissions[member.name]?.deleteSchedule ? 'text-primary-900' : 'text-black'} cursor-pointer ml-1`}
                                        onClick={() => togglePermission(member.name, 'deleteSchedule')}
                                    >
                                        팀 스케줄 삭제
                                    </span>
                                </td>
                                <td className="py-2 px-4">{member.phoneNumber}</td>
                                <td className="py-2 px-4 cursor-pointer" onClick={(e) => handleIconClick(e, member)}><FiMoreHorizontal /></td>
                                {modalVisible && selectedMember === member && (
                                    <div
                                        className="absolute bg-white border rounded shadow-lg p-4"
                                        style={{ top: modalPosition.top, left: modalPosition.left }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex flex-col space-y-2">
                                            <button className="text-left text-customRed" onClick={handleDeleteClick}>팀원삭제</button>
                                        </div>
                                    </div>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="block sm:hidden w-[300px] mx-auto p-2">
                {members.map((member, index) => (
                    <div key={index} className="bg-white rounded shadow p-4 mb-4">
                        <div className="flex items-center justify-between" onClick={() => toggleExpand(index)}>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-50 rounded-full mr-4"></div>
                                <div>
                                    <div className="text-sm font-bold">{member.role}</div>
                                    <div className="text-sm">{member.name}</div>
                                    <div className="text-sm">{member.phoneNumber}</div>
                                </div>
                            </div>
                        </div>
                        {expandedMemberIndex === index && (
                            <div className="mt-4">
                                <div className="mb-4">
                                    <label className="block text-gray-700">지정 강습 단가 설정</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        placeholder="시간당 추가 강습 단가를 입력해주세요"
                                    />
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <span>팀 초대 권한</span>
                                    <input type="checkbox" className="form-checkbox" />
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <span>팀 추가 권한</span>
                                    <input type="checkbox" className="form-checkbox" />
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <span>팀 조정 권한</span>
                                    <input type="checkbox" className="form-checkbox" />
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <span>팀 삭제 권한</span>
                                    <input type="checkbox" className="form-checkbox" />
                                </div>
                                <button className="bg-primary-500 text-white rounded px-4 py-2 w-full my-2">수정하기</button>
                                <button className="bg-red-500 text-white rounded px-4 py-2 w-full" onClick={() => {
                                    setSelectedMember(member);
                                    setConfirmationModalVisible(true);
                                }}>팀원 강퇴</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {confirmationModalVisible && selectedMember && (
                <TeamMemberDeleteConfirmModal
                    onClose={closeModal}
                    onConfirm={confirmDelete}
                    memberName={selectedMember.name}
                    memberRole={selectedMember.role}
                />
            )}
        </div>
    );
};

export default TeamMemberList;
