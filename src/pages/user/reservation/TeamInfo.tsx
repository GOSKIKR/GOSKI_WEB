import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarUser from "../../../components/common/NavbarUser";
import BeforePay from "../../../components/user/BeforePay";
import NavbarUserMobile from "../../../components/common/NavbarUserMobile";
import { IoClose } from "react-icons/io5";

import teamInfoStore from "../../../store/teamInfoStore";
import userReserveStore from "../../../store/userReserveStore";
import userResortsStore from "../../../store/userResortsStore";
import TimePicker from "../../../components/common/TimePicker";
import apiClient from "../../../utils/config/axiosConfig";

const TeamInfo: React.FC = () => {
    const [selectedStartTime, setSelectedStartTime] = useState<string>("");
    const [selectedLessonTime, setSelectedLessonTime] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [instructorList, setInstructorList] = useState([]);

    const [filterLessonDurationTimes, setFilterLessonDurationTimes] = useState<
        number[]
    >([]);
    const [filterLessonDuration, setFilterLessonDuration] = useState<number>(0);

    const navigate = useNavigate();

  const openModal = () => {
    if (sessionStorage.getItem("accesstoken") === null) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    } else if (!instructorList || instructorList.length === 0) {
      navigate("/user/payment");
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {
    teamId,
    teamName,
    description,
    cost,
    teamProfileUrl,
    rating,
    instructors,
    teamImages,
    basicFee,
    peopleOptionFee,
    designatedFee,
    levelOptionFee,
    lessonType,
    reviewCount,
    reviews,
  } = teamInfoStore();

  const {
    resortId: reserveResortId,
    resortName: reserveResortName,
    lessonType: reserveLessonType,
    studentCount,
    lessonDate,
    startTime,
    duration,
    level,
  } = userReserveStore();

  const {
    resortId,
    resortName,
    resortLocation,
    longitude,
    latitude,
    lessonTime,
  } = userResortsStore();

  useEffect(() => {
    setFilterLessonDuration(duration);
    setFilterLessonDurationTimes(lessonTime);
    setSelectedStartTime(startTime);
  }, [lessonTime]);

  // 팀원 리스트 받아오기
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const accessToken = sessionStorage.getItem("accesstoken");
        const response = await apiClient().post(
          `/lesson/reserve/novice/${teamId}`,
          {
            instructorsList: instructors,
            studentCount,
            duration,
            level,
            lessonType,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setInstructorList(response.data.data);
        console.log(instructorList);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };
    fetchInstructors();
  }, [teamId, studentCount, duration, level]);

  //새로고침시 경고창
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const {
        teamId,
        instructors,
        teamImages,
        basicFee,
        levelOptionFee,
        peopleOptionFee,
        lessonType,
    } = teamInfoStore();

    const { studentCount, startTime, duration, level } = userReserveStore();

    const { lessonTime } = userResortsStore();

    useEffect(() => {
        setFilterLessonDuration(duration);
        setFilterLessonDurationTimes(lessonTime);
        setSelectedStartTime(startTime);
    }, [lessonTime]);

    const calculateFee = (fee: number | undefined, duration: number) => {
        return fee && fee > 0
            ? {
                  text: `${fee * duration}원`,
                  calculation: `${fee}원 x ${duration} = ${fee * duration}원`,
              }
            : { text: "0원", calculation: "" };
    };

    const basicFeeResult = calculateFee(basicFee, duration);
    const levelOptionFeeResult = calculateFee(levelOptionFee, duration);
    const peopleOptionFeeResult = calculateFee(peopleOptionFee, duration);

    const totalFee =
        (basicFee + peopleOptionFee + (levelOptionFee ?? 0)) * duration;

    // 팀원 리스트 받아오기
    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const accessToken = localStorage.getItem("accesstoken");
                const response = await apiClient().post(
                    `/lesson/reserve/novice/${teamId}`,
                    {
                        instructorsList: instructors,
                        studentCount,
                        duration,
                        level,
                        lessonType,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setInstructorList(response.data.data);
                console.log(instructorList);
            } catch (error) {
                console.error("Error fetching instructors:", error);
            }
        };
        fetchInstructors();
    }, [teamId, studentCount, duration, level]);

    //새로고침시 경고창
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return (
        <div>
            <div className="w-full">
                {innerWidth > 640 ? <NavbarUser /> : <NavbarUserMobile />}
            </div>
            <div className="flex flex-col justify-center items-center px-4 py-8 space-y-3">
                <img
                    src="/assets/images/AppLogo.png"
                    alt="App Logo"
                    className="w-16 h-auto"
                />
                <div className="text-xl font-extrabold">GOSKI 강습 예약</div>
            </div>
            <div className="flex flex-col sm:flex-row px-12 sm:space-x-6 space-y-6">
                <div className="w-full sm:w-7/12 h-[2400px] bg-primary-50 rounded-lg shadow-md">
                    <div className="px-6 py-6 text-lg font-bold">팀 소개</div>
                    <div className="">
                        {teamImages ? (
                            teamImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.imageUrl}
                                    alt="team image"
                                    className="w-full h-[300px] object-cover"
                                />
                            ))
                        ) : (
                            <img
                                src="/assets/images/noImage.png"
                                alt="team image"
                                className="w-full h-[300px] object-cover"
                            />
                        )}
                    </div>
                </div>
                <div className="flex flex-col w-full sm:w-4/12 self-start sticky top-5">
                    <div className="w-full">
                        <div className="flex flex-row items-center sm:space-x-4 mb-4">
                            <label className="mb-1 sm:mb-0 sm:w-28 text-center w-24 font-bold">
                                시작 시간
                            </label>
                            <TimePicker
                                startTime={selectedStartTime}
                                setStartTime={setSelectedStartTime}
                                position={1}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mb-4">
                            <label className="mb-1 sm:mb-0 sm:w-28 text-center w-24 font-bold">
                                강습 시간
                            </label>
                            <select
                                value={filterLessonDuration.toString()}
                                onChange={(e) =>
                                    setFilterLessonDuration(
                                        parseInt(e.target.value)
                                    )
                                }
                                className="px-6 bg-white shadow-md rounded-lg flex-1 h-9"
                            >
                                {filterLessonDurationTimes.map((time) => (
                                    <option key={time} value={time}>
                                        {time}시간
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col px-3 py-6 space-y-2 w-full h-72 bg-primary-50 rounded-lg shadow-md items-center justify-center mb-8">
                        <div className="font-extrabold pb-2 w-full">
                            최종 결제금액
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <div className="text-xs">기존 강습비</div>
                            <div className="flex flex-col items-end">
                                <div className="text-gray-400 text-xs">
                                    {basicFeeResult.calculation}
                                </div>
                                <div className="text-sm">
                                    {basicFeeResult.text}
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <div className="text-xs">레벨 옵션비</div>
                            <div className="flex flex-col items-end">
                                <div className="text-gray-400 text-xs">
                                    {levelOptionFeeResult.calculation}
                                </div>
                                <div>{levelOptionFeeResult.text}</div>
                            </div>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <div className="text-xs">인원 옵션비</div>
                            <div className="flex flex-col items-end">
                                <div className="text-gray-400 text-xs">
                                    {peopleOptionFeeResult.calculation}
                                </div>
                                <div>{peopleOptionFeeResult.text}</div>
                            </div>
                        </div>
                        <div className="w-full my-[1%] border-[1px] border-black"></div>
                        <div className="w-full flex flex-row justify-between pb-3">
                            <div className="font-extrabold">총 결제금액</div>
                            <div className="text-blue-500 font-extrabold">
                                {totalFee}원
                            </div>
                        </div>

                        <div
                            onClick={openModal}
                            className="h-20 w-1/2 p-1 bg-white rounded-lg shadow-md text-black text-center flex items-center justify-center cursor-pointer hover:bg-slate-200"
                        >
                            예약하기
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg relative sm:w-10/12 h-5/6 overflow-y-auto ">
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 text-gray-500 hover:text-gray-800"
                        >
                            <IoClose size="25px" />
                        </button>
                        <BeforePay
                            onClose={closeModal}
                            instructorList={instructorList}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamInfo;
