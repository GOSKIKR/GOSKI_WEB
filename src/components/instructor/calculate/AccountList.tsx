import React, { useState } from "react";
import { useEffect } from "react";
import AccountVerifyModal from "./AccountVerifyModal";
import { bankCodes } from "../../../utils/bankCodes";
import { PaymentService } from "../../../api/PaymentService";

const paymentService = new PaymentService();

const AccountList: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [balance, setBalance] = useState<number>(0)
    const [selectedBank, setSelectedBank] = useState("");
    const [selectedBankCode, setSelectedBankCode] = useState<string>("");
    const [accountNumber, setAccountNumber] = useState("");
    const [isSettleAvailable, setIsSettleAvailable] = useState<boolean>(false)

    const openModal = () => {
        if (selectedBank && accountNumber) {
            setIsModalOpen(true);
        } else {
            alert("은행과 계좌번호를 입력해주세요.");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleBankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const bankName = e.target.value;
        setSelectedBank(bankName);
        setSelectedBankCode(bankCodes[bankName]);
    };

    useEffect( () => {
        const fetchBalance = async() => {
            const balance = await paymentService.getSettlementAmount();
            if(balance){
                setBalance(balance)
            }
        }
        fetchBalance();
    })

    return (
        <div className="flex justify-center relative">
            <div className="flex flex-col items-center max-w-[350px] sm:flex sm:flex-row sm:w-full sm:max-w-[1000px] sm:m-10 ">
                <div className="bg-primary-100 rounded shadow w-[350px] my-5 p-6 sm:w-[450px] sm:h-[390px] sm:mr-[50px] sm:pt-[170px]">
                    <div className="text-center text-lg font-bold">정산 가능 금액</div>
                    <div className="text-center text-3xl font-bold">{balance}원</div>
                </div>
                <div className="bg-primary-100 rounded shadow w-[350px] my-3 p-6 sm:w-[450px] sm:p-4 sm:ml-[50px]">
                    <div className="mb-4">
                        <div className="text-lg font-bold mb-2">은행 선택</div>
                        <select
                            className="w-full p-2 border rounded mb-2"
                            value={selectedBank}
                            onChange={handleBankChange}
                        >
                            <option value="">은행을 선택해주세요</option>
                            {Object.keys(bankCodes).map(bankName => (
                                <option key={bankName} value={bankName}>
                                    {bankName}
                                </option>
                            ))}
                        </select>
                        <div className="text-lg font-bold mb-2">계좌번호</div>
                        <input
                            className="bg-white border rounded py-2 px-4 w-full"
                            placeholder="계좌번호를 입력해주세요"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
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
                    <button 
                        className="bg-primary-700 text-white py-2 px-4 rounded w-full"
                        disabled={!isSettleAvailable}>정산 신청하기</button>
                </div>
            </div>

            {isModalOpen && (
                <AccountVerifyModal
                    onClose={closeModal}
                    selectedBank={selectedBank}
                    selectedBankCode={selectedBankCode}
                    accountNumber={accountNumber}
                    setIsSettleAvailable={setIsSettleAvailable}
                />
            )}
        </div>
    );
};

export default AccountList;
