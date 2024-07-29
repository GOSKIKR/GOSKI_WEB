import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Team, TeamInstInfoDTO, TeamInviteDTO } from "../../../dto/TeamDTO";
import { TeamService } from "../../../api/TeamService";


interface DropdownMenuProps {
    setProfileUrl?: (profileUrl: string) => void;
    setDescription?: (desc: string) => void;
    setOneOnOneFee?: (fee: number) => void;
    setOneOnTwoFee?: (fee: number) => void;
    setOneOnThreeFee?: (fee: number) => void;
    setOneOnFourFee?: (fee: number) => void;
    setOneonNFee?: (fee: number) => void;
    setBasicFee?: (fee: number) => void;
    setIntermediateFee?: (fee: number) => void;
    setAdvancedFee?: (fee: number) => void;
    setTeamInstInfo? : (feeInfo : TeamInstInfoDTO[]) => void;
    setInviteMembers? : (inviteInfo : TeamInviteDTO[]) => void;
    setTeamId? : (teamId : number) => void;
}

const teamService = new TeamService();

const DropdownMenu: React.FC<DropdownMenuProps> = ({
    setProfileUrl, setDescription,
    setOneOnOneFee, setOneOnTwoFee, setOneOnThreeFee, setOneOnFourFee, setOneonNFee,
    setBasicFee, setIntermediateFee, setAdvancedFee,setTeamInstInfo, setInviteMembers, setTeamId
}) => {
    const [teamList, setTeamList] = useState<Team[]>([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const location = useLocation();

    const fetchTeamList = async () => {
        const response = await teamService.getTeamList();
        if (response) {
            setTeamList(response);
            if (response.length > 0) {
                const defaultTeam = response[0];
                setSelectedTeam(defaultTeam);
                if(setTeamId) {
                    setTeamId(defaultTeam.teamId);
                }
                fetchTeamInfos(defaultTeam.teamId);
                fetchPendingApprovals(defaultTeam.teamId)
            }
        }
    };

    const fetchTeamInfos = async (teamId: number) => {
        const teamInfo = await teamService.getTeamInfo(teamId);
        if (teamInfo) {
            if (setProfileUrl) setProfileUrl(teamInfo.teamProfileImageUrl);
            if (setDescription) setDescription(teamInfo.description);
            if (setOneOnOneFee) setOneOnOneFee(teamInfo.teamCost);
            if (setOneOnTwoFee) setOneOnTwoFee(teamInfo.oneTwoFee);
            if (setOneOnThreeFee) setOneOnThreeFee(teamInfo.oneThreeFee);
            if (setOneOnFourFee) setOneOnFourFee(teamInfo.oneThreeFee);
            if (setOneonNFee) setOneonNFee(teamInfo.oneNFee);
            if (setBasicFee) setBasicFee(teamInfo.teamCost);
            if (setIntermediateFee) setIntermediateFee(teamInfo.intermediateFee);
            if (setAdvancedFee) setAdvancedFee(teamInfo.advancedFee);
        }
        const TeamInfoList = await teamService.getTeamInstInfoList(teamId);
        if(TeamInfoList && setTeamInstInfo){
            setTeamInstInfo(TeamInfoList)
        }
    };

    const fetchPendingApprovals = async (teamId : number) => {
        const pendingApprovals = await teamService.getPendingApprovalList(teamId);
        if(pendingApprovals && setInviteMembers){
            setInviteMembers(pendingApprovals);
        }
    }

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleTeamSelection =  async (team: Team) => {
        setSelectedTeam(team);
        await fetchTeamInfos(team.teamId);
        await fetchPendingApprovals(team.teamId)
        setDropdownVisible(false);
    };

    useEffect(() => {
        fetchTeamList();
        setDropdownVisible(false);
    }, [location.pathname]);

    return (
        <div className="relative mb-6 bg-primary-50 rounded-lg shadow-lg w-64">
            <div className="border-t text-center px-4 py-2 cursor-pointer" onClick={toggleDropdown}>
                {selectedTeam ? selectedTeam.teamName : '팀 리스트'} {dropdownVisible ? '▲' : '▼'}
            </div>
            {dropdownVisible && (
                <div className="absolute left-0 top-full text-center bg-primary-50 rounded-lg shadow-lg w-full z-1">
                    {teamList.map((team) => (
                        <div
                            key={team.teamId}
                            className="border-t px-4 py-2 cursor-pointer"
                            onClick={() => handleTeamSelection(team)}
                        >
                            {team.teamName}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropdownMenu;
