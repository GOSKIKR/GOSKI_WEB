import React from "react";

interface EventDetailModalProps {
    event: any;
    onClose: () => void;
    goToLessonDetail: () => void;
    modalPosition: { x: number; y: number };
    instructorName?: string;
    userId?: number;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({
    event,
    onClose,
    goToLessonDetail,
    modalPosition,
    instructorName,
    userId,
}) => {
    const isInstructor = userId === event.extendedProps.instructorId; // 강사 아이디가 사용자 아이디와 일치하는지 확인

    return (
        <div
            className="fixed z-50"
            style={{
                top: modalPosition.y,
                left: modalPosition.x + 100,
                transform: "translate(-50%, -50%)",
            }}
        >
            <div
                className="flex flex-col bg-[#e1e5fa] p-5 rounded-lg shadow-md w-52 sm:w-60 text-sm space-y-2 items-center"
                onClick={(e) => e.stopPropagation()}
            >
                {!isInstructor && instructorName && (
                    <div className="flex flex-row space-x-2 sm:space-x-3">
                        <div className="font-extrabold w-12 text-center">
                            강사
                        </div>
                        <div className="w-36">{instructorName}</div>
                    </div>
                )}
                <p className="flex flex-row space-x-2 sm:space-x-3">
                    <div className="font-extrabold w-12 text-center">장소</div>
                    <div className="w-36">{event.extendedProps.location}</div>
                </p>
                <p className="flex flex-row space-x-2 sm:space-x-3">
                    <div className="font-extrabold w-12 text-center">일시</div>
                    <div className="w-36">
                        <div>
                            {new Date(event.start).toLocaleString("ko-KR", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                weekday: "short",
                            })}
                        </div>
                        <div>
                            {" "}
                            {new Date(event.start).toLocaleString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                            ~{" "}
                            {new Date(event.end).toLocaleString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </div>
                    </div>
                </p>
                <p className="flex flex-row space-x-3">
                    <div className="font-extrabold w-12 text-center">
                        예약자
                    </div>
                    <div className="w-36">
                        {event.extendedProps.reserver} 외{" "}
                        {event.extendedProps.studentCount}명
                    </div>
                </p>
                <div className="flex flex-row space-x-5">
                    {isInstructor && ( // 조건부 렌더링
                        <button
                            className="mt-2 sm:mt-0 sm:py-0 py-1 bg-gray-500 text-white rounded-md block sm:w-20 sm:h-8 w-16"
                            onClick={goToLessonDetail}
                        >
                            더보기
                        </button>
                    )}
                    <button
                        className="mt-2 sm:mt-0 sm:py-0 py-1 bg-[#343B7B] text-white rounded-md block sm:w-20 sm:h-8 w-16"
                        onClick={onClose}
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventDetailModal;
