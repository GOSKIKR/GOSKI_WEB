import React from "react";

interface TeamMemberDeleteModalProps {
    onClose: () => void;
    onConfirm: () => void;
    memberName: string;
    memberRole: number;
    profileUrl : string;
    getRole: (position : number) => string
}

const TeamMemberDeleteConfirmModal: React.FC<TeamMemberDeleteModalProps> = ({ 
        onClose, onConfirm, memberName, memberRole, profileUrl, getRole 
        }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-primary-100 rounded-lg p-6 sm:w-[400px] w-[350px] text-center" onClick={(e) => e.stopPropagation()}>
                <div className="text-lg font-bold mb-4">강퇴 확인</div>
                <div className="mb-4">
                    <img src={profileUrl} className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></img>
                    <div>{memberName}</div>
                    <div>{getRole(memberRole)}</div>
                </div>
                <div className="mb-4">해당 강사를 팀에서 제명하시겠습니까?</div>
                <div className="flex justify-center mt-4">
                    <button className="bg-gray-300 text-black rounded px-4 py-2 mr-4" onClick={onClose}>취소</button>
                    <button className="bg-primary-700 text-white rounded px-4 py-2" onClick={onConfirm}>강퇴</button>
                </div>
            </div>
        </div>
    );
};

export default TeamMemberDeleteConfirmModal;
