import React from "react";

const AccountList : React.FC = () => {

    return(
        <div className="flex justify-center">
            <div className="flex justify-between w-full max-w-[1000px] m-10">
                <div className="bg-primary-100 rounded shadow w-[450px] mr-[50px] pt-[100px]">
                    <div className="text-center text-lg font-bold mb-2">정산 가능 금액</div>
                    <div className="text-center text-3xl font-bold">100,000,000원</div>
                </div>
                <div className="bg-primary-100 rounded shadow w-[450px] p-4 ml-[50px]">
                    <div className="mb-4">
                        <div className="text-lg font-bold mb-2">출금 계좌</div>
                        <input 
                            className="bg-white border rounded py-2 px-4 w-full"
                            placeholder="계좌번호를 입력해주세요"
                        />
                    </div>
                    <button className="bg-primary-500 text-white py-2 px-4 rounded w-full mb-2">계좌 인증하기</button>
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
        </div>
    )
}

export default AccountList;