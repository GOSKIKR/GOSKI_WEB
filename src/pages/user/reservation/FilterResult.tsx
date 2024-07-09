import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarUser from "../../../components/common/NavbarUser";
import NavbarUserMobile from "../../../components/common/NavbarUserMobile";
import FilterComponent from "./FilterComponent";
import dummyData from "./FilterDummyData";
import ResultComponent from "./ResultComponent";

import useStore from "../../../store/store";

const FilterResult: React.FC = () => {
  const navigate = useNavigate();

  const { type, location, participants, date, startTime, duration, level } =
    useStore();

  const [selectedType, setType] = useState(type);
  const [selectedLocation, setLocation] = useState(location);
  const [participant, setParticipant] = useState(participants);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedStartTime, setStartTime] = useState(startTime);
  const [entireTime, setEntireTime] = useState(duration);
  const [selectedLevel, setLevel] = useState(level);
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
