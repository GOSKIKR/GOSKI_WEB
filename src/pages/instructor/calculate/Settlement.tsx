import React,{useState, useEffect} from "react";
import NavbarInstructor from "../../../components/common/NavbarInstructor";
import AccountList from "../../../components/instructor/calculate/AccountList";
import SettlementHistory from "../../../components/instructor/calculate/SettlementHistory";
import NavbarInstructorMobile from "../../../components/common/NavbarInstructorMobile";

const Settlement: React.FC = () => {
    const[innerWidth,setInnerWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setInnerWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize",handleResize);
        return(() => window.removeEventListener("resize",handleResize))
    })

    return (
        <div>
            {innerWidth > 640 ? <NavbarInstructor/>  : <NavbarInstructorMobile/>}
            <div className="flex justify-center sm:text-3xl text-xl font-bold mt-20">
                정산
            </div>
            <AccountList/>
            <SettlementHistory/>
        </div>
    );
}

export default Settlement;
