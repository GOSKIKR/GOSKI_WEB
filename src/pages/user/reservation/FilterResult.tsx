import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarUser from "../../../components/common/NavbarUser";
import NavbarUserMobile from "../../../components/common/NavbarUserMobile";
import FilterComponent from "./FilterComponent";
import TeamResultComponent from "./TeamResultComponent";
import InstructorResultComponent from "./InstructorResultComponent";
import dummyData from "./FilterDummyData";
import ResultComponent from "./ResultComponent";

const FilterResult: React.FC = () => {
  const navigate = useNavigate();
  const filterState = useLocation().state as {
    type: string;
    location: string;
    participant: number;
    dateRange: [Date, Date] | null;
    startTime: string;
    entireTime: number;
    level: number;
  };

  const [type, setType] = useState(filterState.type);
  const [location, setLocation] = useState(filterState.location);
  const [participant, setParticipant] = useState(filterState.participant);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState(filterState.startTime);
  const [entireTime, setEntireTime] = useState(filterState.entireTime);
  const [level, setLevel] = useState(filterState.level);
  const [filteredData, setFilteredData] = useState(
    level === 1 ? dummyData.teams : dummyData.instructors
  );
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const applyFilter = () => {
    const newFilteredData =
      level === 1 ? dummyData.teams : dummyData.instructors;
    setFilteredData(newFilteredData);
  };

  const goToTeamDetail = () => {
    navigate("/reserve/info/team");
  };

  const goToInstructorDetail = () => {
    navigate("/reserve/info/instructor");
  };

  const handleSearch = () => {
    setIsSearchClicked(true);
  };

  return (
    <div>
      <div className="flex flex-col w-full">
        {innerWidth > 640 ? <NavbarUser /> : <NavbarUserMobile />}
      </div>
      <div className="flex flex-col w-full h-full items-center">
        <FilterComponent
          applyFilter={applyFilter}
          isSearchClicked={handleSearch}
        />
        <ResultComponent
          filteredData={filteredData}
          level={level}
          goToTeamDetail={goToTeamDetail}
          goToInstructorDetail={goToInstructorDetail}
        />
      </div>
    </div>
  );
};

export default FilterResult;
