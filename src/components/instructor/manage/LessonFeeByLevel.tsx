import React from "react";

interface LessonFeeByLevelProps {
    oneOnOneFee: number;
    isEditing: boolean;
}

const LessonFeeByLevel: React.FC<LessonFeeByLevelProps> = ({ oneOnOneFee, isEditing }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            // 추후 api연결
        }
    };


    return (
        <div className="bg-primary-100 shadow-sm sm:w-[500px] w-[300px] rounded mt-6">
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
                        value={oneOnOneFee}
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
                        defaultValue={100000}
                        readOnly={!isEditing} 
                        onChange={handleInputChange}
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
                        defaultValue={150000}
                        readOnly={!isEditing} 
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default LessonFeeByLevel;
