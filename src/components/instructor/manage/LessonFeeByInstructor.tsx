import React from "react";

const LessonFeeByInstructor : React.FC = () => {

    return(
        <div className="bg-primary-100 shadow-sm sm:w-[500px] w-[300px] rounded mt-6">
            <div className="text-lg font-bold sm:text-left text-center p-6">
                강사 별 강습 지정비
            </div>
            <div className="p-3 flex flex-col sm:p-6 sm:flex-row sm:justify-between items-center">
                <div>
                    <div>AA 강사 지정 강습비</div>
                </div>
                <div>
                    <input
                        type="text"
                        className="border px-3 py-2 border-black rounded text-center w-[200px] h-8"
                        defaultValue={50000}
                    />
                </div>
            </div>
            <div className="p-3 flex flex-col sm:p-6 sm:flex-row sm:justify-between items-center">
                <div>
                    <div>BB 강사 지정 강습비</div>
                </div>
                <div>
                    <input
                        type="text"
                        className="border px-3 py-2 border-black rounded text-center w-[200px] h-8"
                        defaultValue={50000}
                    />
                </div>
            </div>
            <div className="p-3 flex flex-col sm:p-6 sm:flex-row sm:justify-between items-center">
                <div>
                    <div>CC 강사 지정 강습비</div>
                </div>
                <div>
                    <input
                        type="text"
                        className="border px-3 py-2 border-black rounded text-center w-[200px] h-8"
                        defaultValue={50000}
                    />
                </div>
            </div>
        </div>
    )
}

export default LessonFeeByInstructor;