import React, { useState } from "react";
import Editor from "../../../components/common/Editor";
import TeamManageHeader from "../../../components/instructor/manage/TeamManageHeader";
import NavbarInstructor from "../../../components/common/NavbarInstructor";
import AddTeamMemberModal from "../../../components/instructor/manage/AddTeamMemberModal";
import TeamMember from "../../../interface/TeamMember";

const TeamRegist: React.FC = () => {
    const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const triggerFileInput = () => {
        const fileInput = document.getElementById('profileImage');
        if (fileInput) {
            fileInput.click();
        }
    };

    const addTeamMember = (member: TeamMember) => {
        setTeamMembers([...teamMembers, member]);
    };

    return (
        <div>
            <NavbarInstructor />
            <TeamManageHeader />
            <div className="flex justify-center mt-10">
                <div className="p-6">
                    <div className="team-profile-image mb-6 bg-primary-100 rounded-lg w-[600px] h-[350px]">
                        <div className="text-lg font-bold p-6">
                            팀 프로필 사진
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="inner bg-white p-3 rounded-lg text-center w-[200px]">
                                <div className="w-40 h-40 bg-primary-100 mx-auto flex items-center justify-center text-gray-500 rounded mb-4">
                                    {profileImage ? (
                                        <img src={profileImage as string} alt="Profile" className="w-full h-full object-cover rounded" />
                                    ) : (
                                        "팀 프로필 사진"
                                    )}
                                </div>
                                <input
                                    type="file"
                                    id="profileImage"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                <button onClick={triggerFileInput} className="bg-primary-500 text-white px-4 py-2 rounded">
                                    사진 찾기
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="team-intro mb-6 bg-primary-100 rounded-lg">
                        <div className="flex justify-between items-center p-6">
                            <div className="text-lg font-bold text-center align-middle">팀 소개글</div>
                            <button className="bg-primary-500 text-white rounded px-4 py-2">업로드</button>
                        </div>
                        <div className="px-6 pb-6">
                            <Editor />
                        </div>
                    </div>
                    <div className={`team-member mb-6 bg-primary-100 rounded-lg ${teamMembers.length === 0 ? 'h-[500px]' : ''}`}>
                        <div className="flex justify-between items-center p-6">
                            <div className="text-lg font-bold text-center align-middle">팀원 정보</div>
                            <button onClick={() => setIsModalOpen(true)} className="bg-primary-500 text-white rounded px-4 py-2">추가하기</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="bg-white rounded shadow p-4">
                                    <div className="text-center mb-4">
                                        <img src={member.image} alt="Team Member" className="w-full h-40 object-cover rounded" />
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm font-bold">{member.role}</div>
                                        <div className="text-sm">{member.name}</div>
                                        <div className="text-sm">{member.phone}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-primary-700 text-white m-2 px-4 py-2 rounded">
                            팀 등록
                        </button>
                        <button className="bg-primary-900 text-white m-2 px-4 py-2 rounded">
                            돌아가기
                        </button>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <AddTeamMemberModal 
                    onClose={() => setIsModalOpen(false)} 
                    onSave={addTeamMember} 
                />
            )}
        </div>
    )
}

export default TeamRegist;
