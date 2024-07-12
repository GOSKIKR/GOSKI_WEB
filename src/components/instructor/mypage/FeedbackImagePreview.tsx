import React, { useState } from "react";
import { FaTimes } from 'react-icons/fa';

interface FeedbackImagePreviewProps {
    image: File;
    onDelete: () => void;
}

const FeedbackImagePreview: React.FC<FeedbackImagePreviewProps> = ({ image, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div>
            <div className="bg-white rounded shadow p-4 m-2 relative">
                <div className="absolute top-2 right-2 cursor-pointer" onClick={onDelete}>
                    <FaTimes className="text-red-500 text-xl" />
                </div>
                <div className="w-full h-32 bg-blue-100 rounded flex items-center justify-center cursor-pointer" onClick={toggleModal}>
                    <img src={URL.createObjectURL(image)} alt="Preview" className="object-cover h-full w-full rounded"/>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded shadow-lg relative">
                        <div className="absolute top-2 right-2 cursor-pointer" onClick={toggleModal}>
                            <FaTimes className="text-red-500 text-2xl" />
                        </div>
                        <img src={URL.createObjectURL(image)} alt="Preview" className="max-h-[80vh] max-w-[80vw] object-contain"/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeedbackImagePreview;
