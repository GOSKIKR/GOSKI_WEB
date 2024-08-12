import React from "react";
import UserMain from "./pages/user/main/UserMain";
import InstructorMain from "./pages/instructor/main/InstructorMain";
import Coupon from "./components/user/coupon";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/user/auth/Login";
import ForgotPassword from "./pages/user/auth/ForgotPassword";
import Register from "./pages/user/auth/Register";
import SetFilter from "./pages/user/reservation/SetFilter";
import FilterResult from "./pages/user/reservation/FilterResult";
import Payment from "./pages/user/payment/Payment";
import PayDetail from "./pages/user/payment/PayDetail";
import UserMypage from "./pages/user/mypage/UserMypage";
import TeamRegist from "./pages/instructor/manage/TeamRegist";
import TeamInfoEdit from "./pages/instructor/manage/TeamInfoEdit";
import TeamLessonFeeSetting from "./pages/instructor/manage/TeamLessonFeeSetting";
import TeamMember from "./pages/instructor/manage/TeamMember";
import PayCancel from "./pages/user/payment/PayCancel";
import WriteReview from "./pages/user/mypage/WriteReview";
import TeamInfo from "./pages/user/reservation/TeamInfo";
import InstructorInfo from "./pages/user/reservation/InstructorInfo";
import UserFeedback from "./pages/user/mypage/UserFeedback";
import LessonDetail from "./pages/instructor/main/LessonDetail";
import BossMain from "./pages/instructor/main/BossMain";
import MyLessonList from "./pages/instructor/mypage/MyLessonList";
import FeedbackRegist from "./pages/instructor/mypage/FeedbackRegist";
import Notice from "./pages/user/main/Notice";

import ChatComponent from "./pages/user/dm/ChatComponent";
import Settlement from "./pages/instructor/calculate/Settlement";
import MyPageInfo from "./pages/instructor/mypage/MyPageInfo";
import MyPageCert from "./pages/instructor/mypage/MyPageCert";
import FeedbackEdit from "./pages/instructor/mypage/FeedbackEdit";

import NotFound from "./pages/NotFound";
import PayApprove from "./pages/user/payment/PayApprove";
import PaySuccess from "./pages/user/payment/PaySuccess";
import PayFail from "./pages/user/payment/PayFail";

import useLoginStore from "./store/loginStore";
import ProtectedRoute from "./utils/ProtectedRoute";
import KakaoLogin from "./pages/user/auth/KakaoLogin";
import KakaoLoginInst from "./pages/instructor/auth/KakaoLoginInst";

const App: React.FC = () => {
  const { role } = useLoginStore();

  return (
    <div>
      <Routes>
        <Route path="/" element={<UserMain />} />

        <Route path="/notice" element={<Notice />} />

        <Route path="/login" element={<Login />} />
        <Route path="/login/forgot-password" element={<ForgotPassword />} />
        <Route path="/login/register" element={<Register />} />

        <Route
          path="api/v1/user/signin/student/kakao"
          element={<KakaoLogin />}
        />
        <Route path="api/v1/user/signin/inst/kakao" element={<KakaoLogin />} />

        <Route path="/reserve/set" element={<SetFilter />} />
        <Route path="/reserve/result" element={<FilterResult />} />
        <Route path="/reserve/info/team" element={<TeamInfo />} />
        <Route path="/reserve/info/instructor" element={<InstructorInfo />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dm/ws" element={<ChatComponent />} />
          <Route path="/user/coupon" element={<Coupon />} />
          <Route path="/user/payment/detail" element={<PayDetail />} />
          <Route path="/user/payment/cancel" element={<PayCancel />} />
          <Route path="/user/payment" element={<Payment />} />
          <Route path="/user/payment/approve" element={<PayApprove />} />
          <Route path="/user/payment/success" element={<PaySuccess />} />
          <Route path="/user/payment/fail" element={<PayFail />} />
          <Route path="/user/review" element={<WriteReview />} />
          <Route path="/user/feedback" element={<UserFeedback />} />

          <Route path="/user/my" element={<UserMypage />} />

          <Route path="/instructor/main" element={<InstructorMain />} />
          <Route path="/instructor/boss/main" element={<BossMain />} />
          <Route
            path="/instructor/team"
            element={<Navigate to="/instructor/team/regist" />}
          />
          <Route
            path="/instructor/detail/:lessonId"
            element={<LessonDetail />}
          />

          <Route path="/instructor/team/regist" element={<TeamRegist />} />
          <Route path="/instructor/team/edit" element={<TeamInfoEdit />} />
          <Route
            path="/instructor/team/lessonfee"
            element={<TeamLessonFeeSetting />}
          />
          <Route path="/instructor/team/member" element={<TeamMember />} />

          <Route path="/instructor/my-lesson" element={<MyLessonList />} />

          <Route
            path="/instructor/regist-feedback"
            element={<FeedbackRegist />}
          />

          <Route path="/instructor/edit-feedback" element={<FeedbackEdit />} />

          <Route path="/instructor/settlement" element={<Settlement />} />

          <Route path="/instructor/edit-info" element={<MyPageInfo />} />
          <Route path="/instructor/edit-cert" element={<MyPageCert />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
