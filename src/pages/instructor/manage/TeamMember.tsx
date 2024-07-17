import React,{useState, useEffect} from "react";
import TeamManageHeader from "../../../components/instructor/manage/TeamManageHeader";
import DropdownMenu from "../../../components/instructor/manage/TeamListDropdown";
import { TeamMemberDTO } from "../../../dto/TeamDTO";
import { TeamInviteDTO } from "../../../dto/TeamDTO";
import TeamMemberList from "../../../components/instructor/manage/TeamMemberList";
import TeamInviteList from "../../../components/instructor/manage/TeamInviteList";
import NavbarInstructor from "../../../components/common/NavbarInstructor";
import NavbarInstructorMobile from "../../../components/common/NavbarInstructorMobile";

const TeamMember: React.FC = () => {
    const[innerWidth,setInnerWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setInnerWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize",handleResize);
        return(() => window.removeEventListener("resize",handleResize))
    },[])

    const members: TeamMemberDTO[] = [
        { role: "교육팀장", name: "고승민", price: "+100,000원", phoneNumber: "010-9995-5107" },
        { role: "팀장", name: "유제훈", price: "+100,000원", phoneNumber: "010-9995-5107" },
        { role: "강사", name: "송준석", price: "+100,000원", phoneNumber: "010-9995-5107" },
        { role: "강사", name: "임종율", price: "+100,000원", phoneNumber: "010-9995-5107" },
        { role: "강사", name: "김태훈", price: "+100,000원", phoneNumber: "010-9995-5107" },
    ];
    
    const inviteMembers : TeamInviteDTO[] = [
        { name: "장승호",  phoneNumber: "010-9995-5107",enrollDate : "2024-06-18" },
        { name: "김승호",  phoneNumber: "010-9995-5107" ,enrollDate : "2024-06-18" },
    ]

    

    return (
        <div>
            {innerWidth > 640 ? <NavbarInstructor/>  : <NavbarInstructorMobile/>}
            <TeamManageHeader />
            <div className="flex justify-center">
                <div className="p-6">
                    <div className="flex justify-center sm:justify-start">
                        <DropdownMenu/>
                    </div>
                    <TeamMemberList members={members}/>
                    <TeamInviteList inviteMembers={inviteMembers}/>
                </div>
            </div>

        </div>
    );
};

export default TeamMember;
