import React, { useState, useTransition } from "react";
import NavbarUser from "../../../components/common/NavbarUser";
import NavbarUserMobile from "../../../components/common/NavbarUserMobile";

interface StudentInfo {
    height: string;
    weight: string;
    footSize: number;
    age: string;
    gender: string;
    name: string;
}

interface LessonData {
    teamId: number;
    instId: number;
    lessonDate: string;
    startTime: string;
    duration: number;
    peopleNumber: number;
    lessonType: string;
    basicFee: number;
    designatedFee: number;
    peopleOptionFee: number;
    levelOptionFee: number;
    requestComplain: string;
    coupon_id?: number;
    studentInfo: StudentInfo[];
}

const initialData: LessonData = {
    teamId: 1,
    instId: 1,
    lessonDate: "2024-05-01",
    startTime: "1400",
    duration: 2,
    peopleNumber: 3,
    lessonType: "1010000",
    basicFee: 100000,
    designatedFee: 50000,
    peopleOptionFee: 30000,
    levelOptionFee: 20000,
    requestComplain: "",
    studentInfo: [
        {
            height: "",
            weight: "",
            footSize: 260,
            age: "",
            gender: "",
            name: "",
        },
        {
            height: "",
            weight: "",
            footSize: 260,
            age: "",
            gender: "",
            name: "",
        },
        {
            height: "",
            weight: "",
            footSize: 260,
            age: "",
            gender: "",
            name: "",
        },
    ],
};

