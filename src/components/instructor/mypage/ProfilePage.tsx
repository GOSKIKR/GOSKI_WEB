import React, { useState } from "react";

const ProfilePage: React.FC = () => {
    const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const [isTeamLeader, setIsTeamLeader] = useState<boolean>(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenderSelect = (gender: string) => {
        setSelectedGender(gender);
    };

    const handleTeamLeaderChange = () => {
        setIsTeamLeader(!isTeamLeader);
    };

    const triggerFileInput = () => {
        const fileInput = document.getElementById('profileImage')
        if(fileInput){
            fileInput.click();
        }
    }

    return (
        <div className="flex justify-center items-center my-10">
            <div className="bg-primary-100 rounded-lg p-10 shadow-lg flex w-[800px]">
                <div className="flex flex-col items-center mr-10 mt-[200px]">
                    <div className="relative w-40 h-40 mb-4">
                        <img
                            src={profileImage || "https://randomuser.me/api/portraits/men/75.jpg"}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                        />
                        {/* <label htmlFor="profileImage" className="absolute bottom-0 right-0 bg-gray-200 rounded-full p-1 cursor-pointer">
                            <span role="img" aria-label="edit">✏️</span>
                        </label> */}
                        <input
                            type="file"
                            id="profileImage"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <button className="text-blue-500" onClick={triggerFileInput}>사진 수정하기</button>
                </div>
                <div className="flex flex-col w-full">
                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-1">이름</label>
                        <input
                            type="text"
                            placeholder="이름을 입력하세요"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-1">성별</label>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => handleGenderSelect('남자')}
                                className={`w-1/2 p-2 rounded ${selectedGender === '남자' ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
                            >
                                남자
                            </button>
                            <button
                                onClick={() => handleGenderSelect('여자')}
                                className={`w-1/2 p-2 rounded ${selectedGender === '여자' ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
                            >
                                여자
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-1">생년월일</label>
                        <input
                            type="date"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-1">전화번호</label>
                        <input
                            type="tel"
                            placeholder="000-0000-0000"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="block text-lg font-bold mr-2">팀을 운영하고 계신가요?</label>
                        <input 
                            type="checkbox" 
                            className="mr-2 h-4 w-4" 
                            checked={isTeamLeader} 
                            onChange={handleTeamLeaderChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-1">자기소개</label>
                        <textarea
                            placeholder="자기소개를 작성해주세요."
                            className="w-full p-2 border rounded h-24"
                        />
                    </div>
                    <button className="bg-primary-700 text-white py-2 px-4 rounded self-end">수정하기</button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
