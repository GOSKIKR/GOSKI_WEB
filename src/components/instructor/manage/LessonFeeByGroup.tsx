import React from "react";

const LessonFeeByGroup: React.FC = () => {
    return (
        <div className="bg-primary-100 shadow-sm sm:w-[500px] w-[300px] rounded mt-6">
            <div className="text-lg font-bold sm:text-left text-center p-6">
                인원수별 수강비
            </div>
            <div className="p-6 flex flex-col sm:flex-row sm:justify-between items-center">
                <div className="text-center sm:text-left mb-2 sm:mb-0">
                    <div>1:1강습비</div>
                    <div className="text-gray-500">*기본강습비</div>
                </div>
                <div>
                    <input
                        type="text"
                        className="border px-3 py-2 border-black rounded text-center w-[200px] h-8"
                        defaultValue={10000}
                    />
                </div>
            </div>
            <div className="p-6 flex flex-col sm:flex-row sm:justify-between items-center">
                <div className="text-center sm:text-left mb-2 sm:mb-0">
                    <div>1:2강습비</div>
                </div>
                <div>
                    <input
                        type="text"
                        className="border px-3 py-2 border-black rounded text-center w-[200px] h-8"
                        defaultValue={20000}
                    />
                </div>
            </div>
            <div className="p-6 flex flex-col sm:flex-row sm:justify-between items-center">
                <div className="text-center sm:text-left mb-2 sm:mb-0">
                    <div>1:3강습비</div>
                </div>
                <div>
                    <input
                        type="text"
                        className="border px-3 py-2 border-black rounded text-center w-[200px] h-8"
                        defaultValue={30000}
                    />
                </div>
            </div>
            <div className="p-6 flex flex-col sm:flex-row sm:justify-between items-center">
                <div className="text-center sm:text-left mb-2 sm:mb-0">
                    <div>4인 초과</div>
                </div>
                <div>
                    1인당<input
                        type="text"
                        className="border ml-2 px-3 py-2 border-black rounded text-center w-[200px] h-8"
                        defaultValue={50000}
                    />
                </div>
            </div>
        </div>
    )
}

export default LessonFeeByGroup;
