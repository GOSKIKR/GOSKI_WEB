import React, { useState } from 'react';
import { AllInstDTO, TeamInviteDTO } from '../../../dto/TeamDTO';
import { TeamService } from '../../../api/TeamService';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    allInstList: AllInstDTO[] | null;
    setInviteMembers:(inviteInfo: TeamInviteDTO[]) => void;
    teamId : number;
}

const teamService = new TeamService();

const TeamInviteModal: React.FC<ModalProps> = ({ isOpen, onClose, allInstList, setInviteMembers, teamId }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedInstructor, setSelectedInstructor] = useState<AllInstDTO | null>(null);
    const itemsPerPage = 5;
    const pageNumberLimit = 5;
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(pageNumberLimit);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    if (!isOpen) return null;

    const totalPages = allInstList ? Math.ceil(allInstList.length / itemsPerPage) : 1;

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleNextbtn = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            if (currentPage + 1 > maxPageNumberLimit) {
                setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
                setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
            }
        }
    };

    const handlePrevbtn = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            if ((currentPage - 1) % pageNumberLimit === 0) {
                setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
                setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
            }
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i < maxPageNumberLimit + 1 && i > minPageNumberLimit) {
                pageNumbers.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`px-3 py-1 mx-1 rounded ${currentPage === i ? 'bg-primary-500 text-white' : 'bg-white text-primary-500'}`}
                    >
                        {i}
                    </button>
                );
            }
        }
        return (
            <div className="flex justify-center">
                <button
                    onClick={handlePrevbtn}
                    className={`px-3 py-1 mx-1 rounded bg-white text-primary-500 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                {pageNumbers}
                <button
                    onClick={handleNextbtn}
                    className={`px-3 py-1 mx-1 rounded bg-white text-primary-500 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </div>
        );
    };

    const inviteInst = async (teamId : number ,userId : number) => {
        const data = {
            "teamId" : teamId,
            "receiverId" : userId
        }

        await teamService.InviteInstructor(data);
        const newList = await teamService.getPendingApprovalList(teamId);
        if(newList){
            setInviteMembers(newList);
        }

    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allInstList ? allInstList.slice(indexOfFirstItem, indexOfLastItem) : [];

    const handleInviteClick = (instructor: AllInstDTO) => {
        setSelectedInstructor(instructor);
    };

    const handleCloseDetailModal = () => {
        setSelectedInstructor(null);
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg p-6 w-[300px] h-[350px] flex flex-col relative">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-center">팀원 초대</h2>
                        <button onClick={onClose} className="text-red-500">닫기</button>
                    </div>
                    <div className="flex-grow overflow-y-auto">
                        {currentItems && currentItems.length > 0 ? (
                            <ul>
                                {currentItems.map(inst => (
                                    <li key={inst.userId} className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <img src={inst.profileUrl} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                                            <span>{inst.userName}</span>
                                        </div>
                                        <button 
                                            onClick={() => handleInviteClick(inst)} 
                                            className="bg-primary-900 text-white rounded px-2 py-1">
                                            상세보기
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>초대 가능한 팀원이 없습니다.</p>
                        )}
                    </div>
                    <div className="flex justify-center mt-4 w-full">
                        {renderPageNumbers()}
                    </div>
                </div>
            </div>
            {selectedInstructor && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 w-[350px] h-[500px] flex flex-col relative">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">강사 정보</h2>
                            <button onClick={handleCloseDetailModal} className="text-red-500">닫기</button>
                        </div>
                        <div className="overflow-y-auto">
                            <div className="flex justify-center">
                                <img src={selectedInstructor.profileUrl} alt="Profile" className="rounded-full mb-4" />
                            </div>
                            <p><strong>이름:</strong> {selectedInstructor.userName}</p>
                            <p><strong>성별 : </strong> {selectedInstructor.gender === "MALE" ? "남성" : "여성"}</p>
                            <p><strong>전화번호:</strong> {selectedInstructor.phoneNumber}</p>
                            <p><strong>강사 소개</strong></p>
                            <p> {selectedInstructor.description}</p>
                        </div>
                        <div className="mt-4">
                            <button 
                                onClick={() => {
                                    inviteInst(teamId,selectedInstructor.userId);
                                    handleCloseDetailModal();
                                    onClose();
                                }} 
                                className="bg-primary-800 text-white rounded px-4 py-2 w-full">
                                초대
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TeamInviteModal;
