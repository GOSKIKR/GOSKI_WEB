import React, {useState, useEffect} from "react"
import { useLocation } from "react-router-dom";
import { Team } from "../../../dto/TeamDTO";
import { TeamService } from "../../../api/TeamService";

const teamService = new TeamService();

const DropdownMenu: React.FC = () => {
    const [teamList, setTeamList] = useState<Team[]>();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const location = useLocation();

    const fetchTeamList = async() => {
        const response = await teamService.getTeamList();
        if(response) {
            setTeamList(response)
        }
    }

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    }

    useEffect(() => {
        fetchTeamList();
        setDropdownVisible(false);
    },[location.pathname])

    return (
        <div className="relative mb-6 bg-primary-50 rounded-lg shadow-lg w-64">
            <div className="border-t text-center px-4 py-2 cursor-pointer" onClick={toggleDropdown}>
                팀 리스트 {dropdownVisible ? '▲' : '▼'}
            </div>
            {dropdownVisible && (
                <div className="absolute left-0 top-full text-center bg-primary-50 rounded-lg shadow-lg w-full z-1">
                    {teamList?.map((team) => (
                        <div key={team.teamId} className="border-t px-4 py-2">
                            {team.teamName}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropdownMenu;
