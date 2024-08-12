import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarUser from "../../../components/common/NavbarUser";
import { TeamInfoDTO } from "../../../dto/TeamDTO";
import { TeamService } from "../../../api/TeamService";

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

const getStatusColor = (status: string) => {
    switch (status) {
        case "notStart":
            return "bg-yellow-100";
        case "onGoing":
            return "bg-green-100";
        case "lessonFinished":
            return "bg-blue-100";
        case "cancelLesson":
            return "bg-red-100";
        default:
            return "bg-transparent";
    }
};

const getStatusName = (status: string) => {
    switch (status) {
        case "notStart":
            return "강습 예정";
        case "onGoing":
            return "진행 중";
        case "lessonFinished":
            return "강습 완료";
        case "cancelLesson":
            return "취소된 강습";
        default:
            return "";
    }
};

const PayDetail = () => {
    const navigate = useNavigate();
    const [teamInfo, setTeamInfo] = useState<TeamInfoDTO | null>(null);
    const location = useLocation();
    const { lesson, paymentDetail } = location.state || {};

    const goToCancle = () => {
        navigate(`/user/payment/cancel`, { state: { lesson, paymentDetail } });
    };

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
        const fetchTeamInfo = async () => {
            if (!lesson) return;
            const teamService = new TeamService();
            const teamData = await teamService.getTeamInfo(lesson.teamId);
            setTeamInfo(teamData);
        };

        fetchTeamInfo();
    }, [lesson]);

    return (
        <div>
            <NavbarUser />
            <div className="flex flex-col min-w-[500px] w-full h-full pl-12 items-start mb-12">
                <div className="pt-12 pb-12 font-extrabold text-black text-2xl">
                    결제 상세
                </div>
                <div className="flex flex-col bg-primary-50 w-4/5 h-full rounded-lg shadow-md items-center py-12 space-y-10">
                    <div className="flex sm:flex-row flex-col space-y-4 sm:space-y-0 sm:space-x-8 bg-white w-4/5 sm:h-1/2 h-4/6 rounded-lg items-center justify-center py-10">
                        <div className="flex items-center justify-center sm:h-32 sm:w-32 h-20 w-20">
                            <img
                                src={
                                    lesson?.profileUrl ||
                                    teamInfo?.teamProfileImageUrl
                                }
                                className="w-full h-full cursor-not-allowed rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <div
                                className={`font-extrabold w-20 text-center rounded-md ${getStatusColor(
                                    lesson.lessonStatus
                                )}`}
                            >
                                {getStatusName(lesson.lessonStatus)}
                            </div>
                            <div className="font-bold text-xl">
                                {lesson.resortName}
                            </div>

                            <p className="text-gray-500 sm:text-sm text-xs">
                                {`${lesson.lessonDate} (${new Date(
                                    lesson.lessonDate
                                ).toLocaleString("ko-KR", {
                                    weekday: "short",
                                })}) `}
                                {`${formatTime(lesson.startTime)} ~ ${new Date(
                                    new Date(
                                        `${lesson.lessonDate}T${formatTime(
                                            lesson.startTime
                                        )}`
                                    ).getTime() +
                                        lesson.duration * 60 * 60 * 1000
                                ).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}`}
                            </p>

                            <div className="flex flex-row space-x-3">
                                <div className="flex flex-row">
                                    <div className="text-primary-600">
                                        {lesson.teamName}
                                    </div>
                                    <div>팀</div>
                                </div>
                                {lesson.instructorName &&
                                    lesson.instructorName != null && (
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
                    <div className="flex flex-col bg-white w-4/5 h-4/6 rounded-lg p-6 space-y-2 sm:text-md text-sm">
                        {paymentDetail && (
                            <>
                                <div className="flex flex-row items-center pb-2">
                                    <div className="font-extrabold">
                                        최종 결제금액
                                    </div>
                                </div>
                                <div className="w-full flex flex-row justify-between items-center">
                                    <div className="text-sm text-gray-500">
                                        기본 강습비
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="text-gray-400 text-xs">
                                            {basicFeeResult.calculation}
                                        </div>
                                        <div>{basicFeeResult.text}</div>
                                    </div>
                                </div>
                                <div className="w-full my-1 border-[0.5px] border-gray-300"></div>
                                <div className="w-full flex flex-row justify-between items-center">
                                    <div className="text-sm text-gray-500">
                                        레벨 옵션비
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="text-gray-400 text-xs">
                                            {levelOptionFeeResult.calculation}
                                        </div>
                                        <div>{levelOptionFeeResult.text}</div>
                                    </div>
                                </div>
                                <div className="w-full my-1 border-[0.5px] border-gray-300"></div>
                                <div className="w-full flex flex-row justify-between items-center">
                                    <div className="text-sm text-gray-500">
                                        인원 옵션비
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="text-gray-400 text-xs">
                                            {peopleOptionFeeResult.calculation}
                                        </div>
                                        <div>{peopleOptionFeeResult.text}</div>
                                    </div>
                                </div>
                                <div className="w-full my-1 border-[0.5px] border-gray-300"></div>
                                <div className="w-full flex flex-row justify-between">
                                    <div className="text-sm text-gray-500">
                                        지정 옵션비
                                    </div>
                                    <div>{designatedFeeResult}</div>
                                </div>
                                <div className="w-full my-[1%] border-[1px] border-black"></div>
                                <div className="w-full flex flex-row justify-between pb-3">
                                    <div className="font-extrabold">
                                        총 결제금액
                                    </div>
                                    <div className="text-blue-500 font-extrabold">
                                        {totalFee}원
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    {lesson.lessonStatus == "notStart" && (
                        <div
                            onClick={goToCancle}
                            className="flex items-center justify-center bg-slate-400 sm:w-1/6 h-12 p-1 px-2 rounded-lg text-white cursor-pointer"
                        >
                            예약 취소
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PayDetail;
