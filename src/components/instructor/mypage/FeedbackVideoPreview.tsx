import React from "react";

interface FeedbackVideoPreviewProps {
    video: File;
    onDelete: () => void;
}

const FeedbackVideoPreview: React.FC<FeedbackVideoPreviewProps> = ({ video, onDelete }) => {
    return (
        <div className="relative">
            <video
                src={URL.createObjectURL(video)}
                controls
                className="w-full h-40 object-cover rounded"
            />
            <button
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                onClick={onDelete}
            >
                X
            </button>
        </div>
    );
};

export default FeedbackVideoPreview;
