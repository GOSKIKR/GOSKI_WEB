import React, { useEffect, useState } from "react";
import apiClient from "../../../utils/config/axiosConfig";

import NavbarUser from "../../../components/common/NavbarUser";
import ADCarousel from "../../../components/user/ADCarousel";
import Footer from "../../../components/common/Footer";
import ReservationBox from "../../../components/user/ResservationBox";
import TeamAD from "../../../components/user/TeamAD";

const UserMain: React.FC = () => {
  const [data, setData] = useState(null);

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
      <NavbarUser />
      <div className="w-full">
        <ADCarousel />
      </div>
      <div className="flex flex-col gap-10 w-4/5 self-center mt-20 mb-20">
        <ReservationBox />
        <TeamAD />
      </div>
      <Footer />
    </div>
  );
};

export default UserMain;
