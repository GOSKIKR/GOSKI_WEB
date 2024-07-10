import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarUser from "../../../components/common/NavbarUser";
import NavbarUserMobile from "../../../components/common/NavbarUserMobile";
import FilterComponent from "./FilterComponent";
import dummyData from "./FilterDummyData";
import ResultComponent from "./ResultComponent";

import userReserveStore from "../../../store/userReserveStore";

interface Resort {
  resortId: number;
  resortName: string;
  lessonType: string; //'SKI' | 'BOARD';
  studentCount: number;
  lessonDate: string; // 'YYYY-MM-DD';
  startTime: string; // 'hhmm';
  duration: number;
  level: string; //'beginner' | 'intermediate' | 'advanced'
}

type reserveData = {
  resortName: string;
  lessonType: string; //'SKI' | 'BOARD';
  studentCount: number;
  lessonDate: string; // 'YYYY-MM-DD';
  startTime: string; // 'hhmm';
  duration: number;
  level: string; //'beginner' | 'intermediate' | 'advanced'
};

type TeamsFilterResult = {
  teamId: number;
  teamName: string;
  description: string;
  cost: number;
  teamProfileUrl: string;
  rating: number;
  instructors: number[];
  teamImages: {
    teamImageId: number;
    imageUrl: string;
  }[];
  basicFee: number;
  peopleOptionFee: number;
  designatedFee: number;
  levelOptionFee: number;
  lessonType: string;
  reviewCount: number;
  reviews: {
    reviewId: number;
    rating: number;
    content: string;
    createdAt: string;
    instructorTags: {
      tagReviewId: number;
      tagName: string;
    }[];
  }[];
};

type InstructorsFilterResult = {
  instructorId: number;
  userName: string;
  teamId: number;
  teamName: string;
  position: string;
  description: string;
  instructorUrl: string;
  gender: string;
  certificateInfo: {
    certificateId: number;
    certificateName: string;
    certificateType: string;
    certificateImageUrl: string;
  }[];
  rating: number;
  reviewCount: number;
  cost: number;
  basicFee: number;
  peopleOptionFee: number;
  designatedFee: number;
  levelOptionFee: number;
  lessonType: string;
  reviews: {
    reviewId: number;
    rating: number;
    content: string;
    createdAt: string;
    instructorTags: {
      tagReviewId: number;
      tagName: string;
    }[];
  }[];
};

const FilterResult: React.FC = () => {
  const navigate = useNavigate();

  const [selectedResortName, setSelectedResortName] = useState("");
  const [selectedLessonType, setSelectedLessonType] = useState("");
  const [selectedStudentCount, setSelectedStudentCount] = useState(0);
  const [selectedLessonDate, setSelectedLessonDate] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState("");

  const [beginnerFilteredData, setBeginnerFilteredData] = useState<
    TeamsFilterResult[]
  >([]);
  const [intermediateFilteredData, setIntermediateFilteredData] = useState<
    InstructorsFilterResult[]
  >([]);

  const {
    resortName,
    lessonType,
    studentCount,
    lessonDate,
    startTime,
    duration,
    level,
  } = userReserveStore();

  useEffect(() => {
    setSelectedResortName(resortName);
    setSelectedLessonType(lessonType);
    setSelectedStudentCount(studentCount);
    setSelectedLessonDate(lessonDate);
    setSelectedStartTime(startTime);
    setSelectedDuration(duration);
    setSelectedLevel(level);
  }, []);

  useEffect(() => {
    if (selectedLevel === "beginner") {
      setBeginnerFilteredData(dummyData.teamsData);
    } else {
      setIntermediateFilteredData(dummyData.intermediateInstructorsData);
    }
  }, [selectedLevel]); // selectedLevel을 의존성 배열에 추가

  const goToTeamDetail = () => {
    navigate("/reserve/info/team");
  };

  const goToInstructorDetail = () => {
    navigate("/reserve/info/instructor");
  };

  //필터 적용 함수

  // lessontype handler
  const handleLessonType = (e: any) => {
    setSelectedLessonType(e.target.value);
  };

  // student count handler
  const handleStudentCount = (e: any) => {
    setSelectedStudentCount(e.target.value);
  };

  // lesson date handler
  const handleLessonDate = (e: any) => {
    setSelectedLessonDate(e.target.value);
  };

  // start time handler
  const handleStartTime = (e: any) => {
    setSelectedStartTime(e.target.value);
  };

  // duration handler
  const handleDuration = (e: any) => {
    setSelectedDuration(e.target.value);
  };

  // level handler
  const handleLevel = (e: any) => {
    setSelectedLevel(e.target.value);
  };

  //검색 버튼 클릭 시 함수
  const handleSearch = () => {
    //api 연결 부분
    // 대신 dummyData 사용
    if (selectedLevel === "beginner") {
      setBeginnerFilteredData(dummyData.teamsData);
    } else {
      setIntermediateFilteredData(dummyData.intermediateInstructorsData);
    }
  };

  return (
    <div>
      <div className="flex flex-col w-full">
        {innerWidth > 640 ? <NavbarUser /> : <NavbarUserMobile />}
      </div>
      <div className="flex flex-col w-full h-full items-center">
        <FilterComponent
          selectedLessonType={selectedLessonType}
          filteredData={
            selectedLevel === "beginner"
              ? beginnerFilteredData
              : intermediateFilteredData
          }
          handleSearchClick={handleSearch}
        />
        <ResultComponent
          filteredData={
            selectedLevel === "beginner"
              ? beginnerFilteredData
              : intermediateFilteredData
          }
          selectedLevel={selectedLevel}
          goToTeamDetail={goToTeamDetail}
          goToInstructorDetail={goToInstructorDetail}
        />
      </div>
    </div>
  );
};

export default FilterResult;
