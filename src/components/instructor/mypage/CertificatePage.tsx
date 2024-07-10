import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import useInstructorStore from '../../../store/InstStore';
import { levels } from '../../../utils/levels';
import { UserService } from '../../../api/UserService';
import { Certificate, NewCertificate } from '../../../dto/InstructorDTO';

const userService = new UserService();

const CertificatePage: React.FC = () => {
    const { certificates, setCertificates } = useInstructorStore();
    const [deleteCertificateUrls, setDeleteCertificateUrls] = useState<Certificate[]>([]);
    const [newCertificates, setNewCertificates] = useState<NewCertificate[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

    const handleAddCertificate = () => {
        setIsModalOpen(true);
    };

    const handleLevelSelect = () => {
        if (selectedLevel !== null) {
            const newCertIndex = newCertificates.length;
            setNewCertificates([...newCertificates, { certificateId: selectedLevel, newCertImage: new File([], '') }]);
            setCertificates([...certificates, { certificateId: selectedLevel, certificateImageUrl: '' }]);
            setIsModalOpen(false);
            setSelectedLevel(null);

            const fileInput = document.getElementById(`file-input-${newCertIndex}`) as HTMLInputElement;
            if (fileInput) {
                fileInput.click();
            }
        } else {
            alert('레벨을 선택하세요.');
        }
    };

    const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewCertificates(newCertificates.map((cert, i) => i === index ? { ...cert, newCertImage: file } : cert));
            const reader = new FileReader();
            reader.onloadend = () => {
                setCertificates(certificates.map((cert, i) => i === index ? { ...cert, certificateImageUrl: reader.result as string } : cert));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteCertificate = (index: number) => {
        const certToDelete = certificates[index];
        if (certToDelete) {
            setDeleteCertificateUrls([...deleteCertificateUrls, certToDelete]);
            setCertificates(certificates.filter((_, i) => i !== index));
            setNewCertificates(newCertificates.filter((_, i) => i !== index));
        }
    };

    const handleLevelChange = (index: number, e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLevelId = parseInt(e.target.value, 10);
        setCertificates(certificates.map((cert, i) => i === index ? { ...cert, certificateId: newLevelId } : cert));
        setNewCertificates(newCertificates.map((cert, i) => i === index ? { ...cert, certificateId: newLevelId } : cert));
    };

    const instProfileUpdate = async () => {
        const formData = new FormData();

        deleteCertificateUrls.forEach(cert => {
            formData.append('deleteCertificateUrls', JSON.stringify(cert));
        });

        newCertificates.forEach(cert => {
            formData.append('certificateIds', cert.certificateId.toString());
            if (cert.newCertImage) {
                formData.append('certificateImages', cert.newCertImage);
            }
        });

        await userService.updateInstructorCerts(formData);
    };

    return (
        <div className='flex flex-col items-center mt-10'>
            <div className='flex justify-end sm:w-full sm:max-w-[1000px] w-[350px] mb-4'>
                <button className='text-blue-500' onClick={handleAddCertificate}>
                    + 추가하기
                </button>
            </div>
            {certificates.length === 0 ? (
                <div className='bg-white rounded-lg flex justify-center items-center sm:w-full sm:max-w-[1000px] sm:h-[300px] w-[350px]'>
                    <span className='text-primary-500'>자격증을 등록하세요</span>
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-[1000px]'>
                    {certificates.map((cert, index) => (
                        <div key={index} className='bg-white rounded shadow p-4 flex flex-col items-center'>
                            <select className='mb-4 border p-2 rounded' value={cert.certificateId} onChange={(e) => handleLevelChange(index, e)}>
                                {levels.map(level => (
                                    <option key={level.id} value={level.id}>
                                        {level.type} - {level.name}
                                    </option>
                                ))}
                            </select>
                            <div className='relative w-full h-40 bg-blue-100 flex items-center justify-center mb-4'>
                                {cert.certificateImageUrl ? (
                                    <img src={cert.certificateImageUrl} alt='certificate' className='w-full h-full object-cover rounded' />
                                ) : (
                                    <span className='text-gray-500'>자격증 사진</span>
                                )}
                                <input
                                    type='file'
                                    id={`file-input-${index}`}
                                    className='absolute inset-0 opacity-0 cursor-pointer'
                                    accept='image/*'
                                    onChange={(e) => handleImageChange(index, e)}
                                />
                            </div>
                            <button className='bg-primary-500 text-white py-1 px-2 rounded flex items-center justify-center w-full' onClick={() => handleDeleteCertificate(index)}>
                                <FaTrash className='mr-1' /> 삭제
                            </button>
                        </div>
                    ))}
                </div>
            )}
            {certificates.length > 0 && (
                <button className='bg-primary-700 text-white py-2 px-4 rounded mt-4' onClick={instProfileUpdate}>
                    저장하기
                </button>
            )}
            {isModalOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-4 rounded shadow-lg'>
                        <h2 className='text-xl font-bold mb-4'>레벨 선택</h2>
                        <select className='mb-4 border p-2 rounded w-full' value={selectedLevel || ''} onChange={(e) => setSelectedLevel(parseInt(e.target.value, 10))}>
                            <option value='' disabled>
                                레벨을 선택하세요
                            </option>
                            {levels.map(level => (
                                <option key={level.id} value={level.id}>
                                    {level.type} - {level.name}
                                </option>
                            ))}
                        </select>
                        <div className='flex justify-end'>
                            <button className='bg-primary-500 text-white py-2 px-4 rounded mr-2' onClick={handleLevelSelect}>
                                추가
                            </button>
                            <button className='bg-gray-500 text-white py-2 px-4 rounded' onClick={() => setIsModalOpen(false)}>
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CertificatePage;
