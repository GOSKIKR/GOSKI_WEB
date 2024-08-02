import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarUser from "../../../components/common/NavbarUser";
import userReserveStore from "../../../store/userReserveStore";
import teamInfoStore from "../../../store/teamInfoStore";
import NavbarUserMobile from "../../../components/common/NavbarUserMobile";
import { StudentInfo } from "../../../dto/UserReserveDTO";
import StudentInfoForm from "../../../components/user/StudentInfoForm";
import AgreementForm from "../../../components/user/AgreementForm";
import PaymentMethodForm from "../../../components/user/PaymentMethodForm";
import apiClient from "../../../utils/config/axiosConfig";
import { UserMyDTO } from "../../../dto/UserMyDTO";
import { Instructor } from "../../../dto/UserInstructorDTO";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import "../../../../public/assets/css/tooltip.css";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { LuDot } from "react-icons/lu";

const convertLessonType = (lessonTypeString: string): number => {
  if (lessonTypeString === "SKI") {
    return 1010000; // 예: SKI 레벨 1
  } else if (lessonTypeString === "BOARD") {
    return 1100000; // 예: BOARD 레벨 1
  } else {
    throw new Error("Invalid lesson type string");
  }
};

interface Option {
  value: string;
  label: string;
}

const ageOptions: Option[] = [
  { value: "1", label: "PRESCHOOL_CHILD" },
  { value: "2", label: "ELEMENTARY" },
  { value: "3", label: "MIDDLE_HIGH" },
  { value: "4", label: "TWENTIES" },
  { value: "5", label: "THIRTIES" },
  { value: "6", label: "FORTIES" },
  { value: "7", label: "FIFTIES" },
  { value: "8", label: "SIXTIES_OVER" },
];

const heightOptions: Option[] = [
  { value: "1", label: "HEIGHT_UNDER_140CM" },
  { value: "2", label: "HEIGHT_140CM_TO_149CM" },
  { value: "3", label: "HEIGHT_150CM_TO_159CM" },
  { value: "4", label: "HEIGHT_160CM_TO_169CM" },
  { value: "5", label: "HEIGHT_170CM_TO_179CM" },
  { value: "6", label: "HEIGHT_ABOVE_180CM" },
];

const weightOptions: Option[] = [
  { value: "1", label: "WEIGHT_UNDER_40KG" },
  { value: "2", label: "WEIGHT_40KG_TO_49KG" },
  { value: "3", label: "WEIGHT_50KG_TO_59KG" },
  { value: "4", label: "WEIGHT_60KG_TO_69KG" },
  { value: "5", label: "WEIGHT_70KG_TO_79KG" },
  { value: "6", label: "WEIGHT_80KG_TO_89KG" },
  { value: "7", label: "WEIGHT_90KG_TO_99KG" },
  { value: "8", label: "WEIGHT_ABOVE_100KG" },
];

interface PassedState {
<<<<<<< HEAD
  studentInfo?: StudentInfo[];
  selectedInstructor?: Instructor | null;
  basicFee?: number;
  levelOptionFee?: number;
  designatedFee?: number;
  peopleOptionFee?: number;
  reserveResortName?: string;
  reserveLessonType?: string;
  studentCount?: number;
  lessonDate?: string;
  startTime?: string;
  duration?: number;
  [key: string]: any;
=======
    selectedInstructor?: Instructor | null;
    basicFee?: number;
    levelOptionFee?: number;
    designatedFee?: number;
    peopleOptionFee?: number;
    reserveResortName?: string;
    reserveLessonType?: string;
    studentCount?: number;
    lessonDate?: string;
    startTime?: string;
    duration?: number;
    studentInfo?: StudentInfo[];
    [key: string]: any;
>>>>>>> 1b837fcc81921c06b86204d777856811fd2e4840
}

const formatTime = (time: string) => {
  return time.slice(0, 2) + ":" + time.slice(2);
};

