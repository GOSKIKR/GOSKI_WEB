import React, { useState } from "react";
import { SettlementHistoryDTO } from "../../../dto/SettlementHistoryDTO";

const settlementData: SettlementHistoryDTO[] = [
    { type: "입금", bankName: "국민은행", accountHolder: "송준석", accountNumber: "123456-12-123456", amount: "5,000,000원" },
    { type: "출금", bankName: "국민은행", accountHolder: "송준석", accountNumber: "123456-12-123456", amount: "-5,000,000원" },
    { type: "입금", bankName: "국민은행", accountHolder: "송준석", accountNumber: "123456-12-123456", amount: "5,000,000원" },
    { type: "출금", bankName: "국민은행", accountHolder: "송준석", accountNumber: "123456-12-123456", amount: "-5,000,000원" },
    { type: "입금", bankName: "국민은행", accountHolder: "송준석", accountNumber: "123456-12-123456", amount: "5,000,000원" },
];

const SettlementHistory: React.FC = () => {
    const [filter, setFilter] = useState({
        instructor: "",
        date: "",
        type: "",
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilter(prevFilter => ({
            ...prevFilter,
            [name]: value
        }));
    };

    const filteredData = settlementData.filter(item => {
        return (
            (!filter.type || item.type.includes(filter.type)) &&
            (!filter.instructor || item.accountHolder.includes(filter.instructor)) && 
            (!filter.date || item.accountNumber.includes(filter.date)) 
        );
    });

    return (
        <div className="flex flex-col items-center mt-10">
            <div className="bg-primary-100 rounded-lg w-[1000px] p-6 shadow-lg">
                <div className="text-2xl font-bold mb-6">
                    정산내역
                </div>
                <div className="mb-4">
                    <button className="text-blue-500 mr-2">필터</button>
                    <select
                        name="instructor"
                        className="border mr-2 p-2 rounded"
                        value={filter.instructor}
                        onChange={handleFilterChange}
                    >
                        <option value="">강사 선택</option>
                        <option value="송준석">송준석</option>
                    </select>
                    <input
                        type="text"
                        name="date"
                        placeholder="날짜 선택(월별, 일별 등)"
                        className="border mr-2 p-2 rounded"
                        value={filter.date}
                        onChange={handleFilterChange}
                    />
                    <select
                        name="type"
                        className="border mr-2 p-2 rounded"
                        value={filter.type}
                        onChange={handleFilterChange}
                    >
                        <option value="">입출금</option>
                        <option value="입금">입금</option>
                        <option value="출금">출금</option>
                    </select>
                </div>
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="py-2">유형</th>
                            <th className="py-2">은행명</th>
                            <th className="py-2">예금주명</th>
                            <th className="py-2">계좌번호</th>
                            <th className="py-2">금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index} className="border-t">
                                <td className="py-2 text-center">{item.type}</td>
                                <td className="py-2 text-center">
                                    <div className="flex justify-center items-center">
                                        <img src="/path/to/bank-logo.png" alt="bank-logo" className="w-6 h-6 mr-2" />
                                        {item.bankName}
                                    </div>
                                </td>
                                <td className="py-2 text-center">{item.accountHolder}</td>
                                <td className="py-2 text-center">{item.accountNumber}</td>
                                <td className="py-2 text-center text-blue-500">{item.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SettlementHistory;
