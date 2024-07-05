import React from "react";

const LessonFeedbackForm: React.FC = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="sm:text-left sm:text-2xl sm:w-[1000px] text-center text-xl w-[350px] my-3 font-bold">
                강습 피드백 작성
            </div>
            <div className="flex justify-center bg-primary-100 sm:w-[1000px] w-[350px] rounded p-6">
                <textarea
                    className="bg-white sm:w-[800px] w-[300px] sm:h-[250px] h-[200px] p-6 border rounded resize-none"
                    placeholder="피드백을 작성해주세요."
                />
            </div>
        </div>
    );
}

export default LessonFeedbackForm;
