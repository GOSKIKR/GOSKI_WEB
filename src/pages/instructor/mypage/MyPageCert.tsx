import React from "react";
import MyPageHeader from "../../../components/instructor/mypage/MyPageHeader";
import NavbarInstructor from "../../../components/common/NavbarInstructor";
import CertificatePage from "../../../components/instructor/mypage/CertificatePage";

const MyPageCert : React.FC = () => {


    return (
        <div>
            <NavbarInstructor/>
            <MyPageHeader/>
            <CertificatePage/>
        </div>
    )
}

export default MyPageCert;