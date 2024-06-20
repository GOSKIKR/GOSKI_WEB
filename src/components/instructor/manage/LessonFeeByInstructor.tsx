import React from "react";

const LessonFeeByInstructor : React.FC = () => {

    return(
        <div className="bg-primary-100 rounded">
            <div className="text-lg font-bold text-left p-6">
                강사 별 강습 지정비
            </div>
            <div className="flex justify-between p-6">
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
            <div className="flex justify-between p-6">
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
            <div className="flex justify-between p-6">
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