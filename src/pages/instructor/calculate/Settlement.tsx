import React from "react";
import NavbarInstructor from "../../../components/common/NavbarInstructor";
import AccountList from "../../../components/instructor/calculate/AccountList";
import SettlementHistory from "../../../components/instructor/calculate/SettlementHistory";

const Settlement: React.FC = () => {
    return (
        <div>
            <NavbarInstructor />
            <div className="flex justify-center text-3xl font-bold mt-20">
                정산
            </div>
            <AccountList/>
            <SettlementHistory/>
        </div>
    );
}

export default Settlement;