const Payment = () => {
    const [data, setData] = useState(initialData);
    const [agreements, setAgreements] = useState({
        personalInfo: false,
        thirdParty: false,
        marketing: false,
    });
    const [paymentMethod, setPaymentMethod] = useState({
        kakao: false,
        naver: false,
    });

    const handleInputChange = (
        index: number,
        field: keyof StudentInfo,
        value: string | number
    ) => {
        const updatedStudentInfo = data.studentInfo.map((student, i) =>
            i === index ? { ...student, [field]: value } : student
        );
        setData({ ...data, studentInfo: updatedStudentInfo });
    };

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
        const updatedStudentInfo = data.studentInfo.map((student, i) => {
            const newSize = student.footSize + change;
            if (i === index) {
                if (newSize >= 150 && newSize <= 320) {
                    return { ...student, footSize: newSize };
                }
            }
            return student;
        });
        setData({ ...data, studentInfo: updatedStudentInfo });
    };

    return (
        <div>
            <div className="w-full">
                {innerWidth > 640 ? <NavbarUser /> : <NavbarUserMobile />}
            </div>
            <div className="p-10">
                <div className="text-2xl font-bold mb-8">결제하기</div>
                <div className="flex flex-col sm:flex-row sm:space-x-5">
                    <div className="w-full sm:w-3/5 space-y-5">
                        <div className="bg-primary-50 p-5 rounded-lg shadow-md">
                            <div className="font-extrabold text-lg mb-2">
                                강습 예약 정보
                            </div>
                            <div className="font-bold text-lg">스키장 이름</div>
                            <div className="flex flex-row space-x-12 pt-3">
                                <div className="flex flex-col">
                                    <div className="text-xs text-gray-500">
                                        일시
                                    </div>
                                    <div>{data.lessonDate}</div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-xs text-gray-500">
                                        인원
                                    </div>
                                    <div>{data.peopleNumber}명</div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-xs text-gray-500">
                                        요청사항
                                    </div>
                                    <div>{data.requestComplain || "없음"}</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-primary-50 p-5 rounded-lg shadow-md">
                            <div className="font-bold mb-2">예약자 정보</div>
                            <div>예약자: 김현지</div>
                            <div>연락처: 010.0000.0000</div>
                            <div>이메일: 김현지@gmail.com</div>
                        </div>
                        <div className="bg-primary-50 p-5 rounded-lg shadow-md">
                            <div className="font-bold mb-2">강습 인원 정보</div>
                            <div className="sm:grid sm:grid-cols-3 flex flex-col gap-4">
                                {data.studentInfo.map((student, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-4 space-y-2"
                                    >
                                        <div className="flex flex-col space-y-2">
                                            <input
                                                type="text"
                                                value={student.name}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        index,
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                className="border p-1 h-8 rounded bg-primary-100 placeholder:text-black"
                                                placeholder="이름"
                                            />
                                            <select
                                                value={student.age}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        index,
                                                        "age",
                                                        e.target.value
                                                    )
                                                }
                                                className="border p-1 rounded bg-primary-100 h-8"
                                                name="연령대"
                                            >
                                                <option value="select">
                                                    연령대
                                                </option>
                                                <option value="1">
                                                    미취학 아동
                                                </option>
                                                <option value="2">
                                                    초등학생
                                                </option>
                                                <option value="3">
                                                    중고등학생
                                                </option>
                                                <option value="4">20대</option>
                                                <option value="5">30대</option>
                                                <option value="6">40대</option>
                                                <option value="7">50대</option>
                                                <option value="8">
                                                    60대 이상
                                                </option>
                                            </select>
                                            <div className="flex flex-row flex-1 items-center justify-center text-center">
                                                <div className="grow h-8 rounded-l-lg bg-primary-200 border-gray-300 border-y-2 border-l-2">
                                                    남성
                                                </div>
                                                <div className="grow h-8 rounded-r-lg border-gray-300 border-r-2 border-y-2">
                                                    여성
                                                </div>
                                            </div>
                                            <select
                                                value={student.height}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        index,
                                                        "height",
                                                        e.target.value
                                                    )
                                                }
                                                className="border p-1 rounded bg-primary-100 h-8"
                                                name="신장"
                                            >
                                                <option value="select">
                                                    신장
                                                </option>
                                                <option value="1">
                                                    140cm 미만
                                                </option>
                                                <option value="2">
                                                    140cm ~ 149cm
                                                </option>
                                                <option value="3">
                                                    150cm ~ 159cm
                                                </option>
                                                <option value="4">
                                                    160cm ~ 169cm
                                                </option>
                                                <option value="5">
                                                    170cm ~ 179cm
                                                </option>
                                                <option value="6">
                                                    180cm 이상
                                                </option>
                                            </select>
                                            <select
                                                value={student.weight}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        index,
                                                        "weight",
                                                        e.target.value
                                                    )
                                                }
                                                className="border p-1 rounded bg-primary-100 h-8"
                                                name="체중"
                                            >
                                                <option value="select">
                                                    체중
                                                </option>
                                                <option value="1">
                                                    40kg 미만
                                                </option>
                                                <option value="2">
                                                    40kg ~ 49kg
                                                </option>
                                                <option value="3">
                                                    50kg ~ 59kg
                                                </option>
                                                <option value="4">
                                                    60kg ~ 69kg
                                                </option>
                                                <option value="5">
                                                    70kg ~ 79kg
                                                </option>
                                                <option value="6">
                                                    80kg ~ 89kg
                                                </option>
                                                <option value="5">
                                                    90kg ~ 99kg
                                                </option>
                                                <option value="6">
                                                    100kg 이상
                                                </option>
                                            </select>
                                            <div className="flex items-center justify-center">
                                                <button
                                                    className="border p-1 w-1/5 h-8 rounded bg-primary-200"
                                                    onClick={() =>
                                                        handleFootSizeChange(
                                                            index,
                                                            -10
                                                        )
                                                    }
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={student.footSize}
                                                    readOnly
                                                    className="border p-1 w-3/5 h-8 rounded bg-primary-100 placeholder:text-black text-center"
                                                />
                                                <button
                                                    className="border p-1 w-1/5 h-8 rounded bg-primary-200"
                                                    onClick={() =>
                                                        handleFootSizeChange(
                                                            index,
                                                            10
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="sm:w-2/5 space-y-5 mt-5 sm:mt-0">
                        <div className="bg-primary-50 p-5 rounded-lg shadow-md">
                            <div className="font-extrabold pb-2 w-full">
                                최종 결제금액
                            </div>
                            <div className="w-full flex flex-row justify-between">
                                <div>기존 강습비</div>
                                <div>10000원</div>
                            </div>
                            <div className="w-full flex flex-row justify-between">
                                <div>레벨 옵션비</div>
                                <div>10000원</div>
                            </div>
                            <div className="w-full my-[1%] border-[1px] border-black"></div>
                            <div className="w-full flex flex-row justify-between pb-3">
                                <div className="font-extrabold">
                                    총 결제금액
                                </div>
                                <div className="text-blue-500 font-extrabold">
                                    20000원
                                </div>
                            </div>
                        </div>
                        <div className="bg-primary-50 p-5 rounded-lg shadow-md">
                            <div className="font-bold mb-2">약관 동의</div>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={agreements.personalInfo}
                                    onChange={(e) =>
                                        handleAgreementChange(
                                            "personalInfo",
                                            e.target.checked
                                        )
                                    }
                                />{" "}
                                [필수] 개인정보 수집 및 이용
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={agreements.thirdParty}
                                    onChange={(e) =>
                                        handleAgreementChange(
                                            "thirdParty",
                                            e.target.checked
                                        )
                                    }
                                />{" "}
                                [필수] 개인정보 제 3자 제공
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={agreements.marketing}
                                    onChange={(e) =>
                                        handleAgreementChange(
                                            "marketing",
                                            e.target.checked
                                        )
                                    }
                                />{" "}
                                [선택] 마케팅 수신 동의
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={
                                        agreements.personalInfo &&
                                        agreements.thirdParty &&
                                        agreements.marketing
                                    }
                                    onChange={handleAgreeAll}
                                />{" "}
                                전체 동의하기
                            </div>
                        </div>
                        <div className="bg-primary-50 p-5 rounded-lg shadow-md">
                            <div className="font-bold mb-2">결제 방법</div>
                            <div className="flex flex-row">
                                <div className="flex flex-row items-center">
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod.kakao}
                                        onChange={(e) =>
                                            handlePaymentChange(
                                                "kakao",
                                                e.target.checked
                                            )
                                        }
                                    />{" "}
                                    <img
                                        src="/assets/images/kakaoPay.png"
                                        className="py-2 ml-4 h-2/3 w-auto"
                                    />
                                </div>
                                <div className="flex flex-row items-center">
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod.naver}
                                        onChange={(e) =>
                                            handlePaymentChange(
                                                "naver",
                                                e.target.checked
                                            )
                                        }
                                    />{" "}
                                    <img
                                        src="/assets/images/naverPay.png"
                                        className="py-2 ml-4 h-2/3 w-auto"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-primary-500 p-5 rounded-lg shadow-md text-white text-center cursor-pointer">
                            예약하기
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
