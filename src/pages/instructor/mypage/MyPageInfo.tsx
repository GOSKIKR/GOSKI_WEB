import React from "react";
import MyPageHeader from "../../../components/instructor/mypage/MyPageHeader";
import NavbarInstructor from "../../../components/common/NavbarInstructor";
import ProfilePage from "../../../components/instructor/mypage/ProfilePage";

const MyPageInfo : React.FC = () => {


    return (
        <div>
            <NavbarInstructor/>
            <MyPageHeader/>
            <ProfilePage/>
        </div>
    )
}

export default MyPageInfo;