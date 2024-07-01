import React,{useState} from "react";
import LessonFeeInfoModal from "./LessonFeeInfoModal";

import { MdHelpOutline } from 'react-icons/md'

const TeamLessonFeeInfo : React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }


    return(
        <div className="flex flex-col sm:flex-row sm:justify-between sm:w-[1100px] items-center">
            <button 
                className="flex justify-center items-center p-2 bg-gray-300 rounded shadow-lg sm:ml-0 mr-3"
                onClick={openModal}
                >
                강습비 계산 안내<MdHelpOutline/>
            </button>
            <div className="text-customRed">
                *결제금액은 1시간 기준입니다.
            </div>
            {modalVisible && <LessonFeeInfoModal onClose={closeModal}/>}

        </div>
    )
}

export default TeamLessonFeeInfo;