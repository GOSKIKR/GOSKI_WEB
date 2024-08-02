import React from "react";

import TeamResultComponent from "./TeamResultComponent";
import InstructorResultComponent from "./InstructorResultComponent";

import {
  TeamsFilterResult,
  InstructorsFilterResult,
} from "../../../interface/ReservationTypes";

interface ResultComponentProps {
  filteredData: (TeamsFilterResult | InstructorsFilterResult)[];
  selectedLevel: string;
  goToTeamDetail: any;
  goToInstructorDetail: any;
}

const ResultComponent: React.FC<ResultComponentProps> = ({
  filteredData,
  selectedLevel,
  goToTeamDetail,
  goToInstructorDetail,
}) => {
  console.log(filteredData);
  return (
    <div className="h-full w-full overflow-y-auto  pb-12 items-center justify-center">
      {filteredData.length !== 0 && filteredData ? (
        selectedLevel === "BEGINNER" ? (
          <div className="flex flex-col items-center overflow-auto justify-center">
            {filteredData.map((data: any) => (
              <TeamResultComponent
                key={data.teamId}
                data={data}
                goToTeamDetail={goToTeamDetail}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-row w-full items-center overflow-auto">
            {filteredData.map((data: any) => (
              <InstructorResultComponent
                key={data.instructorId}
                data={data}
                goToInstructorDetail={goToInstructorDetail}
              />
            ))}
          </div>
        )
      ) : (
        //데이터가 없을 때
        <div className="flex flex-col w-full items-center p-2">
          <div className="text-2xl font-semibold">검색 결과가 없습니다.</div>
        </div>
      )}
    </div>
  );
};

export default ResultComponent;
