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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full">
        {innerWidth > 640 ? <NavbarUser /> : <NavbarUserMobile />}
      </div>
      <div className="w-full mt-4">
        <ADCarousel />
      </div>
      <div className="w-full mt-8 p-8 bg-white rounded-lg shadow-md">
        <ReservationBox />
      </div>
      <div className="w-full mt-8">
        <TeamAD />
      </div>
      <div className="w-full mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default UserMain;
