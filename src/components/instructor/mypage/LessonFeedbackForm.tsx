import React from "react";

const LessonFeedbackForm : React.FC = () => {


    return(
        <div className="flex flex-col items-center">
            <div className="text-left text-2xl font-bold w-[1000px] my-3">
                강습 피드백 작성
            </div>
            <div className="flex justify-center bg-primary-100 w-[1000px] h-[300px] rounded p-6">
                    <textarea
                        className="bg-white w-[800px] h-full p-6 border rounded"
                        placeholder="피드백을 작성해주세요."
                    />
            </div>
        </div>
    )
}

export default LessonFeedbackForm