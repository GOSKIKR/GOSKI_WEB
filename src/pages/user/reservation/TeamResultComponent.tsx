import React from "react";

interface TeamResultComponentProps {
  data: {
    id: string;
    name: string;
    location: string;
    type: string;
    participant: number;
    date: string;
    time: string;
    level: number;
  };
  goToTeamDetail: () => void;
}

const TeamResultComponent: React.FC<TeamResultComponentProps> = ({
  data,
  goToTeamDetail,
}) => {
  return (
    <div
      key={data.id}
      className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={goToTeamDetail}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{data.name}</h3>
        <span className="text-gray-500 text-sm">{data.location}</span>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div>
          <span className="text-gray-500 mr-2">Type:</span>
          <span>{data.type}</span>
        </div>
        <div>
          <span className="text-gray-500 mr-2">Participants:</span>
          <span>{data.participant}</span>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div>
          <span className="text-gray-500 mr-2">Date:</span>
          <span>{data.date}</span>
        </div>
        <div>
          <span className="text-gray-500 mr-2">Time:</span>
          <span>{data.time}</span>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div>
          <span className="text-gray-500 mr-2">Level:</span>
          <span>{data.level}</span>
        </div>
      </div>
    </div>
  );
};

export default TeamResultComponent;
