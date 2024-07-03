import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import NavbarInstructor from "../../../components/common/NavbarInstructor";

const InstructorMain = () => {
    const [view, setView] = useState("monthly");
    const [modalOpen, setModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: "",
        start: "",
        end: "",
        location: "",
        reserver: "",
    });
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    const events = [
        {
            title: "Meeting1",
            start: new Date("2024-6-10"),
            location: "Room 101",
            reserver: "John Doe",
        },
        {
            title: "Meeting2",
            start: new Date("2024-6-11"),
            location: "Room 102",
            reserver: "Jane Doe",
        },
        {
            title: "Afternoon Meeting",
            start: "2024-06-25T15:00:00",
            end: "2024-06-25T17:00:00",
            location: "Room 103",
            reserver: "Alice Smith",
        },
    ];

    const handleEventClick = (clickInfo: { event: any }) => {
        setSelectedEvent(clickInfo.event);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleAddEvent = () => {
        events.push({
            title: newEvent.title,
            start: newEvent.start,
            end: newEvent.end,
            location: newEvent.location,
            reserver: newEvent.reserver,
        });
        setNewEvent({
            title: "",
            start: "",
            end: "",
            location: "",
            reserver: "",
        });
        setModalOpen(false);
    };

    return (
        <div>
            <NavbarInstructor />
            <div className="flex flex-col h-5/6 px-10 py-10 space-y-10">
                <div className="flex space-x-4">
                    <button
                        onClick={() => setView("monthly")}
                        className={`w-32 h-10 ${
                            view === "monthly"
                                ? "bg-primary-600"
                                : "bg-primary-500"
                        } text-white text-lg rounded-lg flex items-center justify-center`}
                    >
                        월간
                    </button>
                    <button
                        onClick={() => setView("weekly")}
                        className={`w-32 h-10 ${
                            view === "weekly"
                                ? "bg-primary-600"
                                : "bg-primary-500"
                        } text-white text-lg rounded-lg flex items-center justify-center`}
                    >
                        주간
                    </button>
                    <button
                        onClick={() => setView("daily")}
                        className={`w-32 h-10 ${
                            view === "daily"
                                ? "bg-primary-600"
                                : "bg-primary-500"
                        } text-white text-lg rounded-lg flex items-center justify-center`}
                    >
                        일간
                    </button>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="w-32 h-10 bg-primary-500 text-white text-lg rounded-lg flex items-center justify-center"
                    >
                        일정 등록
                    </button>
                </div>

                {view === "monthly" && (
                    <div className="flex flex-col w-3/5 h-auto">
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            events={events}
                            navLinks={true}
                            eventClick={handleEventClick}
                            locale="ko"
                            editable={true}
                        />
                    </div>
                )}

                {view === "weekly" && (
                    <div className="flex flex-col w-3/5 h-auto">
                        <FullCalendar
                            plugins={[timeGridPlugin, interactionPlugin]}
                            initialView="timeGridWeek"
                            events={events}
                            navLinks={true}
                            eventClick={handleEventClick}
                            locale="ko"
                            editable={true}
                        />
                    </div>
                )}

                {view === "daily" && (
                    <div className="flex flex-col w-3/5 h-auto">
                        <FullCalendar
                            plugins={[timeGridPlugin, interactionPlugin]}
                            initialView="timeGridDay"
                            events={events}
                            navLinks={true}
                            eventClick={handleEventClick}
                            locale="ko"
                            editable={true}
                        />
                    </div>
                )}

                {selectedEvent && (
                    <div
                        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
                        onClick={() => setSelectedEvent(null)}
                    >
                        <div
                            className="bg-white p-5 rounded-lg shadow-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-xl font-bold mb-2">
                                {selectedEvent.title}
                            </h2>
                            <p>장소: {selectedEvent.extendedProps.location}</p>
                            <p>일시: {selectedEvent.startStr}</p>
                            <p>
                                예약자: {selectedEvent.extendedProps.reserver}
                            </p>
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="mt-4 bg-primary-500 text-white py-2 px-4 rounded-lg"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                )}

                {modalOpen && (
                    <div
                        className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
                        onClick={() => setModalOpen(false)}
                    >
                        <div
                            className="bg-white p-6 rounded-lg shadow-md w-1/3"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-xl font-bold mb-4">
                                새 일정 등록
                            </h2>
                            <div className="mb-4">
                                <label className="block mb-2">제목</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newEvent.title}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">시작 시간</label>
                                <input
                                    type="datetime-local"
                                    name="start"
                                    value={newEvent.start}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">종료 시간</label>
                                <input
                                    type="datetime-local"
                                    name="end"
                                    value={newEvent.end}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">장소</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={newEvent.location}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">예약자</label>
                                <input
                                    type="text"
                                    name="reserver"
                                    value={newEvent.reserver}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <button
                                onClick={handleAddEvent}
                                className="w-full bg-primary-500 text-white py-2 rounded-lg"
                            >
                                등록
                            </button>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="w-full mt-2 bg-gray-300 text-black py-2 rounded-lg"
                            >
                                취소
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstructorMain;
