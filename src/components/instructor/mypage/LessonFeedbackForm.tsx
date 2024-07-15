import React from "react";

interface FeedbackProp {
    content?: string;
    setContent: (content: string) => void;
}

const LessonFeedbackForm: React.FC<FeedbackProp> = ({ content = "", setContent }) => {
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="sm:text-left sm:text-2xl sm:w-[1000px] text-center text-xl w-[350px] my-3 font-bold">
                강습 피드백 작성
            </div>
            <div className="flex justify-center bg-primary-100 sm:w-[1000px] w-[350px] rounded p-6">
                <textarea
                    className="bg-white sm:w-[800px] w-[300px] sm:h-[250px] h-[200px] p-6 border rounded resize-none"
                    placeholder="피드백을 작성해주세요."
                    value={content}
                    onChange={handleContentChange}
                />
            </div>
        </div>
    );
};

export default LessonFeedbackForm;
