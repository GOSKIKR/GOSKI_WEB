import React from "react";

interface AccountVerifyModalProps {
    onClose: () => void;
}

const AccountVerifyModal: React.FC<AccountVerifyModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
                <h2 className="text-xl font-bold mb-4 text-center">계좌 정보 입력</h2>
                <div className="mb-4">
                    <select className="w-full p-2 border rounded mb-2">
                        <option value="">은행을 선택해주세요</option>
                        <option value="kookmin">국민은행</option>
                        <option value="shinhan">신한은행</option>
                        <option value="woori">우리은행</option>
                        <option value="hana">하나은행</option>
                    </select>
                    <input
                        type="text"
                        placeholder="예금주명을 입력해주세요"
                        className="w-full p-2 border rounded mb-2"
                    />
                    <input
                        type="text"
                        placeholder="계좌번호를 입력해주세요"
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
}

export default AccountVerifyModal;
