import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarUser from "../../../components/common/NavbarUser";
import NavbarUserMobile from "../../../components/common/NavbarUserMobile";
import FilterComponent from "./FilterComponent";
import ResultComponent from "./ResultComponent";

import apiClient from "../../../utils/config/axiosConfig";

import {
    TeamsFilterResult,
    InstructorsFilterResult,
} from "../../../interface/ReservationTypes";

import userReserveStore from "../../../store/userReserveStore";
import teamInfoStore from "../../../store/teamInfoStore";
import instructorInfoStore from "../../../store/instructorInfoStore";

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

    const { setTeamInfo } = teamInfoStore();

    const { setInstructorInfo } = instructorInfoStore();

    const {
        resortName,
        resortId,
        lessonType,
        studentCount,
        lessonDate,
        startTime,
        duration,
        level,
    } = userReserveStore();

    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await apiClient().post(
                    "/lesson/reserve/novice",
                    {
                        resortId: resortId,
                        studentCount: studentCount,
                        lessonType: lessonType,
                        lessonDate: lessonDate,
                        startTime: startTime,
                        duration: duration,
                        level: level,
                    }
                );
                setBeginnerFilteredData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchInstructorData = async () => {
            try {
                const response = await apiClient().post(
                    "/lesson/reserve/advanced",
                    {
                        resortId: resortId,
                        studentCount: studentCount,
                        lessonType: lessonType,
                        lessonDate: lessonDate,
                        startTime: startTime,
                        duration: duration,
                        level: level,
                    }
                );
                setIntermediateFilteredData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (level === "BEGINNER") {
            fetchTeamData();
        } else {
            fetchInstructorData();
        }
    }, [level]);

    useEffect(() => {
        setSelectedResortName(resortName);
        setSelectedLessonType(lessonType);
        setSelectedStudentCount(studentCount);
        setSelectedLessonDate(lessonDate);
        setSelectedStartTime(startTime);
        setSelectedDuration(duration);
        setSelectedLevel(level);
    }, [
        resortName,
        lessonType,
        studentCount,
        lessonDate,
        startTime,
        duration,
        level,
    ]);

    useEffect(() => {
        if (selectedLevel === "BEGINNER") {
            setBeginnerFilteredData(beginnerFilteredData);
        } else {
            setIntermediateFilteredData(intermediateFilteredData);
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
        if (selectedLevel === "BEGINNER") {
            setBeginnerFilteredData(beginnerFilteredData);
        } else {
            setIntermediateFilteredData(intermediateFilteredData);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            {/* 전체 높이를 화면 크기로 설정 */}
            <div className="flex-none">
                {/* NavBar는 고정 크기 */}
                {innerWidth > 640 ? <NavbarUser /> : <NavbarUserMobile />}
            </div>
            <div className="flex-none">
                {/* FilterComponent도 고정 크기 */}
                <FilterComponent
                    selectedLessonType={selectedLessonType}
                    filteredData={
                        selectedLevel === "BEGINNER"
                            ? beginnerFilteredData
                            : intermediateFilteredData
                    }
                    handleSearchClick={handleSearch}
                />
            </div>
            <div className="flex-grow overflow-hidden">
                {/* ResultComponent가 남은 공간을 차지하고 overflow 처리 */}
                <ResultComponent
                    filteredData={
                        selectedLevel === "BEGINNER"
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
