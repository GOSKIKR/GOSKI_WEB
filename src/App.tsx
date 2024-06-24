import React from "react";
import Counter from "./components/Counter";
import UserMain from "./pages/user/main/UserMain";
import InstructorMain from "./pages/instructor/main/InstructorMain";
import Coupon from "./components/user/coupon";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/user/auth/Login";
import ForgotPassword from "./pages/user/auth/ForgotPassword";
import Register from "./pages/user/auth/Register";
import DM from "./pages/user/dm/DM";
import SetFilter from "./pages/user/reservation/SetFilter";
import FilterResult from "./pages/user/reservation/FilterResult";
import BeforePay from "./pages/user/payment/BeforePay";
import Payment from "./pages/user/payment/Payment";
import PayDetail from "./pages/user/payment/PayDetail";
import UserMypage from "./pages/user/mypage/UserMypage";
import TeamRegist from "./pages/instructor/manage/TeamRegist";
import TeamInfoEdit from "./pages/instructor/manage/TeamInfoEdit";
import TeamLessonFeeSetting from "./pages/instructor/manage/TeamLessonFeeSetting";
import TeamMember from "./pages/instructor/manage/TeamMember";
import PayCancle from "./pages/user/payment/PayCancle";
import WriteReview from "./pages/user/mypage/WriteReview";
import TeamInfo from "./pages/user/reservation/TeamInfo";
import InstructorInfo from './pages/user/reservation/InstructorInfo';
import UserFeedback from "./pages/user/mypage/UserFeedback";
import LessonDetail from "./pages/instructor/main/LessonDetail";
import BossMain from "./pages/instructor/main/BossMain";
import MyLessonList from "./pages/instructor/mypage/MyLessonList";
import FeedbackRegist from "./pages/instructor/mypage/FeedbackRegist";

const App: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<UserMain />} />

                <Route path="/login" element={<Login />} />
                <Route
                    path="/login/forgot-password"
                    element={<ForgotPassword />}
                />
                <Route path="/login/register" element={<Register />} />
                <Route path="/dm" element={<DM />} />
                <Route path="/user/coupon" element={<Coupon />} />
                <Route path="/reserve/set" element={<SetFilter />} />
                <Route path="/reserve/result" element={<FilterResult />} />
                <Route path="/reserve/info/team" element={<TeamInfo />} />
                <Route path="/reserve/info/instructor" element={<InstructorInfo/>} />
                <Route path="/user/payment/before" element={<BeforePay />} />
                <Route path="/user/payment/detail" element={<PayDetail />} />
                <Route path="/user/payment/cancle" element={<PayCancle />} />
                <Route path="/user/payment" element={<Payment />} />
                <Route path="/user/review" element={<WriteReview />} />
                <Route path="/user/feedback" element={<UserFeedback />} />

                <Route path="/user/my" element={<UserMypage />} />

                <Route path="/instructor/main" element={<InstructorMain />} />
                <Route path="/instructor/boss/main" element={<BossMain />} />
                <Route
                    path="/instructor/team"
                    element={<Navigate to="/instructor/team/regist" />}
                />
                <Route path="/instructor/detail" element={<LessonDetail />} />

                <Route
                    path="/instructor/team/regist"
                    element={<TeamRegist />}
                />
                <Route
                    path="/instructor/team/edit"
                    element={<TeamInfoEdit />}
                />
                <Route
                    path="/instructor/team/lessonfee"
                    element={<TeamLessonFeeSetting />}
                />
                <Route
                    path="/instructor/team/member"
                    element={<TeamMember />}
                />

                <Route 
                    path="/instructor/my-lesson" 
                    element={<MyLessonList/>}/>
                <Route 
                    path="/instructor/regist-feedback" 
                    element={<FeedbackRegist/>}/>

        <Route path="/counter" element={<Counter />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  );

};

export default App;
