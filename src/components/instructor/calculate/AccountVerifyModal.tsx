import React from "react";

interface AccountVerifyModalProps {
    onClose: () => void;
    selectedBank: string;
    accountNumber: string;
}

const AccountVerifyModal: React.FC<AccountVerifyModalProps> = ({ onClose, selectedBank, accountNumber }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
                <h2 className="text-xl font-bold mb-4 text-center">계좌 정보 입력</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        value={selectedBank}
                        className="w-full p-2 border rounded mb-2"
                        disabled
                    />
                    <input
                        type="text"
                        value={accountNumber}
                        className="w-full p-2 border rounded mb-2"
                        disabled
                    />
                    <input
                        type="text"
                        placeholder="예금주명을 입력해주세요"
                        className="w-full p-2 border rounded mb-2"
                    />
                </div>
                <div className="flex justify-end">
                    <button className="bg-primary-500 text-white py-2 px-4 mr-2 rounded" onClick={onClose}>인증하기</button>
                    <button className="bg-gray-500 text-white py-2 px-4 rounded" onClick={onClose}>돌아가기</button>
                </div>
            </div>
        </div>
    );
};

export default AccountVerifyModal;
