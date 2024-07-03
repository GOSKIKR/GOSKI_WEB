import React, { useState } from "react";
import NavbarUser from "../../../components/common/NavbarUser";
import UserMypageMenu from "../../../components/user/UserMypageMenu";
import Coupon from "../../../components/user/coupon";
import UserLessonlist from "../../../components/user/UserLessonlist";
import UserModify from "../../../components/user/UserModify";

const UserMypage: React.FC = () => {
    const [activePage, setActivePage] = useState<string>("home");

    const renderActivePage = () => {
        switch (activePage) {
            case "coupon":
                return <Coupon />;
            case "lessonHistory":
                return <UserLessonlist />;
            case "modify":
                return <UserModify />;
            default:
                return <UserLessonlist />;
        }
    };

    return (
        <div className="w-screen flex flex-col items-center">
            <NavbarUser />
            <UserMypageMenu
                activePage={activePage}
                setActivePage={setActivePage}
            />
            <div className="content sm:w-4/6 w-5/6">{renderActivePage()}</div>
        </div>
    );
};

export default UserMypage;
