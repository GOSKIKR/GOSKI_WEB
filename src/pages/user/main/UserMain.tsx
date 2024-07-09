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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await apiClient.get("/user/main");
  //       setData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full">
        {innerWidth > 640 ? <NavbarUser /> : <NavbarUserMobile />}
      </div>
      <div className="w-full">
        <ADCarousel />
      </div>
      <div className=" w-full bg-primary-50 rounded-lg shadow-lg p-8">
        <ReservationBox />
      </div>
      <div className="w-full">
        <TeamAD />
      </div>
      <Footer />
    </div>
  );
};

export default UserMain;
