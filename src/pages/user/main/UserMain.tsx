import React, { useEffect, useState } from "react";
import apiClient from "../../../utils/config/axiosConfig";

import NavbarUser from "../../../components/common/NavbarUser";
import ADCarousel from "../../../components/user/ADCarousel";

const UserMain: React.FC = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/user/main");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  {
    /* {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>} */
  }
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <NavbarUser />
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex-1 w-full">
          <div className="w-full">
            <ADCarousel />
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="bg-white p-4 shadow">reservation</div>
        </div>
        <div className="flex-1 p-4">
          <div className="bg-white p-4 shadow">team</div>
        </div>
      </div>
      <div className="bg-gray-800 text-white p-4">footer</div>
    </div>
  );
};

export default UserMain;
