import React from "react";
import NavbarInstructor from "../../../components/common/NavbarInstructor";
import TeamManageHeader from "../../../components/instructor/manage/TeamManageHeader";
import DropdownMenu from "../../../components/instructor/manage/TeamListDropdown";
import TeamLessonFeeInfo from "../../../components/instructor/manage/TeamLessonFeeInfo";
import LessonFeeByGroup from "../../../components/instructor/manage/LessonFeeByGroup";
import LessonFeeByLevel from "../../../components/instructor/manage/LessonFeeByLevel";
import LessonFeeByInstructor from "../../../components/instructor/manage/LessonFeeByInstructor";

const TeamLessonFeeSetting : React.FC = () => {


    return (
        <div>
            <NavbarInstructor/>
            <TeamManageHeader/>
            <div className="flex justify-center">
                <div className="p-6">
                    <DropdownMenu/>
                    <TeamLessonFeeInfo/>
                    <div className="flex justify-between">
                        <LessonFeeByGroup/>
                        <LessonFeeByLevel/>
                    </div>
                    <div className="text-customRed my-6">
                        *지정강습비 추가금액은 강습 1건 기준입니다.
                    </div>
                    <LessonFeeByInstructor/>
                </div>
            </div>
            <div className="flex justify-center">
                <button className="bg-primary-700 text-white m-2 px-4 py-2 rounded">
                    수정완료
                </button>
                <button className="bg-primary-900 text-white m-2 px-4 py-2 rounded">
                    돌아가기
                </button>
            </div>
        </div>
    )
}

export default TeamLessonFeeSetting