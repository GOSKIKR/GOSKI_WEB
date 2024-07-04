import React, { useState, useEffect, ChangeEvent } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";
import NavbarInstructor from "../../../components/common/NavbarInstructor";
import { IoIosArrowForward } from "react-icons/io";

interface Event {
    teamId: number;
    instructorId: number;
    lessonType: string;
    level: string;
    lessonDate: string;
    startTime: string;
    duration: number;
    studentCount: number;
    userName: string;
    content: string;
    eventId?: number; // optional, for new events
    resortName?: string;
    teamName?: string;
    representativeName?: string;
}

interface Team {
    teamId: number;
    teamName: string;
    profileUrl: string;
    description: string;
    resortName: string;
    permissions: string;
}

//내가 속한 팀들
const dummyTeamData: Team[] = [
    {
        teamId: 1,
        teamName: "Team Alpha",
        profileUrl: "https://example.com/images/team-alpha.jpg",
        description:
            "A highly skilled team specializing in advanced skiing techniques.",
        resortName: "Snowy Resort",
        permissions: "Full Access",
    },
    {
        teamId: 2,
        teamName: "Team Beta",
        profileUrl: "https://example.com/images/team-beta.jpg",
        description:
            "Intermediate snowboarders focusing on freestyle and terrain park skills.",
        resortName: "Sunny Resort",
        permissions: "Limited Access",
    },
    {
        teamId: 3,
        teamName: "Team Gamma",
        profileUrl: "https://example.com/images/team-gamma.jpg",
        description:
            "Beginner team dedicated to teaching fundamental skiing and snowboarding skills.",
        resortName: "Windy Resort",
        permissions: "View Only",
    },
];

//내 스케줄 요청해서 받은 데이터
const dummyPersonalEventData: Event[] = [
    {
        teamId: 1,
        instructorId: 1, //나
        lessonType: "Ski",
        level: "Beginner",
        lessonDate: "2024-07-01",
        startTime: "15:00",
        duration: 2,
        studentCount: 3,
        userName: "John Smith",
        content: "Lesson content 1",
        eventId: 101,
        teamName: "Team Alpha",
        resortName: "Snowy Resort",
        representativeName: "John Smith",
    },
    {
        teamId: 2,
        instructorId: 1,
        lessonType: "Snowboard",
        level: "Intermediate",
        lessonDate: "2024-07-02",
        startTime: "10:00",
        duration: 3,
        studentCount: 2,
        userName: "Jane Doe",
        content: "Lesson content 2",
        eventId: 102,
        teamName: "Team Beta",
        resortName: "Sunny Resort",
        representativeName: "Jane Doe",
    },
    {
        teamId: 3,
        instructorId: 1,
        lessonType: "Ski",
        level: "Beginner",
        lessonDate: "2024-07-05",
        startTime: "11:00",
        duration: 4,
        studentCount: 2,
        userName: "Bob Brown",
        content: "Lesson content 4",
        eventId: 104,
        teamName: "Team Beta",
        resortName: "Rainy Resort",
        representativeName: "Bob Brown",
    },
];

