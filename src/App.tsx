import React from "react";
import Counter from "./components/Counter";
import UserMain from "./pages/user/main/UserMain";
import InstructorMain from "./pages/instructor/main/InstructorMain";
import Coupon from './components/user/coupon';
import { Route, Routes } from "react-router-dom";
import SetFilter from './pages/user/reservation/SetFilter';
import FilterResult from './pages/user/reservation/FilterResult';
import BeforePay from './pages/user/payment/BeforePay';
import Payment from './pages/user/payment/Payment';
import UserLessonlist from './components/user/UserLessonlist';
import UserModify from './components/user/UserModify';
import PayDetail from './pages/user/payment/PayDetail';
import UserMypage from './pages/user/mypage/UserMypage';
import LessonDetail from './pages/user/reservation/LessonDetail';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserMain />} />
        <Route path="/reserve/set" element={<SetFilter />} />
        <Route path="/reserve/result" element={<FilterResult />} />
        <Route path="/reserve/detail" element={<LessonDetail />} />
        <Route path="/user/payment/before" element={<BeforePay />} />
        <Route path="/user/payment/detail" element={<PayDetail />} />
        <Route path="/user/payment" element={<Payment />} />
        <Route path="/user/my" element={<UserMypage />} />
        <Route path="/instructor/main" element={<InstructorMain />} />

        <Route path="/counter" element={<Counter />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
