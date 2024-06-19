import React from "react";

const LessonFeeByGroup : React.FC = () => {

    return (
        <div className="bg-primary-100 shadow-sm w-[500px] rounded mt-6">
            <div className="text-lg font-bold text-left p-6">
                인원수별 수강비
            </div>
            <div className="flex justify-between p-6">
                <div>
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
            <div className="flex justify-between p-6">
                <div>
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
            <div className="flex justify-between p-6">
                <div>
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
            <div className="flex justify-between p-6">
                <div>
                    <div>4인 초과</div>
                </div>
                <div>
                    1인당<input
                        type="text"
                        className="border ml-2 px-3 py-2 border-black rounded  text-center w-[200px] h-8"
                        defaultValue={50000}
                    />
                </div>
            </div>
        </div>
    )
}

export default LessonFeeByGroup;