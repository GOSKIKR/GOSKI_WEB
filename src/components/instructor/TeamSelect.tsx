import React from "react";
import { Team } from "../../dto/TeamDTO";

interface TeamSelectorProps {
    teams: Team[];
    selectedTeam: number | null;
    onSelectTeam: (teamId: number) => void;
}

const TeamSelect: React.FC<TeamSelectorProps> = ({
    teams,
    selectedTeam,
    onSelectTeam,
}) => {
    return (
        <div className="flex sm:space-x-4 justify-between sm:px-20 mb-4 sm:mb-8">
            {teams.map((team) => (
                <button
                    key={team.teamId}
                    onClick={() => onSelectTeam(team.teamId)}
                    className={`sm:w-52 w-16 h-10 ${
                        selectedTeam === team.teamId
                            ? "bg-primary-700 text-white"
                            : "bg-white text-black"
                    } text-sm px-3 rounded-lg flex items-center justify-center`}
                >
                    {team.teamName}
                </button>
            ))}
        </div>
    );
};

export default TeamSelect;
