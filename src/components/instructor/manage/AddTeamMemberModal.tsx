import React, { useState } from "react";
import TeamMember from "../../../interface/TeamMember";

interface AddTeamMemberModalProps {
    onClose: () => void;
    onSave: (member: TeamMember) => void;
}

const AddTeamMemberModal: React.FC<AddTeamMemberModalProps> = ({ onClose, onSave }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("교육팀장");
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        onSave({ name, phone, role, image });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-[400px]">
                <h2 className="text-2xl font-bold mb-4">팀원 추가</h2>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">이름</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">전화번호</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">역할</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="교육팀장">교육팀장</option>
                        <option value="코치">코치</option>
                        <option value="강사">강사</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1">사진</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-2 border rounded"
                    />
                    {image && (
                        <img src={image as string} alt="프로필 사진" className="w-full h-40 object-cover rounded mt-2" />
                    )}
                </div>
                <div className="flex justify-end">
                    <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
                        취소
                    </button>
                    <button onClick={handleSave} className="bg-primary-700 text-white px-4 py-2 rounded">
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTeamMemberModal;
