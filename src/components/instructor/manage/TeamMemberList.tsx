import React,{useState,useEffect} from "react";
import { TeamMemberDTO } from "../../../dto/TeamMemberDTO";
import { FiMoreHorizontal } from 'react-icons/fi';

interface TeamMemberListProps {
    members : TeamMemberDTO[];
}


const TeamMemberList : React.FC<TeamMemberListProps> = ({members}) => {

    const [modalVisible,setModalVisible] = useState(false);
    const [modalPosition, setModalPosition] = useState({top: 0, left:0});

    const handleIconClick = (event : React.MouseEvent) => {
        event.stopPropagation();
        const rect = event.currentTarget.getBoundingClientRect();
        setModalPosition({top: rect.top + window.scrollY, left: rect.left + window.scrollX + rect.width -20 })
        setModalVisible(!modalVisible)
    }


    useEffect(() => {
        const handleClickOutside = () => {
            setModalVisible(false);
        }

        if (modalVisible){
            window.addEventListener("click",handleClickOutside)
        }

        return () => {
            window.removeEventListener("click",handleClickOutside)
        }
    })

    return (
        <div className="team-member mb-6 bg-primary-100 rounded-lg w-[1200px]">
            <div className="flex justify-between items-center p-6">
                <div className="text-lg font-bold">고승민의 스키교실 <span className="text-black">({members.length}명)</span></div>
                <div className="space-x-2">
                    <button className="bg-primary-500 text-white rounded px-4 py-2">수정하기</button>
                    <button className="bg-primary-700 text-white rounded px-4 py-2">저장하기</button>
                </div>
            </div>
            <table className="min-w-full rounded">
                <thead className="bg-primary-100">
                    <tr>
                        <th className="w-1/8 py-2 text-center">직책</th>
                        <th className="w-1/8 py-2 text-center">강사 프로필</th>
                        <th className="w-1/8 py-2 text-center">지정 단가</th>
                        <th className="w-2/8 py-2 text-center">권한</th>
                        <th className="w-3/8 py-2 text-center">전화번호</th>
                    </tr>
                </thead>
                <tbody className="text-center items-center">
                    {members.map((member, index) => (
                        <tr key={index} className="border-t bg-primary-100">
                            <td className="py-2 px-4">
                                <button className="bg-gray-100 text-gray-800 rounded px-2 py-1">
                                    {member.role}
                                </button>
                            </td>
                            <td className="py-2 px-4 flex justify-center items-center">
                                <div className="w-8 h-8 bg-gray-100 rounded-full mr-2"></div>
                                {member.name}
                            </td>
                            <td className="py-2 px-4">{member.price}</td>
                            <td className="py-2 px-4">
                                <span className="text-primary-900 cursor-pointer">팀 초대</span> | 
                                <span className="text-primary-900 cursor-pointer"> 팀 스케줄 추가</span> | 
                                <span className="text-black cursor-pointer"> 팀 스케줄 조정</span> | 
                                <span className="text-black cursor-pointer"> 팀 스케줄 삭제</span>
                            </td>
                            <td className="py-2 px-4">{member.phoneNumber}</td>
                            <td className="py-2 px-4 cursor-pointer" onClick={handleIconClick}><FiMoreHorizontal /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalVisible && (
                <div
                className="absolute bg-white border rounded shadow-lg p-4"
                style={{ top: modalPosition.top, left: modalPosition.left }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col space-y-2">
                    <button className="text-left text-customRed">팀원삭제</button>
                </div>
            </div>
            )}
        </div>
        
    )
}

export default TeamMemberList