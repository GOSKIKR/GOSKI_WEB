import React from "react";
import { FaPlay, FaTrash } from 'react-icons/fa';

interface VideoPreviewProps {
    video: number;
    onDelete: () => void;
}


const FeedbackVideoPreview : React.FC<VideoPreviewProps>= ({ video, onDelete }) => {

    return (
        <div className="bg-white rounded shadow p-4 m-2 flex flex-col items-center">
            <div className="relative w-full h-32 bg-blue-100 rounded flex items-center justify-center">
                <FaPlay className="text-black text-2xl" />
            </div>
            <button 
                className="mt-2 bg-primary-500 text-white py-1 px-2 rounded flex items-center justify-center w-full"
                onClick={onDelete}
            >
                <FaTrash className="mr-1" /> 삭제
            </button>
        </div>
    );
}

export default FeedbackVideoPreview;