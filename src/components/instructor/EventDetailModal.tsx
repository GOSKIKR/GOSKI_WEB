import React from "react";

interface EventDetailModalProps {
    event: any;
    onClose: () => void;
    goToLessonDetail: () => void;
    modalPosition: { x: number; y: number };
    instructorName: string;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({
    event,
    onClose,
    goToLessonDetail,
    modalPosition,
    instructorName,
}) => {
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
                className="flex flex-col bg-primary-200 p-5 rounded-lg shadow-md w-52 h-48 sm:w-72 sm:h-60 sm:text-base text-sm"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="sm:text-xl font-bold mb-2">{event.title}</h2>
                <p className="flex flex-row space-x-5">
                    <div className="font-extrabold">강사</div>
                    <div>{instructorName}</div>
                </p>
                <p className="flex flex-row space-x-2 sm:space-x-5">
                    <div className="font-extrabold w-12">장소</div>
                    <div>{event.extendedProps.location}</div>
                </p>
                <p className="flex flex-row space-x-2 sm:space-x-5">
                    <div className="font-extrabold w-24">일시</div>
                    <div>
                        {new Date(event.start).toLocaleString("ko-KR", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            weekday: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}{" "}
                        ~{" "}
                        {new Date(event.end).toLocaleString("ko-KR", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                </p>
                <p className="flex flex-row space-x-5">
                    <div className="font-extrabold">예약자</div>
                    <div>
                        {event.extendedProps.reserver} 외{" "}
                        {event.extendedProps.studentCount}명
                    </div>
                </p>
                <div className="flex flex-row">
                    <button
                        className="mt-2 sm:mt-4 sm:py-2 py-1 bg-gray-500 text-white rounded-md mx-auto block sm:w-24 w-16"
                        onClick={goToLessonDetail}
                    >
                        더보기
                    </button>
                    <button
                        className="mt-2 sm:mt-4 sm:py-2 py-1 bg-blue-500 text-white rounded-md mx-auto block sm:w-24 w-16"
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
