import React,{useState} from "react";
import { PaymentService } from "../../../api/PaymentService";

interface AccountVerifyModalProps {
    onClose: () => void;
    selectedBank: string;
    selectedBankCode: string;
    accountNumber: string;
    setIsSettleAvailable: (isAvailable : boolean) => void
}

const paymentService = new PaymentService()

const AccountVerifyModal: React.FC<AccountVerifyModalProps> = ({ 
    onClose, 
    selectedBank, 
    selectedBankCode, 
    accountNumber, 
    setIsSettleAvailable 
}) => {
    const [identity,setIdentity] = useState<string>("");
    const [name,setName] = useState<string>("");

    const fetchVerify = async () => {
        const data = {
            "name" : name,
            "bank" : selectedBankCode,
            "account" : accountNumber,
            "identity" : identity 
        };
        console.log(data);
        const isVerified  = await paymentService.verifyAcoount(data);
        if(isVerified){
            alert("계좌가 인증되었습니다.")
            setIsSettleAvailable(true);
            onClose();
        } else{
            alert("계좌 인증에 실패하였습니다.")
        }
    }


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
                        placeholder="생년월일(YYMMDD)를 입력해주세요"
                        className="w-full p-2 border rounded mb-2"
                        value={identity}
                        onChange={(e) => setIdentity(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="성함을 입력해주세요"
                        className="w-full p-2 border rounded mb-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex justify-end">
                    <button className="bg-primary-500 text-white py-2 px-4 mr-2 rounded" onClick={fetchVerify}>인증하기</button>
                    <button className="bg-gray-500 text-white py-2 px-4 rounded" onClick={onClose}>돌아가기</button>
                </div>
            </div>
        </div>
    );
};

export default AccountVerifyModal;
