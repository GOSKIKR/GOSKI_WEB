import React from "react";

interface LessonFeeByInstructorProps {
    isEditing: boolean;
}

const LessonFeeByInstructor : React.FC<LessonFeeByInstructorProps> = ({isEditing}) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            // 추후 api 연결
        }
    };

    return(
        <div className="bg-primary-50 shadow-sm sm:w-[500px] w-[300px] rounded mt-6">
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
                        readOnly={isEditing}
                        onChange={handleInputChange}
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
                        readOnly={isEditing}
                        onChange={handleInputChange}
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
                        readOnly={isEditing}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default LessonFeeByInstructor;