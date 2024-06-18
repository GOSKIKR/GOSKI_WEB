import React from "react";
import Counter from "./components/Counter";
import UserMain from "./pages/user/main/UserMain";
import InstructorMain from "./pages/instructor/main/InstructorMain";
import Coupon from './components/user/coupon';
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/user/auth/Login";
import ForgotPassword from "./pages/user/auth/ForgotPassword";
import Register from "./pages/user/auth/Register";
import DM from "./pages/user/dm/DM";
import SetFilter from './pages/user/reservation/SetFilter';
import FilterResult from './pages/user/reservation/FilterResult';
import BeforePay from './pages/user/payment/BeforePay';
import Payment from './pages/user/payment/Payment';
import UserLessonlist from './components/user/UserLessonlist';
import UserModify from './components/user/UserModify';
import PayDetail from './pages/user/payment/PayDetail';
import UserMypage from './pages/user/mypage/UserMypage';
import LessonDetail from './pages/user/reservation/LessonDetail';
import TeamRegist from "./pages/instructor/manage/TeamRegist";
import TeamInfoEdit from "./pages/instructor/manage/TeamInfoEdit";
import TeamLessonFeeSetting from "./pages/instructor/manage/TeamLessonFeeSetting";
import TeamMember from "./pages/instructor/manage/TeamMember";

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
        <Route path="/reserve/detail" element={<LessonDetail />} />
        <Route path="/user/payment/before" element={<BeforePay />} />
        <Route path="/user/payment/detail" element={<PayDetail />} />
        <Route path="/user/payment" element={<Payment />} />

        <Route path="/user/lessonlist" element={<UserLessonlist />} />

        <Route path="/user/my" element={<UserMypage />} />

        <Route path="/instructor/main" element={<InstructorMain />} />

        <Route path="/instructor/team" element={<Navigate to="/instructor/team/regist"/>}/>

        <Route path="/instructor/team/regist" element={<TeamRegist/>}/>
        <Route path="/instructor/team/edit" element={<TeamInfoEdit/>}/>
        <Route path="/instructor/team/lessonfee" element={<TeamLessonFeeSetting/>}/>
        <Route path="/instructor/team/member" element={<TeamMember/>}/>

        <Route path="/counter" element={<Counter />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
