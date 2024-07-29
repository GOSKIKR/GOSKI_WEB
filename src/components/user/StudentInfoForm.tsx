import React from "react";
import { StudentInfo } from "../../dto/UserReserveDTO";

interface StudentInfoFormProps {
    studentInfo: StudentInfo[];
    handleInputChange: (
        index: number,
        field: keyof StudentInfo,
        value: string | number
    ) => void;
    handleFootSizeChange: (index: number, change: number) => void;
}

const ageOptions = [
    { value: "1", label: "미취학 아동" },
    { value: "2", label: "초등학생" },
    { value: "3", label: "중고등학생" },
    { value: "4", label: "20대" },
    { value: "5", label: "30대" },
    { value: "6", label: "40대" },
    { value: "7", label: "50대" },
    { value: "8", label: "60대 이상" },
];

const heightOptions = [
    { value: "1", label: "140cm 미만" },
    { value: "2", label: "140cm ~ 149cm" },
    { value: "3", label: "150cm ~ 159cm" },
    { value: "4", label: "160cm ~ 169cm" },
    { value: "5", label: "170cm ~ 179cm" },
    { value: "6", label: "180cm 이상" },
];

const weightOptions = [
    { value: "1", label: "40kg 미만" },
    { value: "2", label: "40kg ~ 49kg" },
    { value: "3", label: "50kg ~ 59kg" },
    { value: "4", label: "60kg ~ 69kg" },
    { value: "5", label: "70kg ~ 79kg" },
    { value: "6", label: "80kg ~ 89kg" },
    { value: "7", label: "90kg ~ 99kg" },
    { value: "8", label: "100kg 이상" },
];

const StudentInfoForm: React.FC<StudentInfoFormProps> = ({
    studentInfo,
    handleInputChange,
    handleFootSizeChange,
}) => {
    return (
        <div className="bg-primary-50 p-5 rounded-lg shadow-md">
            <div className="font-bold mb-2">강습 인원 정보</div>
            <div className="sm:grid sm:grid-cols-3 flex flex-col gap-4">
                {studentInfo.map((student, index) => (
                    <div key={index} className="bg-white p-4 space-y-2">
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
                                <option value="select">연령대</option>
                                {ageOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <div className="flex flex-row flex-1 items-center justify-center text-center">
                                <button
                                    className={`grow h-8 rounded-l-lg ${
                                        student.gender === "male"
                                            ? "bg-primary-200"
                                            : "bg-white"
                                    } border-gray-300 border-y-2 border-l-2`}
                                    onClick={() =>
                                        handleInputChange(
                                            index,
                                            "gender",
                                            "male"
                                        )
                                    }
                                >
                                    남성
                                </button>
                                <button
                                    className={`grow h-8 rounded-r-lg ${
                                        student.gender === "female"
                                            ? "bg-primary-200"
                                            : "bg-white"
                                    } border-gray-300 border-r-2 border-y-2`}
                                    onClick={() =>
                                        handleInputChange(
                                            index,
                                            "gender",
                                            "female"
                                        )
                                    }
                                >
                                    여성
                                </button>
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
                                <option value="select">신장</option>
                                {heightOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
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
                                <option value="select">체중</option>
                                {weightOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <div className="flex items-center justify-center">
                                <button
                                    className="border p-1 w-1/5 h-8 rounded bg-primary-200"
                                    onClick={() =>
                                        handleFootSizeChange(index, -10)
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
                                        handleFootSizeChange(index, 10)
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
    );
};

export default StudentInfoForm;
