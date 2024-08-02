import React, { useState, useEffect } from "react";
import NavbarUser from "../../../components/common/NavbarUser";
import NavbarUserMobile from "../../../components/common/NavbarUserMobile";
import InfiniteBanner from "../../../components/user/NoticeBanner";

const SectionTitle = ({ children }: any) => (
  <span className="font-semibold">{children}</span>
);

const ContactInfo = ({ label, value }: any) => (
  <p>
    <SectionTitle>{label}</SectionTitle>
    <br />
    {value}
  </p>
);

const Notice = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex  flex-col">
      {innerWidth > 640 ? <NavbarUser /> : <NavbarUserMobile />}
      <div className="container mx-auto px-5 max-w-screen-xl pt-8 bg-white">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">이용 안내</h1>
        <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
          <p className="text-base text-gray-800">
            <SectionTitle>이용안내</SectionTitle>
            <br />
            고스키를 찾아주셔서 감사합니다. 원활한 예약을 위해 아래의 안내
            사항을 숙지해 주시기 바랍니다.
          </p>
          <p className="mt-4">
            <SectionTitle>1. 예약 절차</SectionTitle>
            <br />
            <SectionTitle>회원 가입</SectionTitle>: 회원으로 가입하시면 예약
            내역 조회 및 관리가 편리합니다.
            <br />
            <SectionTitle>강습 선택</SectionTitle>: 원하시는 강습 종류와 일정을
            선택해 주세요.
            <br />
            - 초급 강습
            <br />
            - 중급 강습
            <br />
            - 고급 강습
            <br />
            <SectionTitle>강사 선택</SectionTitle>: 강습을 진행할 강사를 선택할
            수 있습니다. (강사별로 스케줄이 다를 수 있습니다.)
            <br />
            <SectionTitle>결제</SectionTitle>: 예약 내용을 확인하고 결제를
            완료해 주세요. 결제 후 예약이 확정됩니다.
          </p>
          <p className="mt-4">
            <SectionTitle>2. 강습 종류</SectionTitle>
            <br />
            <SectionTitle>초급 강습</SectionTitle>: 스키를 처음 접하시는 분들을
            위한 강습으로, 기본 자세 및 기초 기술을 배웁니다.
            <br />
            <SectionTitle>중급 강습</SectionTitle>: 기본 기술을 습득하신 분들을
            위한 강습으로, 다양한 지형에서의 기술을 배웁니다.
            <br />
            <SectionTitle>고급 강습</SectionTitle>: 고급 기술을 배우고 싶은
            분들을 위한 강습으로, 전문 강사와 함께 고난도의 기술을 연습합니다.
          </p>
          <p className="mt-4">
            <SectionTitle>3. 강습 시간 및 장소</SectionTitle>
            <br />
            강습 시간: 오전 9시 ~ 오후 5시 (강습 종류에 따라 다를 수 있습니다.)
            <br />
            강습 장소: 각 스키장의 강습 전용 구역
          </p>
          <p className="mt-4">
            <SectionTitle>4. 취소 및 변경 정책</SectionTitle>
            <br />
            <SectionTitle>취소</SectionTitle>: 강습 시작 24시간 전까지 취소 시
            전액 환불됩니다. 이후 취소 시 환불이 불가합니다.
            <br />
            <SectionTitle>변경</SectionTitle>: 강습 시작 24시간 전까지 변경이
            가능합니다. 이후 변경 시 추가 요금이 발생할 수 있습니다.
          </p>
          <p className="mt-4">
            <SectionTitle>5. 준비물</SectionTitle>
            <br />
            - 개인 스키 장비 (스키, 부츠, 폴 등)
            <br />
            - 헬멧 및 보호장비
            <br />- 따뜻한 복장 및 장갑
          </p>
          <p className="mt-4">
            <SectionTitle>6. 유의 사항</SectionTitle>
            <br />
            - 강습 시작 10분 전까지 강습 장소에 도착해 주시기 바랍니다.
            <br />
            - 날씨 및 스키장 사정에 따라 강습 일정이 변경될 수 있습니다.
            <br />- 강습 중 안전 수칙을 반드시 준수해 주세요.
          </p>
          <div className="mt-4">
            <ContactInfo label="문의처" value="전화: 123-456-7890" />
            <ContactInfo label="" value="이메일: info@skischool.com" />
            <br />
            보다 즐거운 스키 강습 경험을 제공하기 위해 최선을 다하겠습니다.
            감사합니다.
          </div>
        </div>
        {/* <InfiniteBanner /> */}
      </div>
    </div>
  );
};

export default Notice;
