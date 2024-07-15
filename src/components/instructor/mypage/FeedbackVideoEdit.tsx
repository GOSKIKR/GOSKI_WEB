import React, { useRef, useState } from "react";
import FeedbackVideoPreview from "./FeedbackVideoPreview";
import { MediaDTO } from "../../../dto/FeedbackDTO";

interface FeedbackVideoEditProps {
    currentVideoFiles: MediaDTO[];
    setNewVideoFiles: (files: File[]) => void;
    setDeleteVideoFiles: (ids: number[]) => void;
}

const FeedbackVideoEdit: React.FC<FeedbackVideoEditProps> = ({ currentVideoFiles, setNewVideoFiles, setDeleteVideoFiles }) => {
    const videoInputRef = useRef<HTMLInputElement>(null);
    const [localNewVideoFiles, setLocalNewVideoFiles] = useState<File[]>([]);
    const [localDeleteVideoFiles, setLocalDeleteVideoFiles] = useState<number[]>([]);

    const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const uploadedVideos = Array.from(files).filter((file) => file.type.startsWith("video/"));
            setLocalNewVideoFiles([...localNewVideoFiles, ...uploadedVideos]);
            setNewVideoFiles([...localNewVideoFiles, ...uploadedVideos]);
        }
    };

    const triggerVideoUpload = () => {
        if (videoInputRef.current) {
            videoInputRef.current.click();
        }
    };

    const handleDelete = (index: number, isNew: boolean) => {
        if (isNew) {
            const updatedNewVideos = localNewVideoFiles.filter((_, i) => i !== index);
            setLocalNewVideoFiles(updatedNewVideos);
            setNewVideoFiles(updatedNewVideos);
        } else {
            const videoToDelete = currentVideoFiles[index];
            setLocalDeleteVideoFiles([...localDeleteVideoFiles, videoToDelete.mediaId]);
            setDeleteVideoFiles([...localDeleteVideoFiles, videoToDelete.mediaId]);
        }
    };

    const handleDeleteAll = () => {
        setLocalNewVideoFiles([]);
        setNewVideoFiles([]);
        setLocalDeleteVideoFiles(currentVideoFiles.map((video) => video.mediaId));
        setDeleteVideoFiles(currentVideoFiles.map((video) => video.mediaId));
    };

    const isDeleted = (videoId : number) => localDeleteVideoFiles.includes(videoId)

    const videoLength = () => {
        return currentVideoFiles.filter((video) => !isDeleted(video.mediaId)).length + localNewVideoFiles.length;
    }

    return (
        <div className="flex flex-col items-center">
            <div className="sm:w-[1000px] w-[350px] my-3 flex justify-between items-center">
                <div className="sm:text-2xl text-xl font-bold">동영상 ({videoLength()})</div>
                <div>
                    <button className="bg-red-500 text-white py-1 px-4 rounded mr-2" onClick={handleDeleteAll}>
                        모두 삭제
                    </button>
                    <button className="bg-blue-500 text-white py-1 px-4 rounded" onClick={triggerVideoUpload}>
                        업로드
                    </button>
                </div>
            </div>
            <input type="file" ref={videoInputRef} className="hidden" accept="video/*" multiple onChange={handleVideoUpload} />
            <div className={`flex justify-center bg-primary-100 sm:w-[1000px] w-[350px] rounded p-6 ${videoLength() === 0 ? "h-[300px]" : ""}`}>
                <div className="w-full">
                    {videoLength() === 0 ? (
                        <div className="h-[300px] flex items-center justify-center">
                            <span className="text-gray-500">비디오를 업로드하세요.</span>
                        </div>
                    ) : (
                        <div className="bg-primary-100 rounded p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {currentVideoFiles.map((video, index) => (
                                !isDeleted(video.mediaId) && 
                                <FeedbackVideoPreview key={video.mediaId} video={video.mediaUrl} onDelete={() => handleDelete(index, false)} />
                            ))}
                            {localNewVideoFiles.map((video, index) => (
                                <FeedbackVideoPreview key={index} video={URL.createObjectURL(video)} onDelete={() => handleDelete(index, true)} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackVideoEdit;
