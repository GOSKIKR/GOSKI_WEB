import React from "react";

interface InstructorResultComponentProps {
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
  goToInstructorDetail: () => void;
}

const InstructorResultComponent: React.FC<InstructorResultComponentProps> = ({
  data,
  goToInstructorDetail,
}) => {
  return (
    <div
      key={data.id}
      className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors duration-300"
      onClick={goToInstructorDetail}
    >
      <div className="flex items-center">
        <div className="flex-1">
          <h3 className="text-lg font-medium">{data.name}</h3>
          <p className="text-gray-500">{data.location}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-gray-500">{data.type}</span>
          <span className="text-gray-500">{data.participant} participants</span>
          <span className="text-gray-500">
            {data.date} at {data.time}
          </span>
          <span className="text-gray-500">Level {data.level}</span>
        </div>
      </div>
    </div>
  );
};

export default InstructorResultComponent;
