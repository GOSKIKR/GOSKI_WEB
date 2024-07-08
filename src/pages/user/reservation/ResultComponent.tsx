import React from "react";

import TeamResultComponent from "./TeamResultComponent";
import InstructorResultComponent from "./InstructorResultComponent";

interface ResultComponentProps {
  filteredData: any;
  level: number;
  goToTeamDetail: any;
  goToInstructorDetail: any;
}

const ResultComponent: React.FC<ResultComponentProps> = ({
  filteredData,
  level,
  goToTeamDetail,
  goToInstructorDetail,
}) => {
  return (
    <div className="flex pt-4 w-11/12 items-center">
      {filteredData.map((data: any) =>
        level === 1 ? (
          <div key={data.id} className="w-full">
            <TeamResultComponent data={data} goToTeamDetail={goToTeamDetail} />
          </div>
        ) : (
          <div key={data.id} className="w-1/3">
            <InstructorResultComponent
              data={data}
              goToInstructorDetail={goToInstructorDetail}
            />
          </div>
        )
      )}
    </div>
  );
};

export default ResultComponent;
