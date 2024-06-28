import React, { useState } from "react";
import FeedbackVideoPreview from "./FeedbackVideoPreview";

const FeedbackVideoRegist = () => {
    const [videos, setVideos] = useState([1, 2]);

    const handleDelete = (index: number) => {
        setVideos(videos.filter((_, i) => i !== index));
    };

    const handleDeleteAll = () => {
        setVideos([]);
    };

    const handleUpload = () => {
        // 추후 업로드 기능 추가
        setVideos([...videos, videos.length + 1]);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-[1000px] my-3 flex justify-between items-center">
                <div className="text-2xl font-bold">동영상 ({videos.length})</div>
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
            <div className={`flex justify-center bg-primary-100 w-[1000px]  rounded p-6 ${videos.length === 0 ? 'h-[300px]' : ''}`}>
                <div className="w-full">
                    {videos.length === 0 ? (
                        <div className="h-[300px] flex items-center justify-center">
                            <span className="text-gray-500">비디오를 업로드하세요.</span>
                        </div>
                    ) : (
                        <div className="bg-primary-100 rounded p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {videos.map((video, index) => (
                                <FeedbackVideoPreview key={index} video={video} onDelete={() => handleDelete(index)} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackVideoRegist;
