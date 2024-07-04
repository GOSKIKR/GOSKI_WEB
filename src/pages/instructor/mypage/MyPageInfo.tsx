import React,{useState, useEffect} from "react";
import MyPageHeader from "../../../components/instructor/mypage/MyPageHeader";
import NavbarInstructor from "../../../components/common/NavbarInstructor";
import ProfilePage from "../../../components/instructor/mypage/ProfilePage";
import NavbarInstructorMobile from "../../../components/common/NavbarInstructorMobile";

const MyPageInfo : React.FC = () => {
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
            <MyPageHeader/>
            <ProfilePage/>
        </div>
    )
}

export default MyPageInfo;