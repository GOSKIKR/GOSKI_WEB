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
        <div className="flex flex-wrap justify-start gap-3 mb-4 sm:mb-8">
            {teams.map((team) => (
                <button
                    key={team.teamId}
                    onClick={() => onSelectTeam(team.teamId)}
                    className={`sm:w-40 w-24 min-w-24 h-10 ${
                        selectedTeam === team.teamId
                            ? "bg-primary-700 text-white"
                            : "bg-white text-black"
                    } shadow-md text-sm px-3 rounded-lg flex items-center justify-center`}
                >
                    {team.teamName}
                </button>
            ))}
        </div>
    );
};

export default TeamSelect;
