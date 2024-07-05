import React, { useState } from "react";
import { SettlementHistoryDTO } from "../../../dto/SettlementHistoryDTO";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const settlementData: SettlementHistoryDTO[] = [
    { type: "입금", bankName: "국민은행", accountHolder: "고승민", accountNumber: "123456-12-123456", amount: "1,000,000원", team: "팀 A" },
    { type: "출금", bankName: "신한은행", accountHolder: "임종율", accountNumber: "123456-12-123456", amount: "2,000,000원", team: "팀 B" },
    { type: "입금", bankName: "기업은행", accountHolder: "김태훈", accountNumber: "123456-12-123456", amount: "3,000,000원", team: "팀 A" },
    { type: "출금", bankName: "하나은행", accountHolder: "김현지", accountNumber: "123456-12-123456", amount: "4,000,000원", team: "팀 C" },
    { type: "입금", bankName: "농협은행", accountHolder: "장승호", accountNumber: "123456-12-123456", amount: "5,000,000원", team: "팀 B" },
];

const SettlementHistory: React.FC = () => {
    const [filter, setFilter] = useState({
        team: "",
        date: "",
        type: ""
    });
    const [openDetails, setOpenDetails] = useState<number | null>(null);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilter(prevFilter => ({
            ...prevFilter,
            [name]: value
        }));
    };

    const toggleDetails = (index: number) => {
        setOpenDetails(openDetails === index ? null : index);
    };

    const teams = Array.from(new Set(settlementData.map(item => item.team)));
    const types = ["입금", "출금"];

    const filteredData = settlementData.filter(item => {
        return (
            (!filter.team || item.team.includes(filter.team)) && 
            (!filter.date || item.accountNumber.includes(filter.date)) &&
            (!filter.type || item.type === filter.type)
        );
    });

    return (
        <div className="flex flex-col items-center mt-10">
            <div className="bg-primary-100 rounded-lg w-[350px] sm:w-[1000px] p-6 shadow-lg">
                <div className="text-2xl font-bold mb-6">
                    입출금 내역
                </div>
                <div className="flex flex-col sm:flex-row sm:mb-4">
                    <select
                        name="team"
                        className="border mr-2 p-2 rounded mb-2 sm:mb-0"
                        value={filter.team}
                        onChange={handleFilterChange}
                    >
                        <option value="">팀 선택</option>
                        {teams.map((team, index) => (
                            <option key={index} value={team}>{team}</option>
                        ))}
                    </select>
                    <select
                        name="type"
                        className="border mr-2 p-2 rounded mb-2 sm:mb-0"
                        value={filter.type}
                        onChange={handleFilterChange}
                    >
                        <option value="">유형 선택</option>
                        {types.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:block">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                        <thead>
                            <tr>
                                <th className="py-2">유형</th>
                                <th className="py-2">은행명</th>
                                <th className="py-2">예금주명</th>
                                <th className="py-2">계좌번호</th>
                                <th className="py-2">금액</th>
                                <th className="py-2">팀</th>
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
                                    <td className={`py-2 text-center ${item.type === "입금" ? "text-blue-500" : "text-red-500"}`}>{item.amount}</td>
                                    <td className="py-2 text-center">{item.team}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="block sm:hidden">
                    {filteredData.map((item, index) => (
                        <div key={index} className="bg-white rounded shadow p-4 mb-4">
                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleDetails(index)}>
                                <div>
                                    <div className="text-lg font-bold">{item.accountHolder}</div>
                                    <div className="text-sm flex items-center">
                                        {item.bankName} | {item.team}
                                    </div>
                                    <div className="text-sm">{item.type}</div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="text-sm">{item.type}</div>
                                    <div className={`${item.type === "입금" ? "text-blue-500" : "text-red-500"}`}>{item.amount}</div>
                                </div>
                                <div>
                                    {openDetails === index ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                            </div>
                            {openDetails === index && (
                                <div className="mt-4">
                                    <div>계좌번호: {item.accountNumber}</div>
                                    <div>금액: {item.amount}</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SettlementHistory;
