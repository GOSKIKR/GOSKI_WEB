import React from "react";
import { FaTrash } from "react-icons/fa";
import { useStore } from "zustand";
import { instStore } from "../../../store/InstStore";
import { levels } from "../../../utils/levels";


const CertificatePage: React.FC = () => {

    const {certificates, setCertificates} = useStore(instStore)

    const handleAddCertificate = () => {
        const newId = certificates.length > 0 ? certificates[certificates.length - 1].certificateId + 1 : 1;
        setCertificates([...certificates, { certificateId: newId, certificateImageUrl : '' }]);
    };

    const handleImageChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCertificates(certificates.map(cert => cert.certificateId === id ? { ...cert, image: reader.result as string } : cert));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteCertificate = (id: number) => {
        setCertificates(certificates.filter(cert => cert.certificateId !== id));
    };

    const handleLevelChange = (id: number, e: React.ChangeEvent<HTMLSelectElement>) => {
        setCertificates(certificates.map(cert => cert.certificateId === id ? { ...cert, level: e.target.value } : cert));
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <div className="flex justify-end sm:w-full sm:max-w-[1000px] w-[350px] mb-4">
                <button 
                    className="text-blue-500" 
                    onClick={handleAddCertificate}
                >
                    + 추가하기
                </button>
            </div>
            {certificates.length === 0 ? (
                <div className="bg-white rounded-lg flex justify-center items-center sm:w-full sm:max-w-[1000px] sm:h-[300px] w-[350px]">
                    <span className="text-primary-500">자격증을 등록하세요</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-[1000px]">
                    {certificates.map(cert => (
                        <div key={cert.certificateId} className="bg-white rounded shadow p-4 flex flex-col items-center">
                            <select 
                                className="mb-4 border p-2 rounded"
                                value={cert.certificateId}
                                onChange={(e) => handleLevelChange(cert.certificateId, e)}
                            >
                                {levels.map(level => (
                                    <option key={level.id} value={level.id}>
                                        {level.type} - {level.name}
                                    </option>
                                ))}
                            </select>
                            <div className="relative w-full h-40 bg-blue-100 flex items-center justify-center mb-4">
                                {cert.certificateImageUrl ? (
                                    <img src={cert.certificateImageUrl} alt="certificate" className="w-full h-full object-cover rounded"/>
                                ) : (
                                    <span className="text-gray-500">자격증 사진</span>
                                )}
                                <input 
                                    type="file" 
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(cert.certificateId, e)}
                                />
                            </div>
                            <button 
                                className="bg-primary-500 text-white py-1 px-2 rounded flex items-center justify-center w-full"
                                onClick={() => handleDeleteCertificate(cert.certificateId)}
                            >
                                <FaTrash className="mr-1" /> 삭제
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {certificates.length > 0 && (
                <button className="bg-primary-700 text-white py-2 px-4 rounded mt-4">저장하기</button>
            )}
        </div>
    );
};

export default CertificatePage;
