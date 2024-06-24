import React from "react";
import { FaTimes } from 'react-icons/fa';

interface PhotoPreviewProps {
    image: number;
    onDelete: () => void;
}

const FeedbackPhotoPreview: React.FC<PhotoPreviewProps> = ({ image, onDelete }) => {
    return (
        <div className="bg-white rounded shadow p-4 m-2 relative">
            <div className="absolute top-2 right-2 cursor-pointer" onClick={onDelete}>
                <FaTimes className="text-red-500 text-xl" />
            </div>
            <div className="w-full h-32 bg-blue-100 rounded flex items-center justify-center">
                <span className="text-gray-500">피드백 사진</span>
            </div>
        </div>
    );
}

export default FeedbackPhotoPreview;