//팀별 이벤트 데이터
const dummyTeamEventData: { [key: number]: Event[] } = {
    1: [
        {
            teamId: 1,
            instructorId: 1,
            lessonType: "Ski",
            level: "Beginner",
            lessonDate: "2024-07-01",
            startTime: "15:00",
            duration: 2,
            studentCount: 3,
            userName: "John Smith",
            content: "Lesson content 1",
            eventId: 101,
            teamName: "Team Alpha",
            resortName: "Snowy Resort",
            representativeName: "John Smith",
        },
        {
            teamId: 1,
            instructorId: 3,
            lessonType: "Ski",
            level: "Advanced",
            lessonDate: "2024-07-01",
            startTime: "17:00",
            duration: 2,
            studentCount: 3,
            userName: "Alice Johnson",
            content: "Lesson content 3",
            eventId: 103,
            teamName: "Team Alpha",
            resortName: "Snowy Resort",
            representativeName: "Alice Johnson",
        },
    ],
    2: [
        {
            teamId: 2,
            instructorId: 1,
            lessonType: "Ski",
            level: "Beginner",
            lessonDate: "2024-07-04",
            startTime: "11:00",
            duration: 4,
            studentCount: 2,
            userName: "Bob Brown",
            content: "Lesson content 4",
            eventId: 104,
            teamName: "Team Beta",
            resortName: "Rainy Resort",
            representativeName: "Bob Brown",
        },
        {
            teamId: 2,
            instructorId: 3,
            lessonType: "Ski",
            level: "Beginner",
            lessonDate: "2024-07-04",
            startTime: "11:00",
            duration: 4,
            studentCount: 2,
            userName: "Bob Brown",
            content: "Lesson content 4",
            eventId: 104,
            teamName: "Team Beta",
            resortName: "Rainy Resort",
            representativeName: "Bob Brown",
        },
    ],
    3: [
        {
            teamId: 3,
            instructorId: 1,
            lessonType: "Ski",
            level: "Beginner",
            lessonDate: "2024-07-05",
            startTime: "11:00",
            duration: 4,
            studentCount: 2,
            userName: "Bob Brown",
            content: "Lesson content 4",
            eventId: 104,
            teamName: "Team Gamma",
            resortName: "Rainy Resort",
            representativeName: "Bob Brown",
        },
        {
            teamId: 3,
            instructorId: 3,
            lessonType: "Ski",
            level: "Beginner",
            lessonDate: "2024-07-03",
            startTime: "11:00",
            duration: 4,
            studentCount: 2,
            userName: "Bob Brown",
            content: "Lesson content 4",
            eventId: 104,
            teamName: "Team Gamma",
            resortName: "Rainy Resort",
            representativeName: "Bob Brown",
        },
    ],
};

