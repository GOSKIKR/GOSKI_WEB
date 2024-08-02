import React, { useState, useEffect } from "react";
import LessonlistCard from "./LessonlistCard";
import { UserLessonDTO } from "../../dto/UserLessonDTO";
import { UserPaylistDTO } from "../../dto/PaymentDTO";
import { UserLessonService } from "../../api/UserLessonService";
import { PaymentService } from "../../api/PaymentService";

const UserLessonlist = () => {
    const [selectedStatus, setSelectedStatus] = useState<string>("전체");
    const [paymentDetails, setPaymentDetails] = useState<UserPaylistDTO[]>([]);
    const [lessons, setLessons] = useState<UserLessonDTO[]>([]);

    const handleStatusClick = (status: string) => {
        setSelectedStatus(status);
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

    useEffect(() => {
        const fetchLessonAndPaymentData = async () => {
            const userLessonService = new UserLessonService();
            const paymentService = new PaymentService();
            const [userLessons, payments] = await Promise.all([
                userLessonService.getUserLessonlist(),
                paymentService.getPaymentList(),
            ]);
            if (userLessons) {
                setLessons(userLessons);
            }
            if (payments) {
                setPaymentDetails(payments);
            }
        };
        fetchLessonAndPaymentData();
    }, []);

    const getPaymentDetailByLessonId = (lessonId: number) => {
        return paymentDetails.find((payment) => payment.lessonId === lessonId);
    };

    const filteredLessons =
        selectedStatus === "전체"
            ? lessons
            : lessons.filter(
                  (lesson) =>
                      getStatusName(lesson.lessonStatus) === selectedStatus
              );

    return (
        <div className="flex flex-col space-y-10 w-full mb-4 items-center">
            <div className="w-full sm:h-16 h-12 sm:text-base text-sm bg-primary-50 rounded-3xl shadow-md flex flex-row items-center text-center divide-x divide-black">
                {["전체", "강습 예정", "진행 중", "강습 완료"].map((status) => (
                    <div
                        key={status}
                        className={`w-1/3 cursor-pointer ${
                            selectedStatus === status
                                ? "font-extrabold text-primary-600 text-md"
                                : ""
                        }`}
                        onClick={() => handleStatusClick(status)}
                    >
                        {status}
                    </div>
                ))}
            </div>
            {filteredLessons.map((userLessons) => (
                <LessonlistCard
                    key={userLessons.lessonId}
                    lesson={userLessons}
                    paymentDetail={getPaymentDetailByLessonId(
                        userLessons.lessonId
                    )}
                />
            ))}
        </div>
    );
};

export default UserLessonlist;
