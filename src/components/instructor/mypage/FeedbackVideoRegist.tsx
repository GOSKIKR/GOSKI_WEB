import React, { useRef } from "react";
import FeedbackVideoPreview from "./FeedbackVideoPreview";

interface FeedbackVideoRegistProps {
    videoFiles: File[];
    setVideoFiles: (files: File[]) => void;
}

const FeedbackVideoRegist: React.FC<FeedbackVideoRegistProps> = ({ videoFiles, setVideoFiles }) => {
    const videoInputRef = useRef<HTMLInputElement>(null);

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const uploadedVideos = Array.from(files).filter(file => file.type.startsWith("video/"));
            setVideoFiles([...videoFiles, ...uploadedVideos]);
        }
    };

    const triggerVideoUpload = () => {
        if (videoInputRef.current) {
            videoInputRef.current.click();
        }
    };

    const handleDelete = (index: number) => {
        setVideoFiles(videoFiles.filter((_, i) => i !== index));
    };

    const handleDeleteAll = () => {
        setVideoFiles([]);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="sm:w-[1000px] w-[350px] my-3 flex justify-between items-center">
                <div className="sm:text-2xl text-xl font-bold">동영상 ({videoFiles.length})</div>
                <div>
                    <button 
                        className="bg-red-500 text-white py-1 px-4 rounded mr-2"
                        onClick={handleDeleteAll}
                    >
                        모두 삭제
                    </button>
                    <button 
                        className="bg-blue-500 text-white py-1 px-4 rounded"
                        onClick={triggerVideoUpload}
                    >
                        업로드
                    </button>
                </div>
            </div>
            <input
                type="file"
                ref={videoInputRef}
                className="hidden"
                accept="video/*"
                multiple
                onChange={handleVideoUpload}
            />
            <div className={`flex justify-center bg-primary-100 sm:w-[1000px] w-[350px] rounded p-6 ${videoFiles.length === 0 ? 'h-[300px]' : ''}`}>
                <div className="w-full">
                    {videoFiles.length === 0 ? (
                        <div className="h-[300px] flex items-center justify-center">
                            <span className="text-gray-500">비디오를 업로드하세요.</span>
                        </div>
                    ) : (
                        <div className="bg-primary-100 rounded p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {videoFiles.map((video, index) => (
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
