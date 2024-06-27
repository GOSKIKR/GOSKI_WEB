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
        {
          // 화면 너비가 640px 이하일 때 모바일 네비게이션을 보여줍니다.
          window.innerWidth < 640 ? <NavbarUserMobile /> : <NavbarUser />
        }
      </div>
      <div className="w-full">
        <ADCarousel />
      </div>
      <div className="flex flex-col gap-6 w-4/5 self-center mt-10 mb-16">
        <ReservationBox />
        <TeamAD />
      </div>
      <Footer />
    </div>
  );
};

export default UserMain;
