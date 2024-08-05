import React, { useEffect, useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import { useNavigate } from "react-router-dom";
import NavbarInstructor from "../../../components/common/NavbarInstructor";
import { Event, CreateEvent } from "../../../dto/EventDTO";
import { Member, Team } from "../../../dto/TeamDTO";
import { InstructorTeamService } from "../../../api/InstTeamService";
import { InstEventService } from "../../../api/InstEventService";
import { TeamEventService } from "../../../api/TeamEventService";
import { TeamMemberListService } from "../../../api/TeamMemberListService";
import CreateEventModal from "../../../components/instructor/CreateEventModal";
import EventDetailModal from "../../../components/instructor/EventDetailModal";
import "../../../../public/assets/css/fullcalendar.css";
import TeamSelect from "../../../components/instructor/TeamSelect";
import CalendarView from "../../../components/instructor/CalendarView";

const InstructorMain = () => {
    const [view, setView] = useState("weekly");
    const [modalOpen, setModalOpen] = useState(false);
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
    const [myEvents, setMyEvents] = useState<Event[]>([]);
    const [teamEventData, setTeamEventData] = useState<Event[]>([]);
    const [weekOffset, setWeekOffset] = useState<number>(-1);
    const [teamMembers, setTeamMembers] = useState<Member[]>([]);
    const [draggedEvent, setDraggedEvent] = useState<
        Partial<CreateEvent> | undefined
    >(undefined);
    const navigate = useNavigate();
    const calendarRef = useRef<FullCalendar>(null);
    const [userId, setUserId] = useState<number | undefined>(undefined);

    const colors = [
        "#FFB3BA", // light pastel red
        "#FFDFBA", // light pastel orange
        "#FFFFBA", // light pastel yellow
        "#BAFFC9", // light pastel green
        "#BAE1FF", // light pastel blue
        "#D7B3FF", // light pastel purple
        "#FFB3E4", // light pastel pink
        "#FFB3BA", // light pastel red
        "#FFDFBA", // light pastel orange
        "#BAE1FF", // light pastel blue
    ];

    useEffect(() => {
        const fetchTeams = async () => {
            const instTeamService = new InstructorTeamService();
            const teamList = await instTeamService.getTeamList();
            setTeams(teamList);
        };

        const fetchMyEvents = async () => {
            const instEventService = new InstEventService();
            const myEvents = await instEventService.getInstEventService();
            setMyEvents(myEvents);
            if (myEvents.length > 0) {
                setUserId(myEvents[0].instructorId); // 첫 이벤트의 instructorId를 userId로 설정
            }
        };

        fetchTeams();
        fetchMyEvents();
        console.log(events);
    }, []);

    useEffect(() => {
        const fetchTeamData = async () => {
            if (selectedTeam !== null) {
                const teamEventService = new TeamEventService();
                const teamEvents = await teamEventService.getTeamEventService(
                    selectedTeam,
                    weekOffset
                );
                const teamMemberService = new TeamMemberListService();
                const teamMemberList =
                    await teamMemberService.getTeamMemberService(selectedTeam);
                if (teamMemberList) {
                    setTeamEventData(teamEvents);
                    setTeamMembers(teamMemberList.instList);
                }
            }
        };
        fetchTeamData();
    }, [selectedTeam, weekOffset]);

    const getInstructorName = (instructorId: number) => {
        const instructor = teamMembers.find(
            (member) => member.userId === instructorId
        );
        return instructor ? instructor.userName : "Unknown Instructor";
    };

    const getColorForInstructor = (instructorId: number) => {
        const index = teamMembers.findIndex(
            (member) => member.userId === instructorId
        );
        return colors[index % colors.length];
    };

    const parseLessonType = (lessonType: string) => {
        const availability = lessonType.slice(0, 3);
        let type = "휴무";
        if (availability === "101") {
            type = "SKI";
        } else if (availability === "110") {
            type = "BOARD";
        }
        return type;
    };

    const renderEventContent = (eventInfo: any) => {
        const studentCount = eventInfo.event.extendedProps.studentCount;
        const instructorName = getInstructorName(
            eventInfo.event.extendedProps.instructorId
        );
        const lessonType = parseLessonType(
            eventInfo.event.extendedProps.lessonType
        );

        if (selectedTeam) {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center text-black">
                    {lessonType !== "휴무" && (
                        <div className="text-xs text-gray-600">
                            1:{studentCount}
                        </div>
                    )}
                    <div className="text-xs text-gray-500">{lessonType}</div>
                    <div className="py-1 text-sm">{instructorName}</div>
                </div>
            );
        } else {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center text-white">
                    {lessonType !== "휴무" && (
                        <div className="text-xs text-white">
                            1:{studentCount}
                        </div>
                    )}
                    <div>{lessonType}</div>
                    <div className="py-2 flex flex-row space-x-2 items-center">
                        <div>예약자</div>
                        <div className="font-extrabold">
                            {eventInfo.event.extendedProps.reserver}
                        </div>
                    </div>
                </div>
            );
        }
    };

    const events = (selectedTeam ? teamEventData : myEvents).map((event) => {
        const hours = event.startTime.slice(0, 2);
        const minutes = event.startTime.slice(2, 4);
        const startDate = new Date(event.lessonDate);
        startDate.setHours(parseInt(hours), parseInt(minutes));

        const endDate = new Date(startDate);
        endDate.setHours(startDate.getHours() + event.duration);

        const backgroundColor = selectedTeam
            ? getColorForInstructor(event.instructorId)
            : "#343B7B";

        return {
            title: "", // title is now handled by eventContent
            start: startDate,
            end: endDate,
            backgroundColor: backgroundColor,
            extendedProps: {
                instructorId: event.instructorId,
                lessonType: event.lessonType,
                location: event.resortName,
                reserver: event.representativeName,
                studentCount: event.studentCount,
                lessonId: event.lessonId,
            },
            borderColor: backgroundColor,
        };
    });

    const handleEventClick = (clickInfo: any) => {
        const { clientX, clientY } = clickInfo.jsEvent;
        setModalPosition({ x: clientX, y: clientY });
        setSelectedEvent(clickInfo.event);
    };

    const handleDateSelect = (selectInfo: any) => {
        const start = selectInfo.start;
        const end = selectInfo.end;
        const now = new Date();

        if (selectedTeam && start < now) {
            alert("과거의 시간은 선택할 수 없습니다.");
            return; // 과거 시간 선택 시 함수 종료
        }

        if (selectedTeam) {
            const duration = (end - start) / (1000 * 60 * 60);
            const startTime = `${start
                .getHours()
                .toString()
                .padStart(2, "0")}:${start
                .getMinutes()
                .toString()
                .padStart(2, "0")}`;

            setDraggedEvent({
                lessonDate: start.toISOString().split("T")[0],
                startTime,
                duration,
            });

            setModalOpen(true);
        }
    };

    const handlePrevWeek = async () => {
        setWeekOffset((prevOffset) => prevOffset - 1);
        if (selectedTeam) {
            const teamEventService = new TeamEventService();
            const teamEvents = await teamEventService.getTeamEventService(
                selectedTeam,
                weekOffset - 1
            );
            setTeamEventData(teamEvents);
        }
    };

    const handleNextWeek = async () => {
        setWeekOffset((prevOffset) => prevOffset + 1);
        if (selectedTeam) {
            const teamEventService = new TeamEventService();
            const teamEvents = await teamEventService.getTeamEventService(
                selectedTeam,
                weekOffset + 1
            );
            setTeamEventData(teamEvents);
        }
    };

    const goToLessonDetail = (lessonId: number) => {
        navigate(`/instructor/detail/${lessonId}`); // 이벤트 아이디를 URL로 전달
    };

    const handleEventAdded = async () => {
        if (selectedTeam) {
            const teamEventService = new TeamEventService();
            const teamEvents = await teamEventService.getTeamEventService(
                selectedTeam,
                weekOffset
            );
            setTeamEventData(teamEvents);
        } else {
            const instEventService = new InstEventService();
            const myEvents = await instEventService.getInstEventService();
            setMyEvents(myEvents);
        }
    };

    return (
        <div>
            <NavbarInstructor />
            <div className="flex flex-col py-10 space-y-12 sm:space-x-10">
                <div className="bg-primary-50 flex flex-col sm:mx-12 mx-8 rounded-lg py-8 px-4">
                    <div className="flex sm:space-x-4 sm:px-20 mb-4 sm:mb-8">
                        <button
                            onClick={() => setSelectedTeam(null)}
                            className={`sm:w-52 w-16 h-10 ${
                                selectedTeam === null
                                    ? "bg-primary-700 text-white"
                                    : "bg-white text-black"
                            } text-sm sm:text-lg rounded-lg flex items-center justify-center`}
                        >
                            내 스케줄
                        </button>
                        <TeamSelect
                            teams={teams}
                            selectedTeam={selectedTeam}
                            onSelectTeam={setSelectedTeam}
                        />
                    </div>

                    <hr className="border-black sm:mb-8 mb-4 px-50 calendar-container" />

                    <div className="sm:text-base text-[10px]">
                        {view === "weekly" && (
                            <CalendarView
                                calendarRef={calendarRef}
                                events={events}
                                selectedTeam={selectedTeam}
                                handleEventClick={handleEventClick}
                                handleDateSelect={handleDateSelect}
                                handlePrevWeek={handlePrevWeek}
                                handleNextWeek={handleNextWeek}
                                renderEventContent={renderEventContent}
                                setModalOpen={setModalOpen}
                            />
                        )}

                        {view === "daily" && (
                            <CalendarView
                                calendarRef={calendarRef}
                                events={events}
                                selectedTeam={selectedTeam}
                                handleEventClick={handleEventClick}
                                handleDateSelect={handleDateSelect}
                                handlePrevWeek={handlePrevWeek}
                                handleNextWeek={handleNextWeek}
                                renderEventContent={renderEventContent}
                                setModalOpen={setModalOpen}
                            />
                        )}
                    </div>
                </div>

                <div className="flex flex-col sm:w-3/5 sm:h-5/6 px-10 space-y-10">
                    {selectedEvent && (
                        <EventDetailModal
                            event={selectedEvent}
                            onClose={() => setSelectedEvent(null)}
                            goToLessonDetail={() =>
                                goToLessonDetail(
                                    selectedEvent.extendedProps.lessonId
                                )
                            }
                            modalPosition={modalPosition}
                            instructorName={getInstructorName(
                                selectedEvent.extendedProps.instructorId
                            )}
                            userId={userId}
                        />
                    )}
                </div>
            </div>

            {modalOpen && (
                <CreateEventModal
                    teamId={selectedTeam || undefined}
                    teamMembers={teamMembers}
                    weekOffset={weekOffset}
                    onClose={() => setModalOpen(false)}
                    onEventAdded={handleEventAdded}
                    initialEvent={draggedEvent}
                />
            )}
        </div>
    );
};

export default InstructorMain;
