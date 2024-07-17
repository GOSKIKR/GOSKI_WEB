import React from "react";

interface LessonFeeByLevelProps {
    basicFee: number;
    intermediateFee: number;
    advancedFee: number;
    setIntermediateFee: React.Dispatch<React.SetStateAction<number>>;
    setAdvancedFee: React.Dispatch<React.SetStateAction<number>>;
    isEditing: boolean;
}

const LessonFeeByLevel: React.FC<LessonFeeByLevelProps> = ({
    basicFee, intermediateFee, advancedFee,
    setIntermediateFee, setAdvancedFee,
    isEditing
}) => {
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFee: React.Dispatch<React.SetStateAction<number>>
    ) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setFee(Number(value));
        }
    };

    return (
        <div className="bg-primary-50 shadow-sm sm:w-[500px] w-[300px] rounded mt-6">
            <div className="text-lg font-bold sm:text-left text-center p-6">
                강습 단계별 추가비용
            </div>
            <div className="p-3 flex flex-col sm:p-6 sm:flex-row sm:justify-between items-center">
                <div>
                    <div className="sm:text-left text-center">초급 강습비</div>
                    <div className="text-gray-500">*초급 강습은 기본 강습비와 동일합니다.</div>
                </div>
                <div>
                    <input
                        type="text"
                        className="border px-3 py-2 border-black rounded text-center w-[200px] h-8"
                        value={basicFee}
                        readOnly
                    />
                </div>
            </div>
            <div className="p-3 flex flex-col sm:p-6 sm:flex-row sm:justify-between items-center">
                <div>
                    <div>중급 강습비</div>
                </div>
                <div>
                    <input
                        type="text"
                        className="border px-3 py-2 border-black rounded text-center w-[200px] h-8"
                        value={intermediateFee}
                        readOnly={!isEditing}
                        onChange={(e) => handleInputChange(e, setIntermediateFee)}
                    />
                </div>
            </div>
            <div className="p-3 flex flex-col sm:p-6 sm:flex-row sm:justify-between items-center">
                <div>
                    <div>고급 강습비</div>
                </div>
                <div>
                    <input
                        type="text"
                        className="border px-3 py-2 border-black rounded text-center w-[200px] h-8"
                        value={advancedFee}
                        readOnly={!isEditing}
                        onChange={(e) => handleInputChange(e, setAdvancedFee)}
                    />
                </div>
            </div>
        </div>
    );
};

export default LessonFeeByLevel;
