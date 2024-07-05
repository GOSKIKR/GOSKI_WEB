import React, { useEffect, useState } from "react";
import TeamManageHeader from "../../../components/instructor/manage/TeamManageHeader";
import Editor from "../../../components/common/Editor";
import DropdownMenu from "../../../components/instructor/manage/TeamListDropdown";
import NavbarInstructor from "../../../components/common/NavbarInstructor";
import NavbarInstructorMobile from "../../../components/common/NavbarInstructorMobile";

const TeamInfoEdit : React.FC = () => {
    const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

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

    const handleResize = () => {
        setInnerWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize",handleResize)
        return (() => window.removeEventListener("resize",handleResize))
    })

    return (
        <div>
            {innerWidth > 640 ? <NavbarInstructor/> : <NavbarInstructorMobile/>}
            <TeamManageHeader/>
            <div className="flex justify-center">
                <div className="p-6">
                    <div className="flex justify-center sm:justify-start">
                        <DropdownMenu/>
                    </div>
                    <div className="team-profile-image mb-6 bg-primary-50 rounded-lg shadow-lg sm:w-[700px] h-[350px]">
                        <div className="text-lg sm:text-left text-center font-bold p-6">
                            팀 프로필 사진
                        </div>
                        <div className = "flex items-center justify-center">
                            <div className="inner bg-white p-3 rounded-lg text-center w-[200px]">
                                <div className="w-40 h-40 bg-primary-50 mx-auto flex items-center justify-center text-gray-500 rounded mb-4">
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
                                <button onClick={triggerFileInput} className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-700">
                                    사진 수정
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="team-intro mb-6 bg-primary-50 rounded-lg shadow-lg ">
                        <div className="flex justify-between items-center p-6">
                            <div className="text-lg font-bold text-center align-middle">팀 소개글</div>
                            <button className="bg-primary-500 text-white rounded px-4 py-2 hover:bg-primary-700">수정하기</button>
                        </div>
                        <div className="px-6 pb-6">
                            <Editor/>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-primary-700 text-white m-2 px-4 py-2 rounded hover:bg-primary-500">
                            수정완료
                        </button>
                        <button className="bg-primary-900 text-white m-2 px-4 py-2 rounded hover:bg-primary-600">
                            돌아가기
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default TeamInfoEdit;