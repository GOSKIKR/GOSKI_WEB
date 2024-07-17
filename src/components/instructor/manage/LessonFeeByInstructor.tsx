import React from "react";
import { TeamInstDesignatedFeeDTO } from "../../../dto/TeamDTO";

interface LessonFeeByInstructorProps {
    isEditing: boolean;
    designatedFee: TeamInstDesignatedFeeDTO[] | null;
    setDesignatedFee: (feeInfo: TeamInstDesignatedFeeDTO[]) => void;
}

const LessonFeeByInstructor: React.FC<LessonFeeByInstructorProps> = ({ isEditing, designatedFee, setDesignatedFee }) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, userId: number) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && designatedFee) {
            setDesignatedFee(designatedFee.map(feeInfo =>
                feeInfo.userId === userId ? { ...feeInfo, designatedFee: Number(value) } : feeInfo
            ));
        }
    };

    return (
        <div className="bg-primary-50 shadow-sm sm:w-[1200px] w-[300px] rounded mt-6 p-6">
            <div className="text-lg font-bold sm:text-left text-center mb-4">
                강사 별 강습 지정비
            </div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">강사 이름</th>
                        <th className="py-2">자격증 정보</th>
                        <th className="py-2">지정 강습비</th>
                    </tr>
                </thead>
                <tbody>
                    {designatedFee?.map((feeInfo) => (
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
    );
}

export default LessonFeeByInstructor;