const InstructorMain = () => {
    const [view, setView] = useState("weekly");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
    const [newEvent, setNewEvent] = useState<Event>({
        teamId: 0,
        instructorId: 0,
        lessonType: "",
        level: "",
        lessonDate: "",
        startTime: "",
        duration: 0,
        studentCount: 0,
        userName: "",
        content: "",
    });
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const [personalEventData, setPersonalEventData] = useState<Event[]>(
        dummyPersonalEventData
    );
    const [teamEventData, setTeamEventData] = useState<Event[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedTeam) {
            setTeamEventData(dummyTeamEventData[selectedTeam]);
        }
    }, [selectedTeam]);

    const events = (selectedTeam ? teamEventData : personalEventData).map(
        (event) => {
            const [hours, minutes] = event.startTime.split(":");
            const startDate = new Date(event.lessonDate);
            startDate.setHours(parseInt(hours), parseInt(minutes));

            const endDate = new Date(startDate);
            endDate.setHours(startDate.getHours() + event.duration);

            return {
                title: event.representativeName,
                start: startDate,
                end: endDate,
                location: event.resortName,
                reserver: event.userName,
            };
        }
    );

    const handleEventClick = (clickInfo: any) => {
        const { clientX, clientY } = clickInfo.jsEvent;
        setModalPosition({ x: clientX, y: clientY });
        setSelectedEvent(clickInfo.event);
    };

    const handleInputChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleAddEvent = () => {
        const newEventWithId = {
            ...newEvent,
            eventId:
                (selectedTeam ? teamEventData : personalEventData).length + 1,
        };

        if (selectedTeam) {
            setTeamEventData([...teamEventData, newEventWithId]);
        } else {
            setPersonalEventData([...personalEventData, newEventWithId]);
        }

        const [hours, minutes] = newEvent.startTime.split(":");
        const startDate = new Date(newEvent.lessonDate);
        startDate.setHours(parseInt(hours), parseInt(minutes));

        const endDate = new Date(startDate);
        endDate.setHours(startDate.getHours() + newEvent.duration);

        setNewEvent({
            teamId: 0,
            instructorId: 0,
            lessonType: "",
            level: "",
            lessonDate: "",
            startTime: "",
            duration: 0,
            studentCount: 0,
            userName: "",
            content: "",
        });
        setModalOpen(false);
    };

    const goToLessonDetail = () => {
        navigate(`/instructor/detail`);
    };

    return (
        <div>
            <NavbarInstructor />
            <div className="flex flex-col py-10 space-y-12 sm:space-x-10">
                <div className="bg-primary-50 flex flex-col sm:mx-12 mx-8 rounded-lg py-8 px-4">
                    {/* 팀 선택 버튼 */}
                    <div className="flex sm:space-x-4 justify-between sm:px-20 mb-4 sm:mb-8">
                        {dummyTeamData.map((team) => (
                            <button
                                key={team.teamId}
                                onClick={() => setSelectedTeam(team.teamId)}
                                className={`sm:w-32 w-16 h-10 ${
                                    selectedTeam === team.teamId
                                        ? "bg-primary-700 text-white"
                                        : "bg-white text-black"
                                } text-sm sm:text-lg rounded-lg flex items-center justify-center`}
                            >
                                {team.teamName}
                            </button>
                        ))}
                        <button
                            onClick={() => setSelectedTeam(null)}
                            className={`sm:w-32 w-16 h-10 ${
                                selectedTeam === null
                                    ? "bg-primary-700 text-white"
                                    : "bg-white text-black"
                            } text-sm sm:text-lg rounded-lg flex items-center justify-center`}
                        >
                            내 스케줄
                        </button>
                    </div>

                    {/* 구분선 */}
                    <hr className="border-black sm:mb-8 mb-4 px-50" />

                    {/* 캘린더 선택 버튼 및 일정 등록 버튼 */}
                    <div className="flex justify-between mb-4 sm:mb-8 sm:px-20">
                        <div className="flex flex-row space-x-4">
                            <button
                                onClick={() => setView("weekly")}
                                className={`sm:w-16 w-10 h-10 ${
                                    view === "weekly"
                                        ? "bg-primary-600"
                                        : "bg-primary-500"
                                } text-white text-lg rounded-lg flex items-center justify-center`}
                            >
                                주
                            </button>
                            <button
                                onClick={() => setView("daily")}
                                className={`sm:w-16 w-10 h-10 ${
                                    view === "daily"
                                        ? "bg-primary-600"
                                        : "bg-primary-500"
                                } text-white text-lg rounded-lg flex items-center justify-center`}
                            >
                                일
                            </button>
                            <button
                                onClick={() => setView("monthly")}
                                className={`sm:w-16 w-10 h-10 ${
                                    view === "monthly"
                                        ? "bg-primary-600"
                                        : "bg-primary-500"
                                } text-white text-lg rounded-lg flex items-center justify-center`}
                            >
                                월
                            </button>
                        </div>

                        {selectedTeam && (
                            <button
                                className="fixed bottom-8 right-8 bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
                                onClick={() => setModalOpen(true)}
                            >
                                팀 일정 등록
                            </button>
                        )}
                    </div>
                    <div className="sm:text-base text-[10px]">
                        {/* 캘린더 */}
                        {view === "monthly" && (
                            <div className="flex flex-col w-50 sm:w-full sm:h-auto sm:px-24 h-96">
                                <FullCalendar
                                    plugins={[dayGridPlugin, interactionPlugin]}
                                    initialView="dayGridMonth"
                                    events={events}
                                    navLinks={true}
                                    eventClick={handleEventClick}
                                    locale="ko"
                                    editable={true}
                                    eventBackgroundColor="#343B7B"
                                />
                            </div>
                        )}

                        {view === "weekly" && (
                            <div className="flex flex-col w-50 sm:w-full sm:h-auto sm:px-24 h-96 ">
                                <FullCalendar
                                    plugins={[
                                        timeGridPlugin,
                                        interactionPlugin,
                                    ]}
                                    initialView="timeGridWeek"
                                    events={events}
                                    navLinks={true}
                                    eventClick={handleEventClick}
                                    locale="ko"
                                    editable={true}
                                    eventBackgroundColor="#343B7B"
                                />
                            </div>
                        )}

                        {view === "daily" && (
                            <div className="flex flex-col w-50 sm:w-full sm:h-auto sm:px-24 h-96">
                                <FullCalendar
                                    plugins={[
                                        timeGridPlugin,
                                        interactionPlugin,
                                    ]}
                                    initialView="timeGridDay"
                                    events={events}
                                    navLinks={true}
                                    eventClick={handleEventClick}
                                    locale="ko"
                                    editable={true}
                                    eventBackgroundColor="#343B7B"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col sm:w-3/5 sm:h-5/6 px-10 space-y-10">
                    {selectedEvent && (
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
                                <h2 className="sm:text-xl font-bold mb-2">
                                    {selectedEvent.title}
                                </h2>
                                <p className="flex flex-row space-x-2 sm:space-x-5">
                                    <div className="font-extrabold w-12">
                                        장소
                                    </div>
                                    <div>
                                        {selectedEvent.extendedProps.location}
                                    </div>
                                </p>
                                <p className="flex flex-row space-x-2 sm:space-x-5">
                                    <div className="font-extrabold w-24">
                                        일시
                                    </div>
                                    <div>
                                        {new Date(
                                            selectedEvent.start
                                        ).toLocaleString("ko-KR", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            weekday: "short",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}{" "}
                                        ~{" "}
                                        {new Date(
                                            selectedEvent.end
                                        ).toLocaleString("ko-KR", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </div>
                                </p>

                                <p className="flex flex-row space-x-5">
                                    <div className="font-extrabold">예약자</div>
                                    <div>
                                        {selectedEvent.extendedProps.reserver}{" "}
                                        외{" "}
                                        {
                                            selectedEvent.extendedProps
                                                .studentCount
                                        }
                                        명
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
                                        onClick={() => setSelectedEvent(null)}
                                    >
                                        닫기
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 일정 등록 모달 */}
                    {modalOpen && (
                        <div
                            className="fixed top-0 sm:left-0 h-full sm:w-full flex items-center justify-center z-50"
                            onClick={() => setModalOpen(false)}
                        >
                            <div
                                className="bg-primary-50 p-6 rounded-lg shadow-md w-4/5 h-4/5 sm:h-full sm:w-1/3 sm:text-base text-sm"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">
                                    외부 일정 등록
                                </h2>
                                <div className="mb-4">
                                    <label className="block mb-2">
                                        담당 강사
                                    </label>
                                    <select
                                        name="instructorId"
                                        value={newEvent.instructorId}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                    >
                                        <option value={1}>강사명 1</option>
                                        <option value={2}>강사명 2</option>
                                        <option value={3}>강사명 3</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">종류</label>
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() =>
                                                setNewEvent({
                                                    ...newEvent,
                                                    lessonType: "Ski",
                                                })
                                            }
                                            className={`w-1/3 h-10 ${
                                                newEvent.lessonType === "Ski"
                                                    ? "bg-primary-600 text-white"
                                                    : "bg-primary-100 text-black"
                                            } rounded-lg`}
                                        >
                                            스키
                                        </button>
                                        <button
                                            onClick={() =>
                                                setNewEvent({
                                                    ...newEvent,
                                                    lessonType: "Snowboard",
                                                })
                                            }
                                            className={`w-1/3 h-10 ${
                                                newEvent.lessonType ===
                                                "Snowboard"
                                                    ? "bg-primary-600 text-white"
                                                    : "bg-primary-100 text-black"
                                            } rounded-lg`}
                                        >
                                            보드
                                        </button>
                                        <button
                                            onClick={() =>
                                                setNewEvent({
                                                    ...newEvent,
                                                    lessonType: "휴무",
                                                })
                                            }
                                            className={`w-1/3 h-10 ${
                                                newEvent.lessonType === "휴무"
                                                    ? "bg-primary-600 text-white"
                                                    : "bg-primary-100 text-black"
                                            } rounded-lg`}
                                        >
                                            휴무
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">
                                        일정 선택
                                    </label>
                                    <input
                                        type="date"
                                        name="lessonDate"
                                        value={newEvent.lessonDate}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg mb-2"
                                    />
                                    <input
                                        type="time"
                                        name="startTime"
                                        value={newEvent.startTime}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">
                                        강습 인원
                                    </label>
                                    <select
                                        name="studentCount"
                                        value={newEvent.studentCount}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded-lg"
                                    >
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">예약자</label>
                                    <input
                                        type="text"
                                        name="userName"
                                        value={newEvent.userName}
                                        onChange={handleInputChange}
                                        placeholder="예약자를 입력하세요"
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">
                                        특이사항
                                    </label>
                                    <textarea
                                        name="content"
                                        value={newEvent.content}
                                        onChange={handleInputChange}
                                        placeholder="특이사항을 입력하세요"
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div className="flex flex-row sm:flex-col">
                                    <button
                                        onClick={handleAddEvent}
                                        className="w-24 sm:w-full bg-primary-500 text-white py-2 rounded-lg"
                                    >
                                        저장
                                    </button>
                                    <button
                                        onClick={() => setModalOpen(false)}
                                        className="w-24 sm:w-full bg-gray-300 text-black py-2 rounded-lg"
                                    >
                                        취소
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstructorMain;
