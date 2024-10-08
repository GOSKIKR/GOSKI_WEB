import React, { useState, useEffect } from "react";
import NavbarInstructor from "../../../components/common/NavbarInstructor";
import TeamManageHeader from "../../../components/instructor/manage/TeamManageHeader";
import DropdownMenu from "../../../components/instructor/manage/TeamListDropdown";
import TeamLessonFeeInfo from "../../../components/instructor/manage/TeamLessonFeeInfo";
import LessonFeeByGroup from "../../../components/instructor/manage/LessonFeeByGroup";
import LessonFeeByLevel from "../../../components/instructor/manage/LessonFeeByLevel";
import LessonFeeByInstructor from "../../../components/instructor/manage/LessonFeeByInstructor";
import NavbarInstructorMobile from "../../../components/common/NavbarInstructorMobile";
import { TeamInstInfoDTO } from "../../../dto/TeamDTO";
import { TeamService } from "../../../api/TeamService";

const teamService = new TeamService();

const TeamLessonFeeSetting: React.FC = () => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [oneOnOneFee, setOneOnOneFee] = useState(0); // 초기값 설정 -> api불러와야함
    const [oneOnTwoFee, setOneOnTwoFee] = useState(0);
    const [oneOnThreeFee, setOneOnThreeFee] = useState(0);
    const [oneOnFourFee, setOneOnFourFee] = useState(0);
    const [oneOnNFee, setOneOnNFee] = useState(0);
    const [intermediateFee, setIntermediateFee] = useState(0);
    const [advancedFee, setAdvancedFee] = useState(0);
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
    const [teamInstInfo, setTeamInstInfo] = useState<TeamInstInfoDTO[] | null>(null);

    const submitUpdate = async() => {
        const map: { [key: number]: number } = {};
        if(teamInstInfo) {
            for(const dto of teamInstInfo) {
                map[dto.userId] = dto.designatedFee;
            }
            const data = {
                teamCost: oneOnOneFee,
                oneTwoFee: oneOnTwoFee,
                oneThreeFee: oneOnThreeFee,
                oneFourFee: oneOnFourFee,
                oneNFee: oneOnOneFee,
                intermediateFee: intermediateFee,
                advancedFee: advancedFee,
                designatedFees: map, // Object 형태로 변환
            };
            console.log(data);
            await teamService.updateTeamLessonFee(teamInstInfo[0].teamId, data);
        }
    };

    const handleResize = () => {
        setInnerWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });

    return (
        <div>
            {innerWidth > 640 ? <NavbarInstructor /> : <NavbarInstructorMobile />}
            <TeamManageHeader />
            <div className="flex justify-center">
                <div className="p-6">
                    <div className="flex justify-center sm:justify-start">
                        <DropdownMenu 
                            setOneOnOneFee={setOneOnOneFee}
                            setOneOnTwoFee={setOneOnTwoFee}
                            setOneOnThreeFee={setOneOnThreeFee}
                            setOneOnFourFee={setOneOnFourFee}
                            setOneonNFee={setOneOnNFee}
                            setBasicFee={setOneOnOneFee}
                            setIntermediateFee={setIntermediateFee}
                            setAdvancedFee={setAdvancedFee}
                            setTeamInstInfo={setTeamInstInfo}
                        />
                    </div>
                    <TeamLessonFeeInfo />
                    <div className="sm:flex sm:justify-between">
                        <div className="flex justify-center">
                            <LessonFeeByGroup 
                                oneOnOneFee={oneOnOneFee}
                                oneOnTwoFee={oneOnTwoFee}
                                oneOnThreeFee={oneOnThreeFee}
                                oneOnFourFee={oneOnFourFee}
                                oneOnNFee={oneOnNFee}
                                setOneOnOneFee={setOneOnOneFee}
                                setOneOnTwoFee={setOneOnTwoFee}
                                setOneOnThreeFee={setOneOnThreeFee}
                                setOneOnFourFee={setOneOnFourFee}
                                setOneonNFee={setOneOnNFee}
                                isEditing={isEditing}
                            />
                        </div>
                        <div className="flex justify-center">
                        <LessonFeeByLevel 
                            basicFee={oneOnOneFee}
                            intermediateFee={intermediateFee}
                            advancedFee={advancedFee}
                            setIntermediateFee={setIntermediateFee}
                            setAdvancedFee={setAdvancedFee}
                            isEditing={isEditing} 
                        />
                        </div>
                    </div>
                    <div className="text-customRed my-6 sm:text-left text-center">
                        *지정강습비 추가금액은 강습 1건 기준입니다.
                    </div>
                    <LessonFeeByInstructor 
                        isEditing={!isEditing}
                        teamInstInfo={teamInstInfo}
                        setTeamInstInfo={setTeamInstInfo}
                        />
                </div>
            </div>
            <div className="flex justify-center">
                <button 
                    className={`m-2 px-4 py-2 rounded sm:w-[200px] ${isEditing ? 'bg-primary-600' : 'bg-primary-500'} text-white hover:bg-primary-500`} 
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {!isEditing ? '수정완료' : '수정하기'}
                </button>
                <button 
                    className="bg-primary-900 text-white m-2 px-4 py-2 rounded sm:w-[200px] hover:bg-primary-600"
                    onClick={submitUpdate}
                >
                    저장하기
                </button>
            </div>
        </div>
    );
};

export default TeamLessonFeeSetting;
