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
    <div className="flex flex-col">
      <NavbarUser />
      <ADCarousel />
      <div className="flex-1 p-4">
        <ReservationBox />
      </div>
      <div className="flex-1 p-4">
        {/* <TeamAD /> */}
        <ADCarousel />
      </div>
      <Footer />
    </div>
  );
};

export default UserMain;
