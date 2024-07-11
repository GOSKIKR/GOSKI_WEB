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
                  (lesson) => lesson.lessonStatus === selectedStatus
              );

    return (
        <div className="flex flex-col space-y-10 w-full mb-4">
            <div className="w-full sm:h-16 h-12 sm:text-md text-sm bg-primary-50 rounded-3xl shadow-md flex flex-row items-center text-center divide-x divide-black">
                {["전체", "진행 예정", "진행 중", "강습 완료"].map((status) => (
                    <div
                        key={status}
                        className={`w-1/3 cursor-pointer ${
                            selectedStatus === status
                                ? "font-extrabold text-md"
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
