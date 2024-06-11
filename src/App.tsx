import React from "react";
import Counter from "./components/Counter";
import UserMain from "./pages/user/main/UserMain";
import InstructorMain from "./pages/instructor/main/InstructorMain";
import Coupon from "./pages/user/coupon/coupon";
import { Route, Routes } from "react-router-dom";
import SetFilter from "./pages/user/reservation/SetFilter";
import FilterResult from "./pages/user/reservation/FilterResult";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserMain />} />
        <Route path="/user/coupon" element={<Coupon />} />
        <Route path="/reserve/set" element={<SetFilter />} />
        <Route path="/reserve/result" element={<FilterResult />} />
        <Route path="/instructor/main" element={<InstructorMain />} />

        <Route path="/counter" element={<Counter />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
