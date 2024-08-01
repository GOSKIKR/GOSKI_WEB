import React, { useState, useEffect } from "react";
import NavbarUser from "../../../components/common/NavbarUser";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { PayCancelDTO } from "../../../dto/PaymentDTO";
import { PayCancelService } from "../../../api/PayCancelService";
import apiClient from "../../../utils/config/axiosConfig";

const formatTime = (time: string) => {
  return time.slice(0, 2) + ":" + time.slice(2);
};

const calculateFee = (fee: number | undefined, duration: number) => {
  return fee && fee > 0
    ? {
        text: `${fee * duration}원`,
        calculation: `${fee}원 x ${duration} = ${fee * duration}원`,
      }
    : { text: "0원", calculation: "" };
};

const PayCancel: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lesson, paymentDetail } = location.state || {};
  const [view, setView] = useState<boolean>(false);
  const [paybackRate, setPaybackRate] = useState<number>(0);
  const [refundAmount, setRefundAmount] = useState<number>(0);

  const basicFeeResult = calculateFee(
    paymentDetail?.basicFee / lesson.duration,
    lesson.duration
  );
  const levelOptionFeeResult = calculateFee(
    paymentDetail?.levelOptionFee / lesson.duration,
    lesson.duration
  );
  const peopleOptionFeeResult = calculateFee(
    paymentDetail?.peopleOptionFee / lesson.duration,
    lesson.duration
  );
  const designatedFeeResult = paymentDetail?.designatedFee
    ? `${paymentDetail.designatedFee / lesson.duration}원`
    : "0원";

  const totalFee = paymentDetail?.totalAmount ?? 0;

  useEffect(() => {
    const fetchPaybackRate = async () => {
      try {
        const accessToken = sessionStorage.getItem("accesstoken");
        const response = await apiClient().get(
          `/payment/lesson/${lesson.lessonId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data && response.data.data.paybackRate) {
          setPaybackRate(response.data.data.paybackRate);
          console.log(response.data.data.paybackRate);
        }
      } catch (error) {
        console.error("Failed to fetch payback rate:", error);
      }
    };

    fetchPaybackRate();
  }, [lesson.lessonId]);

  useEffect(() => {
    if (paymentDetail && paybackRate > 0) {
      setRefundAmount(paymentDetail.totalAmount * (paybackRate / 100));
    }
  }, [paymentDetail, paybackRate]);

  const handleCancel = async () => {
    if (window.confirm("취소 하시겠습니까?")) {
      const payCancelService = new PayCancelService();
      const payCancelDTO: PayCancelDTO = { lessonId: lesson.lessonId };

      try {
        await payCancelService.cancelLesson(payCancelDTO);
        alert("예약이 취소되었습니다.");
        navigate("/user/my");
      } catch (error) {
        alert("예약 취소에 실패했습니다.");
      }
    }
  };

  return (
    <div>
      <NavbarUser />
      <div className="flex flex-col w-full h-full pl-12 items-start mb-12">
        <div className="pt-12 pb-12 font-extrabold text-black text-2xl">
          결제 취소
        </div>
        <div className="flex flex-col bg-primary-50 w-4/5 h-full rounded-lg shadow-md items-center py-12 space-y-10">
          <div className="flex sm:flex-row flex-col bg-white w-4/5 sm:h-1/2 h-4/6 rounded-lg items-center justify-center py-10">
            <img
              src={lesson.profileUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full"
            />
            <div className="flex flex-col ml-8 items-start space-y-2">
              <div className="font-bold text-xl">{lesson.resortName}</div>
              <p className="text-gray-500 sm:text-sm text-xs">
                {`${lesson.lessonDate} (${new Date(
                  lesson.lessonDate
                ).toLocaleString("ko-KR", {
                  weekday: "short",
                })}) `}
                {`${formatTime(lesson.startTime)} ~ ${new Date(
                  new Date(
                    `${lesson.lessonDate}T${formatTime(lesson.startTime)}`
                  ).getTime() +
                    lesson.duration * 60 * 60 * 1000
                ).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}
              </p>
              <div className="flex flex-row space-x-3">
                <div className="flex flex-row">
                  <div className="text-primary-600">{lesson.teamName}</div>
                  <div>팀</div>
                </div>
                {lesson.instructorName && lesson.instructorName != null && (
                  <div className="flex flex-row">
                    <div>강사</div>
                    <div className="text-primary-600 ml-1">
                      {lesson.instructorName}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-white w-4/5 rounded-lg p-6 space-y-1 sm:text-md text-sm">
            {paymentDetail && (
              <>
                <div className="flex flex-row items-center pb-2">
                  <div className="font-extrabold">결제 내역</div>
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                  <div className="text-sm text-gray-500">기본 강습비</div>
                  <div className="flex flex-col items-end">
                    <div className="text-gray-400 text-xs">
                      {basicFeeResult.calculation}
                    </div>
                    <div>{basicFeeResult.text}</div>
                  </div>
                </div>
                <div className="w-full my-1 border-[0.5px] border-gray-300"></div>
                <div className="w-full flex flex-row justify-between items-center">
                  <div className="text-sm text-gray-500">레벨 옵션비</div>
                  <div className="flex flex-col items-end">
                    <div className="text-gray-400 text-xs">
                      {levelOptionFeeResult.calculation}
                    </div>
                    <div>{levelOptionFeeResult.text}</div>
                  </div>
                </div>
                <div className="w-full my-1 border-[0.5px] border-gray-300"></div>
                <div className="w-full flex flex-row justify-between items-center">
                  <div className="text-sm text-gray-500">인원 옵션비</div>
                  <div className="flex flex-col items-end">
                    <div className="text-gray-400 text-xs">
                      {peopleOptionFeeResult.calculation}
                    </div>
                    <div>{peopleOptionFeeResult.text}</div>
                  </div>
                </div>
                <div className="w-full my-1 border-[0.5px] border-gray-300"></div>
                <div className="w-full flex flex-row justify-between">
                  <div className="text-sm text-gray-500">지정 옵션비</div>
                  <div>{designatedFeeResult}</div>
                </div>
                <div className="w-full my-[1%] border-[1px] border-black"></div>
                <div className="w-full flex flex-row justify-between pb-3">
                  <div className="font-extrabold">총 결제금액</div>
                  <div className="text-primary-500 font-extrabold">
                    {totalFee}원
                  </div>
                </div>
              </>
            )}
            <div className="flex justify-between pt-2">
              <div className="font-bold">환불 예정 금액</div>
              <div className="flex flex-col text-end">
                <div className="font-bold text-primary-500">
                  {refundAmount}원
                </div>
                <div className="text-xs">
                  환불율 {paybackRate}%이 적용된 금액입니다.
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-4/5">
            <div
              onClick={() => setView(!view)}
              className="flex flex-row bg-gray-200 rounded-lg justify-between px-3 py-2 items-center cursor-pointer"
            >
              <div className="underline font-bold">결제 취소 약관 확인</div>
              <div className="flex w-12 justify-end">
                {view ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
            </div>
            {view && (
              <div className="flex w-full bg-gray-200 mt-1 p-3 rounded-lg">
                결제 약관
              </div>
            )}
          </div>
          <div
            onClick={handleCancel}
            className="flex items-center justify-center bg-slate-400 sm:w-1/6 h-12 p-1 px-2 rounded-lg text-white cursor-pointer"
          >
            예약 취소
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayCancel;
