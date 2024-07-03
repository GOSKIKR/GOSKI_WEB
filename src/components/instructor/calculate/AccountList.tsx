import React, { useState } from "react";
import AccountVerifyModal from "./AccountVerifyModal";

const AccountList: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex justify-center relative">
            <div className="flex flex-col items-center max-w-[350px] sm:flex sm:flex-row sm:w-full sm:max-w-[1000px] sm:m-10 ">
                <div className="bg-primary-100 rounded shadow w-[350px] my-5 p-6 sm:w-[450px] sm:h-[300px] sm:mr-[50px] sm:pt-[100px]">
                    <div className="text-center text-lg font-bold">정산 가능 금액</div>
                    <div className="text-center text-3xl font-bold">100,000,000원</div>
                </div>
                <div className="bg-primary-100 rounded shadow w-[350px] my-5 p-6 sm:w-[450px] sm:h-[300px] sm:p-4 sm:ml-[50px]">
                    <div className="mb-4">
                        <div className="text-lg font-bold mb-2">출금 계좌</div>
                        <input 
                            className="bg-white border rounded py-2 px-4 w-full"
                            placeholder="계좌번호를 입력해주세요"
                        />
                    </div>
                    <button 
                        className="bg-primary-500 text-white py-2 px-4 rounded w-full mb-2"
                        onClick={openModal}
                    >
                        계좌 인증하기
                    </button>
                    <div className="mb-4">
                        <div className="text-lg font-bold mb-2">출금 금액</div>
                        <input 
                            className="bg-white border rounded py-2 px-4 w-full"
                            placeholder="출금할 금액을 입력하세요."
                        />
                    </div>
                    <button className="bg-primary-700 text-white py-2 px-4 rounded w-full">정산 신청하기</button>
                </div>
            </div>

            {isModalOpen && <AccountVerifyModal onClose={closeModal} />}
        </div>
    );
}

export default AccountList;
