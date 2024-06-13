import React from "react";
import Counter from "./components/Counter";
import UserMain from "./pages/user/main/UserMain";
import InstructorMain from "./pages/instructor/main/InstructorMain";
import Coupon from "./pages/user/coupon/coupon";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/user/auth/Login";
import ForgotPassword from "./pages/user/auth/ForgotPassword";
import Register from "./pages/user/auth/Register";
import DM from "./pages/user/dm/DM";
import SetFilter from "./pages/user/reservation/SetFilter";
import FilterResult from "./pages/user/reservation/FilterResult";
import BeforePay from "./pages/user/payment/BeforePay";
import Payment from "./pages/user/payment/Payment";
import UserLessonlist from "./pages/user/mypage/UserLessonlist";
import PayDetail from "./pages/user/payment/PayDetail";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserMain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/forgot-password" element={<ForgotPassword />} />
        <Route path="/login/register" element={<Register />} />

        <Route path="/dm" element={<DM />} />

        <Route path="/user/coupon" element={<Coupon />} />
        <Route path="/reserve/set" element={<SetFilter />} />
        <Route path="/reserve/result" element={<FilterResult />} />
        <Route path="/user/payment/before" element={<BeforePay />} />
        <Route path="/user/payment/detail" element={<PayDetail />} />
        <Route path="/user/payment" element={<Payment />} />
        <Route path="/user/lessonlist" element={<UserLessonlist />} />
        <Route path="/instructor/main" element={<InstructorMain />} />

        <Route path="/counter" element={<Counter />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
