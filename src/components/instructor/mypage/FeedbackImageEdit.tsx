import React, { useRef, useState } from "react";
import FeedbackImagePreview from "./FeedbackImagePreview";
import { MediaDTO } from "../../../dto/FeedbackDTO";

interface FeedbackImageEditProps {
    currentImageFiles: MediaDTO[];
    setNewImageFiles: (files: File[]) => void;
    setDeleteImageFiles: (ids: number[]) => void;
}

const FeedbackImageEdit: React.FC<FeedbackImageEditProps> = ({ currentImageFiles, setNewImageFiles, setDeleteImageFiles }) => {
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [localNewImageFiles, setLocalNewImageFiles] = useState<File[]>([]);
    const [localDeleteImageFiles, setLocalDeleteImageFiles] = useState<number[]>([]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const uploadedImages = Array.from(files).filter((file) => file.type.startsWith("image/"));
            setLocalNewImageFiles([...localNewImageFiles, ...uploadedImages]);
            setNewImageFiles([...localNewImageFiles, ...uploadedImages]);
        }
    };

    const triggerImageUpload = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    };

    const handleDelete = (index: number, isNew: boolean) => {
        if (isNew) {
            const updatedNewImages = localNewImageFiles.filter((_, i) => i !== index);
            setLocalNewImageFiles(updatedNewImages);
            setNewImageFiles(updatedNewImages);
        } else {
            const imageToDelete = currentImageFiles[index];
            setLocalDeleteImageFiles([...localDeleteImageFiles, imageToDelete.mediaId]);
            setDeleteImageFiles([...localDeleteImageFiles, imageToDelete.mediaId]);
        }
    };

    const handleDeleteAll = () => {
        setLocalNewImageFiles([]);
        setNewImageFiles([]);
        setLocalDeleteImageFiles(currentImageFiles.map((image) => image.mediaId));
        setDeleteImageFiles(currentImageFiles.map((image) => image.mediaId));
    };

    return (
        <div className="flex flex-col items-center">
            <div className="sm:w-[1000px] w-[350px] my-3 flex justify-between items-center">
                <div className="text-left sm:text-2xl text-xl font-bold">사진 ({currentImageFiles.length + localNewImageFiles.length})</div>
                <div>
                    <button className="bg-red-500 text-white py-1 px-4 rounded mr-2" onClick={handleDeleteAll}>
                        모두 삭제
                    </button>
                    <button className="bg-blue-500 text-white py-1 px-4 rounded" onClick={triggerImageUpload}>
                        업로드
                    </button>
                </div>
            </div>
            <input type="file" ref={imageInputRef} className="hidden" accept="image/*" multiple onChange={handleImageUpload} />
            <div className="flex justify-center bg-primary-100 sm:w-[1000px] w-[350px] rounded p-6">
                <div className="w-full">
                    {currentImageFiles.length + localNewImageFiles.length === 0 ? (
                        <div className="h-[300px] flex items-center justify-center">
                            <span className="text-gray-500">사진을 업로드하세요.</span>
                        </div>
                    ) : (
                        <div className="bg-primary-100 rounded p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {currentImageFiles.map((image, index) => (
                                <FeedbackImagePreview key={image.mediaId} image={image.mediaUrl} onDelete={() => handleDelete(index, false)} />
                            ))}
                            {localNewImageFiles.map((image, index) => (
                                <FeedbackImagePreview key={index} image={URL.createObjectURL(image)} onDelete={() => handleDelete(index, true)} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackImageEdit;
