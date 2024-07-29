import React, { useState } from "react";
import { TeamInstInfoDTO } from "../../../dto/TeamDTO";

interface LessonFeeByInstructorProps {
    isEditing: boolean;
    teamInstInfo: TeamInstInfoDTO[] | null;
    setTeamInstInfo: (feeInfo: TeamInstInfoDTO[]) => void;
}

const LessonFeeByInstructor: React.FC<LessonFeeByInstructorProps> = ({ isEditing, teamInstInfo, setTeamInstInfo }) => {
    const [expandedInstructorIndex, setExpandedInstructorIndex] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, userId: number) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && teamInstInfo) {
            setTeamInstInfo(teamInstInfo.map(feeInfo =>
                feeInfo.userId === userId ? { ...feeInfo, designatedFee: Number(value) } : feeInfo
            ));
        }
    };

    const toggleExpand = (index: number) => {
        setExpandedInstructorIndex(expandedInstructorIndex === index ? null : index);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = teamInstInfo?.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil((teamInstInfo?.length || 0) / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="bg-primary-50 shadow-sm sm:w-[1200px] w-[350px] min-h-[500px] rounded mt-6 p-6 mx-auto flex flex-col justify-between">
            <div className="text-lg font-bold sm:text-left text-center mb-4">
                강사 별 강습 지정비
            </div>
            <div className="flex-grow overflow-y-auto">
                <div className="hidden sm:block">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="py-2 w-1/4">강사 이름</th>
                                <th className="py-2 w-1/2">자격증 정보</th>
                                <th className="py-2 w-1/4">지정 강습비</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems?.map((feeInfo) => (
                                <tr key={feeInfo.userId}>
                                    <td className="border px-4 py-2">{feeInfo.userName}</td>
                                    <td className="border px-4 py-2 text-gray-500">
                                        {feeInfo.certificateInfoList.map(cert => `${cert.certificateType} ${cert.certificateName}`).join(", ")}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <input
                                            type="text"
                                            className="border px-3 py-2 border-black rounded text-center w-full"
                                            value={feeInfo.designatedFee}
                                            readOnly={!isEditing}
                                            onChange={(e) => handleInputChange(e, feeInfo.userId)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="block sm:hidden">
                    {currentItems?.map((feeInfo, index) => (
                        <div key={feeInfo.userId} className="bg-white rounded shadow p-4 mb-4">
                            <div className="flex items-center justify-between" onClick={() => toggleExpand(index)}>
                                <div>
                                    <div className="text-sm font-bold border-b">{feeInfo.userName} 강사</div>
                                    <div className="text-gray-500">
                                        {feeInfo.certificateInfoList.map(cert => `${cert.certificateType} ${cert.certificateName}`).join(", ")}
                                    </div>
                                </div>
                                <button
                                    className="text-primary-500"
                                    onClick={() => toggleExpand(index)}
                                >
                                    {expandedInstructorIndex === index ? "▲" : "▼"}
                                </button>
                            </div>
                            {expandedInstructorIndex === index && (
                                <div className="mt-4">
                                    <div className="mb-4">
                                        <label className="block text-gray-700">지정 강습비</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            value={feeInfo.designatedFee}
                                            readOnly={!isEditing}
                                            onChange={(e) => handleInputChange(e, feeInfo.userId)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-4 w-full">
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`px-3 py-1 mx-1 rounded ${currentPage === number ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default LessonFeeByInstructor;
