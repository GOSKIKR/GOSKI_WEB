import React, { useState, useEffect } from "react";
import { useStore } from "zustand";
import { instStore } from "../../../store/InstStore";
import { UserService } from "../../../api/UserService";

const userService = new UserService();

const ProfilePage: React.FC = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [selectedGender, setSelectedGender] = useState<string | null>('남자');
    const [isTeamLeader, setIsTeamLeader] = useState<boolean>(false);

    const { userName, profileUrl, phoneNumber, description, birthDate, setProfile } = useStore(instStore);

    useEffect(() => {
        const fetchProfile = async () => {
            const profile = await userService.getInstructorProfile();
            if (profile) {
                setProfile(profile);
                setProfileImage(profile.profileUrl);
                setSelectedGender(profile.gender);
                setIsTeamLeader(profile.role === "OWNER");
            }
        };

        fetchProfile();
    }, [setProfile]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setProfileImage(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        const fileInput = document.getElementById('profileImage') as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    };

    return (
        <div className="flex justify-center items-center my-10">
            <div className="bg-primary-100 rounded-lg p-10 shadow-lg flex flex-col sm:flex-row sm:w-[800px] w-[350px]">
                <div className="flex flex-col items-center sm:mr-10 sm:mt-[200px] mb-4 sm:mb-0">
                    <div className="relative w-40 h-40 mb-4">
                        <img
                            src={profileUrl || "https://randomuser.me/api/portraits/men/75.jpg"}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                        />
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
                            value={userName}
                            className="w-full p-2 border rounded"
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-1">성별</label>
                        <div className="flex space-x-4">
                            <button
                                className={`w-1/2 p-2 rounded ${selectedGender === 'MALE' ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
                                disabled
                            >
                                남자
                            </button>
                            <button
                                className={`w-1/2 p-2 rounded ${selectedGender === 'FEMALE' ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
                                disabled
                            >
                                여자
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-1">생년월일</label>
                        <input
                            type="string"
                            value={birthDate}
                            className="w-full p-2 border rounded"
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-1">전화번호</label>
                        <input
                            type="tel"
                            value={phoneNumber}
                            className="w-full p-2 border rounded"
                            disabled
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="block text-lg font-bold mr-2">팀을 운영하고 계신가요?</label>
                        <input
                            type="checkbox"
                            className="mr-2 h-4 w-4"
                            checked={isTeamLeader}
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-1">자기소개</label>
                        <textarea
                            value={description}
                            className="w-full p-2 border rounded h-24 resize-none"
                        />
                    </div>
                    <button
                        className="bg-primary-700 text-white py-2 px-4 rounded self-end sm:w-1/4 w-full hover:bg-primary-500">수정하기</button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
