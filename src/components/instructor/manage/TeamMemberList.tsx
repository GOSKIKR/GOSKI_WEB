import React, { useState, useEffect } from "react";
import { TeamInstInfoDTO, TeamInstUpdateRequestDTO } from "../../../dto/TeamDTO";
import { FiMoreHorizontal } from 'react-icons/fi';
import TeamMemberDeleteConfirmModal from "./TeamMemberDeleteConfirmModal";
import { TeamService } from "../../../api/TeamService";

interface TeamMemberListProps {
    members: TeamInstInfoDTO[];
    setMembers: (members: TeamInstInfoDTO[]) => void;
}

const teamService = new TeamService();

const TeamMemberList: React.FC<TeamMemberListProps> = ({ members, setMembers }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
    const [selectedMember, setSelectedMember] = useState<TeamInstInfoDTO | null>(null);
    const [expandedMemberIndex, setExpandedMemberIndex] = useState<number | null>(null);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    const handleIconClick = (event: React.MouseEvent, member: TeamInstInfoDTO) => {
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
        if (selectedMember) {
            setMembers(members.filter(member => member.userId !== selectedMember.userId));
        }
        closeModal();
    };

    const toggleExpand = (index: number) => {
        setExpandedMemberIndex(expandedMemberIndex === index ? null : index);
    };

    const togglePermission = (userId: number, permission: keyof TeamInstInfoDTO) => {
        if (isEditMode) {
            setMembers(members.map(member =>
                member.userId === userId ? { ...member, [permission]: !member[permission] } : member
            ));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, userId: number) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setMembers(members.map(member =>
                member.userId === userId ? { ...member, designatedFee: Number(value) } : member
            ));
        }
    };

    const fetchUpdate = async () => {
        if (selectedMember && !isEditMode) {
            const updatedInfo: TeamInstUpdateRequestDTO = {
                teamId: selectedMember.teamId,
                instructorId: selectedMember.userId,
                invitePermission: selectedMember.invitePermission,
                addPermission: selectedMember.addPermission,
                modifyPermission: selectedMember.modifyPermission,
                deletePermission: selectedMember.deletePermission,
                costPermission: selectedMember.costPermission,
                position: selectedMember.position,
                designatedCost: selectedMember.designatedFee
            };
            console.log(updatedInfo);
            await teamService.updateTeamInstructorInfo(updatedInfo);
        }
    };

    const getRole = (position: number): string => {
        switch (position) {
            case 1:
                return "교육팀장";
            case 2:
                return "팀장";
            case 3:
                return "강사";
            default:
                return "팀원";
        }
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMembers = members.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(members.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`mb-2 px-3 py-1 mx-1 rounded ${currentPage === i ? 'bg-primary-500 text-white' : 'bg-white text-primary-500'}`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
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
        <div className="team-member mb-6 bg-primary-50 rounded-lg shadow-lg sm:w-[1200px] w-[350px] sm:h-[500px] mx-auto">
            <div className="flex justify-between items-center p-6">
                <div className="text-lg font-bold"> <span className="text-black">({members.length}명)</span></div>
                <div className="space-x-2 sm:flex">
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
                        {currentMembers.map((member, index) => (
                            <tr key={index} className="border-t bg-primary-50">
                                <td className="py-2 px-4">
                                    <button className="bg-gray-50 text-gray-800 w-[80px] rounded px-2 py-1">
                                        {getRole(member.position)}
                                    </button>
                                </td>
                                <td className="py-2 px-4 flex justify-center items-center">
                                    <img src={member.profileUrl} className="w-8 h-8 bg-gray-50 rounded-full mr-2" alt="Profile">
                                    </img>
                                    {member.userName}
                                </td>
                                <td className="py-2 px-4">
                                    <input
                                        type="text"
                                        className="px-3 py-2 bg-gray-200 rounded text-center w-full"
                                        value={member.designatedFee}
                                        readOnly={!isEditMode}
                                        onChange={(e) => handleInputChange(e, member.userId)}
                                    />
                                </td>
                                <td className="py-2 px-4">
                                    <span
                                        className={`${member.invitePermission ? 'text-primary-900 font-bold' : 'text-black'} cursor-pointer ml-1`}
                                        onClick={() => togglePermission(member.userId, 'invitePermission')}
                                    >
                                        강사 초대
                                    </span> |
                                    <span
                                        className={`${member.addPermission ? 'text-primary-900 font-bold' : 'text-black'} cursor-pointer ml-1`}
                                        onClick={() => togglePermission(member.userId, 'addPermission')}
                                    >
                                        스케줄 추가
                                    </span> |
                                    <span
                                        className={`${member.modifyPermission ? 'text-primary-900 font-bold' : 'text-black'} cursor-pointer ml-1`}
                                        onClick={() => togglePermission(member.userId, 'modifyPermission')}
                                    >
                                        스케줄 조정
                                    </span> |
                                    <span
                                        className={`${member.deletePermission ? 'text-primary-900 font-bold' : 'text-black'} cursor-pointer ml-1`}
                                        onClick={() => togglePermission(member.userId, 'deletePermission')}
                                    >
                                        스케줄 삭제
                                    </span> |
                                    <span
                                        className={`${member.costPermission ? 'text-primary-900 font-bold' : 'text-black'} cursor-pointer ml-1`}
                                        onClick={() => togglePermission(member.userId, 'costPermission')}
                                    >
                                        강습 단가 지정
                                    </span>
                                </td>
                                <td className="py-2 px-4">{member.phoneNumber}</td>
                                <td className="py-2 px-4 cursor-pointer" onClick={(e) => handleIconClick(e, member)}><FiMoreHorizontal /></td>
                                {modalVisible && selectedMember === member && (
                                    <div
                                        className="absolute bg-white border rounded shadow-lg p-3"
                                        style={{ top: modalPosition.top, left: modalPosition.left }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex flex-col space-y-2 border-b">
                                            <button className="text-left text-primary-800" onClick={fetchUpdate}>수정하기</button>
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <button className="text-left text-customRed" onClick={handleDeleteClick}>팀원삭제</button>
                                        </div>
                                    </div>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center mt-4">
                    {renderPageNumbers()}
                </div>
            </div>
            <div className="block sm:hidden w-[300px] mx-auto p-2">
                {currentMembers.map((member, index) => (
                    <div key={index} className="bg-white rounded shadow p-4 mb-4">
                        <div className="flex items-center justify-between" onClick={() => toggleExpand(index)}>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-50 rounded-full mr-4"></div>
                                <div>
                                    <div className="text-sm font-bold border-b">{getRole(member.position)}</div>
                                    <div className="text-sm">{member.userName}</div>
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
                                        value={member.designatedFee}
                                        readOnly={!isEditMode}
                                        onChange={(e) => handleInputChange(e, member.userId)}
                                    />
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <span>강사 초대</span>
                                    <input type="checkbox" className="form-checkbox" checked={member.invitePermission} onChange={() => togglePermission(member.userId, 'invitePermission')} />
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <span>스케줄 추가</span>
                                    <input type="checkbox" className="form-checkbox" checked={member.addPermission} onChange={() => togglePermission(member.userId, 'addPermission')} />
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <span>스케줄 조정</span>
                                    <input type="checkbox" className="form-checkbox" checked={member.modifyPermission} onChange={() => togglePermission(member.userId, 'modifyPermission')} />
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <span>스케줄 삭제</span>
                                    <input type="checkbox" className="form-checkbox" checked={member.deletePermission} onChange={() => togglePermission(member.userId, 'deletePermission')} />
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <span>강습 단가 지정</span>
                                    <input type="checkbox" className="form-checkbox" checked={member.costPermission} onChange={() => togglePermission(member.userId, 'costPermission')} />
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
                <div className="flex justify-center mt-4">
                    {renderPageNumbers()}
                </div>
            </div>
            {confirmationModalVisible && selectedMember && (
                <TeamMemberDeleteConfirmModal
                    onClose={closeModal}
                    onConfirm={confirmDelete}
                    memberName={selectedMember.userName}
                    memberRole={selectedMember.position}
                    profileUrl={selectedMember.profileUrl}
                    getRole={getRole}
                />
            )}
        </div>
    );
};

export default TeamMemberList;
