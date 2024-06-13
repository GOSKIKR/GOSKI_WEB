import React, {useState} from "react";
import TeamRegist from "./TeamRegist";
import TeamInfoEdit from "./TeamInfoEdit";
import TeamMember from "./TeamMember";
import TeamLessonFeeSetting from "./TeamLessonFeeSetting";

const TeamManagementMain : React.FC = () => {
    const [activeComponent, setActiveComponent] = useState<JSX.Element | null>(<TeamRegist/>);
    const [activeButton, setActiveButton] = useState<string>("teamRegist");

    const renderComponent = (componentName : string) => {
        setActiveButton(componentName);
        switch (componentName) {
            case "teamRegist":
                setActiveComponent(<TeamRegist/>);
                break;
            case "teamInfoEdit":
                setActiveComponent(<TeamInfoEdit/>)
                break;
            case "teamMember":
                setActiveComponent(<TeamMember/>)
                break;
            case "teamLessonFeeSetting":
                setActiveComponent(<TeamLessonFeeSetting/>)
                break;
            default:
                setActiveComponent(<TeamRegist/>)
                break;
        }
    }

    return (
        <div>
            <div className="flex justify-center items-center mx-10 mt-20" >
                <div className="text-left">
                    <span className="text-2xl font-bold mr-20">팀 관리</span>
                </div>
                <div className="text-right ml-10">
                    <span className={`ml-4 cursor-pointer ${activeButton === "teamRegist" ? "text-primary-700" : ""}`} 
                        onClick={() => renderComponent("teamRegist")}>팀 등록</span>
                    <span className={`ml-4 cursor-pointer ${activeButton === "teamInfoEdit" ? "text-primary-700" : ""}`} 
                        onClick={() => renderComponent("teamInfoEdit")}>팀 정보 수정</span>
                    <span className={`ml-4 cursor-pointer ${activeButton === "teamMember" ? "text-primary-700" : ""}`} 
                        onClick={() => renderComponent("teamMember")}>팀 정보 수정</span>
                    <span className={`ml-4 cursor-pointer ${activeButton === "teamLessonFeeSetting" ? "text-primary-700" : ""}`} 
                        onClick={() => renderComponent("teamLessonFeeSetting")}>팀 정보 수정</span>
                </div>
            </div>
            <div className="flex justify-center mt-10">
                {activeComponent}
            </div>
        </div>
    )
}

export default TeamManagementMain