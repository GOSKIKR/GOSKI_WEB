import React from 'react';
import { AllInstDTO } from '../../../dto/TeamDTO';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    allInstList: AllInstDTO[] | null;
    onInvite: (userId: number) => void;
}

const TeamInviteModal: React.FC<ModalProps> = ({ isOpen, onClose, allInstList, onInvite }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-1/2">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">팀원 리스트</h2>
                    <button onClick={onClose} className="text-red-500">닫기</button>
                </div>
                <div>
                    {allInstList && allInstList.length > 0 ? (
                        <ul>
                            {allInstList.map(inst => (
                                <li key={inst.userId} className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <img src={inst.profileUrl} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                                        <span>{inst.userName}</span>
                                    </div>
                                    <button 
                                        onClick={() => onInvite(inst.userId)} 
                                        className="bg-primary-500 text-white rounded px-2 py-1">
                                        초대
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>초대 가능한 팀원이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamInviteModal;
