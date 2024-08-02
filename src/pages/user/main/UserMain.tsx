import React, { useEffect, useState } from "react";
import apiClient from "../../../utils/config/axiosConfig";
import NavbarUser from "../../../components/common/NavbarUser";
import ADCarousel from "../../../components/user/ADCarousel";
import Footer from "../../../components/common/Footer";
import ReservationBox from "../../../components/user/ResservationBox";
import TeamAD from "../../../components/user/TeamAD";
import NavbarUserMobile from "../../../components/common/NavbarUserMobile";

const UserMain: React.FC = () => {
  const [data, setData] = useState(null);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="w-full">
        {innerWidth > 640 ? <NavbarUser /> : <NavbarUserMobile />}
      </div>
      <div className="container mx-auto px-5 max-w-screen-xl pt-8 bg-white ">
        <ADCarousel />
      </div>
      <div className="container mx-auto px-5 max-w-screen-xl pt-8 bg-white ">
        <ReservationBox />
        <div className="w-full my-16">
          <TeamAD />
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default UserMain;
