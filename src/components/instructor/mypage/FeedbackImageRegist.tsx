import React, { useState } from "react";
import FeedbackImagePreview from "./FeedbackImagePreview";

const FeedbackImageRegist = () => {
    const [images, setImages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);

    const handleDelete = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleDeleteAll = () => {
        setImages([]);
    };

    const handleUpload = () => {
        // 업로드 기능을 추가하세요
        setImages([...images, images.length + 1]);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="sm:w-[1000px] w-[350px] my-3 flex justify-between items-center">
                <div className="text-left sm:text-2xl text-xl font-bold">사진 ({images.length})</div>
                <div>
                    <button
                        className="bg-red-500 text-white py-1 px-4 rounded mr-2"
                        onClick={handleDeleteAll}
                    >
                        모두 삭제
                    </button>
                    <button
                        className="bg-blue-500 text-white py-1 px-4 rounded"
                        onClick={handleUpload}
                    >
                        업로드
                    </button>
                </div>
            </div>
            <div className="flex justify-center bg-primary-100 sm:w-[1000px] w-[350px] rounded p-6">
                <div className="w-full">
                    {images.length === 0 ? (
                        <div className="h-[300px] flex items-center justify-center">
                            <span className="text-gray-500">사진을 업로드하세요.</span>
                        </div>
                    ) : (
                        <div className="bg-primary-100 rounded p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {images.map((image, index) => (
                                <FeedbackImagePreview key={index} image={image} onDelete={() => handleDelete(index)} />
                            ))}
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    );
};

export default FeedbackImageRegist;
