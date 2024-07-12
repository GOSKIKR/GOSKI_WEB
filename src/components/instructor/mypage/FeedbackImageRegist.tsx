import React, { useRef } from "react";
import FeedbackImagePreview from "./FeedbackImagePreview";

interface FeedbackImageRegistProps {
    imageFiles: File[];
    setImageFiles: (files: File[]) => void;
}

const FeedbackImageRegist: React.FC<FeedbackImageRegistProps> = ({ imageFiles, setImageFiles }) => {
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const uploadedImages = Array.from(files).filter(file => file.type.startsWith("image/"));
            setImageFiles([...imageFiles, ...uploadedImages]);
        }
    };

    const triggerImageUpload = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    };

    const handleDelete = (index: number) => {
        setImageFiles(imageFiles.filter((_, i) => i !== index));
    };

    const handleDeleteAll = () => {
        setImageFiles([]);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="sm:w-[1000px] w-[350px] my-3 flex justify-between items-center">
                <div className="text-left sm:text-2xl text-xl font-bold">사진 ({imageFiles.length})</div>
                <div>
                    <button
                        className="bg-red-500 text-white py-1 px-4 rounded mr-2"
                        onClick={handleDeleteAll}
                    >
                        모두 삭제
                    </button>
                    <button
                        className="bg-blue-500 text-white py-1 px-4 rounded"
                        onClick={triggerImageUpload}
                    >
                        업로드
                    </button>
                </div>
            </div>
            <input
                type="file"
                ref={imageInputRef}
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
            />
            <div className="flex justify-center bg-primary-100 sm:w-[1000px] w-[350px] rounded p-6">
                <div className="w-full">
                    {imageFiles.length === 0 ? (
                        <div className="h-[300px] flex items-center justify-center">
                            <span className="text-gray-500">사진을 업로드하세요.</span>
                        </div>
                    ) : (
                        <div className="bg-primary-100 rounded p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {imageFiles.map((image, index) => (
                                <FeedbackImagePreview key={index} image={URL.createObjectURL(image)} onDelete={() => handleDelete(index)} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackImageRegist;
