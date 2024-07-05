import React from "react";

interface LessonFeeByGroupProps {
    oneOnOneFee: number;
    setOneOnOneFee: React.Dispatch<React.SetStateAction<number>>;
    isEditing: boolean;
}

const LessonFeeByGroup: React.FC<LessonFeeByGroupProps> = ({ oneOnOneFee, setOneOnOneFee, isEditing }) => {
    const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setOneOnOneFee(Number(value));
        }
    };

    return (
        <div className="bg-primary-50 shadow-sm sm:w-[500px] w-[300px] rounded mt-6">
            <div className="text-lg font-bold sm:text-left text-center p-6">
                인원수별 수강비
            </div>
            <div className="p-3 flex flex-col sm:flex-row sm:justify-between items-center">
                <div className="text-center sm:text-left mb-2 sm:mb-0">
                    <div>1:1강습비</div>
                    <div className="text-gray-500">*기본강습비</div>
                </div>
                <div>
                    <input
                        type="text"
                        className="border px-3 py-2 border-black rounded text-center w-[200px] h-8"
                        value={oneOnOneFee}
                        onChange={handleFeeChange}
                        readOnly={!isEditing} 
                    />
                </div>
            </div>
            <div className="p-3 flex flex-col sm:flex-row sm:justify-between items-center">
                <div className="text-center sm:text-left mb-2 sm:mb-0">
                    <div>1:2강습비</div>
                </div>
                <div>
                    <input
                        type="text"
                        className="border px-3 py-2 border-black rounded text-center w-[200px] h-8"
                        defaultValue={20000}
                        readOnly={!isEditing} 
                    />
                </div>
            </div>
            <div className="p-3 flex flex-col sm:flex-row sm:justify-between items-center">
                <div className="text-center sm:text-left mb-2 sm:mb-0">
                    <div>1:3강습비</div>
                </div>
                <div>
                    <input
                        type="text"
                        className="border px-3 py-2 border-black rounded text-center w-[200px] h-8"
                        defaultValue={30000}
                        readOnly={!isEditing} 
                    />
                </div>
            </div>
            <div className="p-3 flex flex-col sm:flex-row sm:justify-between items-center">
                <div className="text-center sm:text-left mb-2 sm:mb-0">
                    <div>4인 초과</div>
                    <div className="text-gray-500">*1인 강습 기준입니다.</div>
                </div>
                <div>
                    <input
                        type="text"
                        className="border ml-2 px-3 py-2 border-black rounded text-center w-[200px] h-8"
                        defaultValue={50000}
                        readOnly={!isEditing} 
                    />
                </div>
            </div>
        </div>
    );
};

export default LessonFeeByGroup;
