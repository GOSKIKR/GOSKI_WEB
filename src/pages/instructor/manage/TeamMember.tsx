import React, { useState, useEffect } from "react";
import TeamManageHeader from "../../../components/instructor/manage/TeamManageHeader";
import DropdownMenu from "../../../components/instructor/manage/TeamListDropdown";
import TeamMemberList from "../../../components/instructor/manage/TeamMemberList";
import TeamInviteList from "../../../components/instructor/manage/TeamInviteList";
import NavbarInstructor from "../../../components/common/NavbarInstructor";
import NavbarInstructorMobile from "../../../components/common/NavbarInstructorMobile";
import { TeamInstInfoDTO, TeamInviteDTO } from "../../../dto/TeamDTO";

const TeamMember: React.FC = () => {
    const [teamInstInfo, setTeamInstInfo] = useState<TeamInstInfoDTO[] | null>(null);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setInnerWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const inviteMembers: TeamInviteDTO[] = [
        { name: "장승호", phoneNumber: "010-9995-5107", enrollDate: "2024-06-18" },
        { name: "김승호", phoneNumber: "010-9995-5107", enrollDate: "2024-06-18" },
    ]

    return (
        <div>
            {innerWidth > 640 ? <NavbarInstructor /> : <NavbarInstructorMobile />}
            <TeamManageHeader />
            <div className="flex justify-center">
                <div className="p-6">
                    <div className="flex justify-center sm:justify-start">
                        <DropdownMenu setTeamInstInfo={setTeamInstInfo}/>
                    </div>
                    {teamInstInfo && <TeamMemberList members={teamInstInfo} setMembers={setTeamInstInfo} />}
                    <TeamInviteList inviteMembers={inviteMembers} />
                </div>
            </div>
        </div>
    );
};

export default TeamMember;
