import React from "react";

import { MdHelpOutline } from 'react-icons/md'

const TeamLessonFeeInfo : React.FC = () => {


    return(
        <div className="flex justify-between w-[1100px] items-center">
            <button className="flex justify-center items-center p-2 bg-gray-300 rounded shadow-lg">
                강습비 계산 안내<MdHelpOutline/>
            </button>
            <div className="text-customRed">
                *결제금액은 1시간 기준입니다.
            </div>
        </div>
    )
}

export default TeamLessonFeeInfo;