const Payment: React.FC = () => {
  const [profile, setProfile] = useState<UserMyDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedInstructor, setSelectedInstructor] =
    useState<Instructor | null>(null);

<<<<<<< HEAD
  const location = useLocation();
  const navigate = useNavigate();
  //전달 받은 데이터
  const passedState: PassedState = location.state || {};

  //store에서 꺼내올 정보들
  const {
    resortName: reserveResortName,
    lessonType: reserveLessonType,
    studentCount,
    lessonDate,
    startTime,
    duration,
  } = userReserveStore();

  const { teamId, basicFee, levelOptionFee, peopleOptionFee } = teamInfoStore();

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const accessToken = sessionStorage.getItem("accesstoken");

        const response = await apiClient().get("/user/profile/user", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setProfile(response.data.data);

        if (response.status === 200) {
          console.log("사용자 정보 불러오기 성공:", response.data);
        }
      } catch (error) {
        console.error("사용자 정보 불러오기 중 오류 발생:", error);
      }
    };

    fetchMyProfile();
    setLoading(false);

    if (passedState.selectedInstructor) {
      setSelectedInstructor(passedState.selectedInstructor);
    }
  }, []);

  const calculateFee = (fee: number | undefined, duration: number) => {
    return fee && fee > 0
      ? {
          text: `${fee * duration}원`,
          calculation: `${fee}원 x ${duration} = ${fee * duration}원`,
        }
      : { text: "0원", calculation: "" };
  };

  const basicFeeResult = calculateFee(passedState.basicFee, duration);
  const levelOptionFeeResult = calculateFee(
    passedState.levelOptionFee,
    duration
  );
  const peopleOptionFeeResult = calculateFee(
    passedState.peopleOptionFee,
    duration
  );
  const designatedFeeResult = passedState.designatedFee
    ? `${passedState.designatedFee}원`
    : "0원";

  const totalFee =
    ((passedState.basicFee ?? 0) +
      (passedState.peopleOptionFee ?? 0) +
      (passedState.levelOptionFee ?? 0)) *
      duration +
    (passedState.designatedFee ?? 0);

  //학생 정보 초기화
  const initialStudentInfo = Array.from({ length: studentCount }, () => ({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    footSize: 260,
  }));

  //전체 데이터 초기화
  const initialData = {
    ...passedState,
    instId: selectedInstructor?.instructorId,
    designatedFees: selectedInstructor?.designatedFee,
    studentInfo: passedState.studentInfo || initialStudentInfo,
    requestComplain: "",
  };

  const [data, setData] = useState(initialData);

  //학생 정보 입력
  const handleInputChange = (
    index: number,
    field: keyof StudentInfo,
    value: string | number
  ) => {
    const updatedStudentInfo = data.studentInfo.map(
      (student: StudentInfo, i: number) =>
        i === index ? { ...student, [field]: value } : student
    );
    setData({ ...data, studentInfo: updatedStudentInfo });
  };

  const [agreements, setAgreements] = useState({
    personalInfo: false,
    thirdParty: false,
    marketing: false,
  });
  const [paymentMethod, setPaymentMethod] = useState({
    kakao: false,
    naver: false,
  });

  //약관 전체 동의
  const handleAgreeAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setAgreements({
      personalInfo: isChecked,
      thirdParty: isChecked,
      marketing: isChecked,
    });
  };

  //약관 동의 입력
  const handleAgreementChange = (
    field: keyof typeof agreements,
    value: boolean
  ) => {
    setAgreements({ ...agreements, [field]: value });
  };

  //결제 방법 입력
  const handlePaymentChange = (
    field: keyof typeof paymentMethod,
    value: boolean
  ) => {
    setPaymentMethod({ ...paymentMethod, [field]: value });
  };

  //발사이즈 입력
  const handleFootSizeChange = (index: number, change: number) => {
    const updatedStudentInfo = data.studentInfo.map(
      (student: StudentInfo, i: number) => {
        const newSize = student.footSize + change;
        if (i === index) {
          if (newSize >= 150 && newSize <= 320) {
            return { ...student, footSize: newSize };
          }
        }
        return student;
      }
    );
    setData({ ...data, studentInfo: updatedStudentInfo });
  };

  //컴플레인 입력
  const [requestComplain, handleRequestChange] = useState<string>("");

  //예약 제출
  const handleReservation = async () => {
    // 필수 약관 동의 체크
    if (!agreements.personalInfo || !agreements.thirdParty) {
      alert("필수 약관에 동의해주세요.");
      return;
    }

    // 수강생 정보 입력 확인
    for (const student of data.studentInfo) {
      if (
        !student.name ||
        !student.age ||
        !student.gender ||
        !student.height ||
        !student.weight
      ) {
        alert("모든 수강생 정보를 입력해주세요.");
        return;
      }
    }

    try {
      const lessonType = convertLessonType(reserveLessonType);
      const reservationData = {
        teamId,
        instId: selectedInstructor?.instructorId ?? null,
=======
    const location = useLocation();
    const navigate = useNavigate();
    const passedState: PassedState = location.state || {};
    const [requestComplain, handleRequestChange] = useState<string>("");

    const {
        resortName: reserveResortName,
        lessonType: reserveLessonType,
        studentCount,
>>>>>>> 1b837fcc81921c06b86204d777856811fd2e4840
        lessonDate,
        startTime,
        duration,
        peopleNumber: studentCount,
        lessonType,
        basicFee,
        designatedFee: selectedInstructor?.designatedFee ?? 0,
        peopleOptionFee,
        levelOptionFee: levelOptionFee ?? 0,
        requestComplain: requestComplain || "",
        studentInfo: data.studentInfo.map((student: StudentInfo) => ({
          ...student,
          height:
            heightOptions.find((option) => option.value === student.height)
              ?.label || student.height,
          weight:
            weightOptions.find((option) => option.value === student.weight)
              ?.label || student.weight,
          age:
            ageOptions.find((option) => option.value === student.age)?.label ||
            student.age,
          gender: student.gender === "male" ? "MALE" : "FEMALE",
        })),
      };

<<<<<<< HEAD
      const accessToken = sessionStorage.getItem("accesstoken");
      const response = await apiClient().post(
        "/payment/reserve/prepare",
        reservationData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data.data);
      if (response.data.data.next_redirect_pc_url) {
        sessionStorage.setItem("tid", response.data.data.tid);
        window.location.href = response.data.data.next_redirect_pc_url;
      }
    } catch (error) {
      console.error("Error making reservation:", error);
      // Handle error
=======
    const {
        teamId,
        basicFee: teamBasicFee,
        levelOptionFee: teamLevelOptionFee,
        peopleOptionFee: teamPeopleOptionFee,
    } = teamInfoStore();

    useEffect(() => {
        const fetchMyProfile = async () => {
            try {
                const accessToken = localStorage.getItem("accesstoken");

                const response = await apiClient().get("/user/profile/user", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setProfile(response.data.data);

                if (response.status === 200) {
                    console.log("사용자 정보 불러오기 성공:", response.data);
                }
            } catch (error) {
                console.error("사용자 정보 불러오기 중 오류 발생:", error);
            }
        };

        fetchMyProfile();
        setLoading(false);

        if (passedState.selectedInstructor) {
            setSelectedInstructor(passedState.selectedInstructor);
        }
    }, []);

    const calculateFee = (fee: number | undefined, duration: number) => {
        return fee && fee > 0
            ? {
                  text: `${fee * duration}원`,
                  calculation: `${fee}원 x ${duration} = ${fee * duration}원`,
              }
            : { text: "0원", calculation: "" };
    };

    const basicFee = passedState.selectedInstructor?.basicFee || teamBasicFee;
    const levelOptionFee =
        passedState.selectedInstructor?.levelOptionFee || teamLevelOptionFee;
    const peopleOptionFee =
        passedState.selectedInstructor?.peopleOptionFee || teamPeopleOptionFee;
    const designatedFee =
        selectedInstructor?.designatedFee || passedState.designatedFee;

    const basicFeeResult = calculateFee(basicFee, duration);
    const levelOptionFeeResult = calculateFee(levelOptionFee, duration);
    const peopleOptionFeeResult = calculateFee(peopleOptionFee, duration);
    const designatedFeeResult = designatedFee ? `${designatedFee}원` : "0원";

    const totalFee =
        (basicFee + peopleOptionFee + (levelOptionFee ?? 0)) * duration +
        (designatedFee ?? 0);

    const initialStudentInfo = Array.from({ length: studentCount }, () => ({
        name: "",
        age: "",
        gender: "",
        height: "",
        weight: "",
        footSize: 260,
    }));

    const initialData = {
        ...passedState,
        instId: selectedInstructor?.instructorId,
        designatedFees: designatedFee,
        studentInfo: passedState.studentInfo || initialStudentInfo,
        requestComplain: "",
    };

    const [data, setData] = useState(initialData);

    const handleInputChange = (
        index: number,
        field: keyof StudentInfo,
        value: string | number
    ) => {
        const updatedStudentInfo = data.studentInfo.map(
            (student: StudentInfo, i: number) =>
                i === index ? { ...student, [field]: value } : student
        );
        setData({ ...data, studentInfo: updatedStudentInfo });
    };

    const [agreements, setAgreements] = useState({
        personalInfo: false,
        thirdParty: false,
        marketing: false,
    });
    const [paymentMethod, setPaymentMethod] = useState({
        kakao: false,
        naver: false,
    });

    const handleAgreeAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setAgreements({
            personalInfo: isChecked,
            thirdParty: isChecked,
            marketing: isChecked,
        });
    };

    const handleAgreementChange = (
        field: keyof typeof agreements,
        value: boolean
    ) => {
        setAgreements({ ...agreements, [field]: value });
    };

    const handlePaymentChange = (
        field: keyof typeof paymentMethod,
        value: boolean
    ) => {
        setPaymentMethod({ ...paymentMethod, [field]: value });
    };

    const handleFootSizeChange = (index: number, change: number) => {
        const updatedStudentInfo = data.studentInfo.map(
            (student: StudentInfo, i: number) => {
                const newSize = student.footSize + change;
                if (i === index) {
                    if (newSize >= 150 && newSize <= 320) {
                        return { ...student, footSize: newSize };
                    }
                }
                return student;
            }
        );
        setData({ ...data, studentInfo: updatedStudentInfo });
    };

    const handleReservation = async () => {
        // 필수 약관 동의 체크
        if (!agreements.personalInfo || !agreements.thirdParty) {
            alert("필수 약관에 동의해주세요.");
            return;
        }

        // 수강생 정보 입력 확인
        for (const student of data.studentInfo) {
            if (
                !student.name ||
                !student.age ||
                !student.gender ||
                !student.height ||
                !student.weight
            ) {
                alert("모든 수강생 정보를 입력해주세요.");
                return;
            }
        }

        try {
            const lessonType = convertLessonType(reserveLessonType);
            const reservationData = {
                teamId,
                instId: selectedInstructor?.instructorId ?? null,
                lessonDate,
                startTime,
                duration,
                peopleNumber: studentCount,
                lessonType,
                basicFee,
                designatedFee: selectedInstructor?.designatedFee ?? 0,
                peopleOptionFee,
                levelOptionFee: levelOptionFee ?? 0,
                requestComplain: data.requestComplain || "",
                studentInfo: data.studentInfo.map((student: StudentInfo) => ({
                    ...student,
                    height:
                        heightOptions.find(
                            (option) => option.value === student.height
                        )?.label || student.height,
                    weight:
                        weightOptions.find(
                            (option) => option.value === student.weight
                        )?.label || student.weight,
                    age:
                        ageOptions.find(
                            (option) => option.value === student.age
                        )?.label || student.age,
                    gender: student.gender === "male" ? "MALE" : "FEMALE",
                })),
            };

            const accessToken = localStorage.getItem("accesstoken");
            const response = await apiClient().post(
                "/payment/reserve/prepare",
                reservationData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(response.data.data);
            if (response.data.data.next_redirect_pc_url) {
                localStorage.setItem("tid", response.data.data.tid);
                window.location.href = response.data.data.next_redirect_pc_url;
            }
        } catch (error) {
            console.error("Error making reservation:", error);
            // Handle error
        }
    };

    if (loading) {
        return <div>Loading...</div>; // 로딩 스피너 또는 로딩 상태 표시
>>>>>>> 1b837fcc81921c06b86204d777856811fd2e4840
    }
  };

<<<<<<< HEAD
  if (loading) {
    return <div>Loading...</div>; // 로딩 스피너 또는 로딩 상태 표시
  }

  return (
    <div>
      <div className="w-full">
        {window.innerWidth > 640 ? <NavbarUser /> : <NavbarUserMobile />}
      </div>
      <div className="p-10">
        <div className="text-2xl font-bold mb-8">결제하기</div>
        <div className="flex flex-col sm:flex-row sm:space-x-5">
          <div className="w-full sm:w-3/5 space-y-5">
            <div className="bg-primary-50 p-5 rounded-lg shadow-md">
              <div className="font-extrabold text-lg mb-2">강습 예약 정보</div>
              <div className="flex flex-row space-x-12">
                <div className="flex flex-col w-36">
                  <div className="text-xs text-gray-500">스키장 이름</div>
                  <div>{reserveResortName}</div>
=======
    return (
        <div>
            <div className="w-full">
                {window.innerWidth > 640 ? (
                    <NavbarUser />
                ) : (
                    <NavbarUserMobile />
                )}
            </div>
            <div className="p-10 pb-20">
                <div className="text-2xl font-bold mb-8">결제하기</div>
                <div className="flex flex-col sm:flex-row sm:space-x-5">
                    <div className="w-full sm:w-3/5 space-y-5">
                        <div className="bg-primary-50 p-5 rounded-lg shadow-md">
                            <div className="font-extrabold text-lg mb-2">
                                강습 예약 정보
                            </div>
                            <div className="flex flex-row space-x-12 pl-2">
                                <div className="flex flex-col w-36">
                                    <div>{reserveResortName}</div>
                                    {selectedInstructor && (
                                        <div>{selectedInstructor.userName}</div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-row space-x-8 pt-4 pl-2">
                                <div className="flex flex-col w-1/3">
                                    <div className="text-xs text-gray-500">
                                        일시
                                    </div>
                                    <div className="text-sm pt-1 text-gray-700">
                                        {lessonDate}
                                    </div>
                                    <div className="text-sm text-gray-700">{`${formatTime(
                                        startTime
                                    )} ~ ${new Date(
                                        new Date(
                                            `${lessonDate}T${formatTime(
                                                startTime
                                            )}`
                                        ).getTime() +
                                            duration * 60 * 60 * 1000
                                    ).toLocaleTimeString("en-GB", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hourCycle: "h23",
                                    })}`}</div>
                                </div>
                                <div className="flex flex-col w-1/5">
                                    <div className="text-xs text-gray-500">
                                        인원
                                    </div>
                                    <div className="text-sm text-gray-700 pt-1">
                                        {studentCount}명
                                    </div>
                                </div>
                                <div className="flex flex-col w-3/5">
                                    <div className="text-xs text-gray-500">
                                        요청사항
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded text-xs"
                                        value={requestComplain}
                                        onChange={(e) =>
                                            handleRequestChange(e.target.value)
                                        }
                                        placeholder="요청사항을 입력해주세요"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-primary-50 p-5 rounded-lg shadow-md">
                            <div className="font-bold mb-2">예약자 정보</div>
                            <div className="flex flex-row space-x-4 items-center">
                                <div className="text-xs text-gray-500">
                                    예약자
                                </div>
                                <div className="text-sm">
                                    {profile?.userName}
                                </div>
                            </div>
                            <div className="flex flex-row space-x-4 items-center pt-1">
                                <div className="text-xs text-gray-500">
                                    연락처
                                </div>
                                <div className="text-sm">
                                    {profile?.phoneNumber}
                                </div>
                            </div>
                        </div>
                        <StudentInfoForm
                            studentInfo={data.studentInfo}
                            handleInputChange={handleInputChange}
                            handleFootSizeChange={handleFootSizeChange}
                        />
                    </div>
                    <div className="sm:w-2/5 space-y-5 mt-5 sm:mt-0">
                        <div className="bg-primary-50 p-5 rounded-lg shadow-md">
                            <div className="flex flex-row items-center pb-2">
                                <div className="font-extrabold">
                                    최종 결제금액
                                </div>
                                <div
                                    className="ml-3 w-4 text-black cursor-pointer"
                                    data-tooltip-id="explain-fee"
                                    data-tooltip-place="top"
                                    data-tip="최종 결제 금액 산출 = (기본 강습비 + 인원 옵션비 + 레벨 옵션비) x 강습 시간 + 지정 옵션비"
                                >
                                    <IoIosInformationCircleOutline />
                                </div>
                                <Tooltip place="top" id="explain-fee">
                                    기본 강습비, 인원 옵션비, 레벨 옵션비에 강습
                                    시간을 곱하고 지정 옵션비를 더한 금액입니다.
                                </Tooltip>
                            </div>

                            <div className="w-full flex flex-row justify-between items-center">
                                <div className="text-xs text-gray-500">
                                    기존 강습비
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="text-gray-400 text-xs">
                                        {basicFeeResult.calculation}
                                    </div>
                                    <div className="text-sm">
                                        {basicFeeResult.text}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full my-1 border-[0.5px] border-gray-300"></div>
                            <div className="w-full flex flex-row justify-between items-center">
                                <div className="text-xs text-gray-500">
                                    레벨 옵션비
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="text-gray-400 text-xs">
                                        {levelOptionFeeResult.calculation}
                                    </div>
                                    <div className="text-sm">
                                        {levelOptionFeeResult.text}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full my-1 border-[0.5px] border-gray-300"></div>
                            <div className="w-full flex flex-row justify-between items-center">
                                <div className="text-xs text-gray-500">
                                    인원 옵션비
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="text-gray-400 text-xs">
                                        {peopleOptionFeeResult.calculation}
                                    </div>
                                    <div className="text-sm">
                                        {peopleOptionFeeResult.text}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full my-1 border-[0.5px] border-gray-300"></div>
                            <div className="w-full flex flex-row justify-between mb-2">
                                <div className="text-xs text-gray-500">
                                    지정 옵션비
                                </div>
                                <div className="text-sm">
                                    {designatedFeeResult}
                                </div>
                            </div>
                            <div className="w-full my-[1%] border-[1px] border-black"></div>
                            <div className="w-full flex flex-row justify-between pb-3 mt-2">
                                <div className="font-extrabold">
                                    총 결제금액
                                </div>
                                <div className="text-blue-500 font-extrabold">
                                    {totalFee}원
                                </div>
                            </div>
                        </div>
                        <AgreementForm
                            agreements={agreements}
                            handleAgreementChange={handleAgreementChange}
                            handleAgreeAll={handleAgreeAll}
                        />
                        <PaymentMethodForm
                            paymentMethod={paymentMethod}
                            handlePaymentChange={handlePaymentChange}
                        />
                        <div
                            className="bg-primary-500 p-5 rounded-lg shadow-md text-white text-center text-lg cursor-pointer flex flex-row items-center justify-center space-x-2"
                            onClick={handleReservation}
                        >
                            {totalFee > 0 && (
                                <div className="flex flex-row items-center space-x-2">
                                    <div>{totalFee}원</div>
                                    <LuDot />
                                </div>
                            )}
                            <div className="font-extrabold">예약하기</div>
                        </div>
                    </div>
>>>>>>> 1b837fcc81921c06b86204d777856811fd2e4840
                </div>
                {selectedInstructor &&
                  Object.keys(selectedInstructor).length > 0 && (
                    <div className="flex flex-col w-1/3">
                      <div className="text-xs text-gray-500">지정 강사</div>
                      <div>{selectedInstructor.userName}</div>
                    </div>
                  )}
              </div>

              <div className="flex flex-row space-x-12 pt-3">
                <div className="flex flex-col w-1/3">
                  <div className="text-xs text-gray-500">일시</div>
                  <div className="text-sm">{lessonDate}</div>
                  <div className="text-sm">{`${formatTime(
                    startTime
                  )} ~ ${new Date(
                    new Date(
                      `${lessonDate}T${formatTime(startTime)}`
                    ).getTime() +
                      duration * 60 * 60 * 1000
                  ).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hourCycle: "h23",
                  })}`}</div>
                </div>
                <div className="flex flex-col w-1/5">
                  <div className="text-xs text-gray-500">인원</div>
                  <div>{studentCount}명</div>
                </div>
                <div className="flex flex-col w-2/5">
                  <div className="text-xs text-gray-500">요청사항</div>
                  <input
                    className="w-full p-2 border rounded"
                    type="text"
                    value={requestComplain}
                    onChange={(e) => handleRequestChange(e.target.value)}
                    placeholder="요청사항을 입력해주세요"
                  />
                </div>
              </div>
            </div>
            <div className="bg-primary-50 p-5 rounded-lg shadow-md">
              <div className="font-bold mb-2">예약자 정보</div>
              <div className="flex flex-row space-x-4 items-center">
                <div className="text-xs text-gray-500">예약자</div>
                <div>{profile?.userName}</div>
              </div>
              <div className="flex flex-row space-x-4 items-center">
                <div className="text-xs text-gray-500">연락처</div>
                <div>{profile?.phoneNumber}</div>
              </div>
            </div>
            <StudentInfoForm
              studentInfo={data.studentInfo}
              handleInputChange={handleInputChange}
              handleFootSizeChange={handleFootSizeChange}
            />
          </div>
          <div className="sm:w-2/5 space-y-5 mt-5 sm:mt-0">
            <div className="bg-primary-50 p-5 rounded-lg shadow-md">
              <div className="flex flex-row items-center pb-2">
                <div className="font-extrabold">최종 결제금액</div>
                <div
                  className="ml-3 w-4 text-black cursor-pointer"
                  data-tooltip-id="explain-fee"
                  data-tooltip-place="top"
                  data-tip="최종 결제 금액 산출 = (기본 강습비 + 인원 옵션비 + 레벨 옵션비) x 강습 시간 + 지정 옵션비"
                >
                  <IoIosInformationCircleOutline />
                </div>
                <Tooltip place="top" id="explain-fee">
                  기본 강습비, 인원 옵션비, 레벨 옵션비에 강습 시간을 곱하고
                  지정 옵션비를 더한 금액입니다.
                </Tooltip>
              </div>

              <div className="w-full flex flex-row justify-between items-center">
                <div className="text-sm text-gray-500">기존 강습비</div>
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
                <div>{designatedFeeResult ?? 0}</div>
              </div>
              <div className="w-full my-[1%] border-[1px] border-black"></div>
              <div className="w-full flex flex-row justify-between pb-3">
                <div className="font-extrabold">총 결제금액</div>
                <div className="text-blue-500 font-extrabold">{totalFee}원</div>
              </div>
            </div>
            <AgreementForm
              agreements={agreements}
              handleAgreementChange={handleAgreementChange}
              handleAgreeAll={handleAgreeAll}
            />
            <PaymentMethodForm
              paymentMethod={paymentMethod}
              handlePaymentChange={handlePaymentChange}
            />
            <div
              className="bg-primary-500 p-5 rounded-lg shadow-md text-white text-center cursor-pointer"
              onClick={handleReservation}
            >
              예약하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
