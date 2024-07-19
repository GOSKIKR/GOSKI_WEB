import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";

interface CalendarViewProps {
    calendarRef: React.RefObject<FullCalendar>;
    events: EventInput[];
    selectedTeam: number | null;
    handleEventClick: (clickInfo: any) => void;
    handleDateSelect: (selectInfo: any) => void;
    handlePrevWeek: () => void;
    handleNextWeek: () => void;
    renderEventContent: (eventInfo: any) => React.ReactNode;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CalendarView: React.FC<CalendarViewProps> = ({
    calendarRef,
    events,
    selectedTeam,
    handleEventClick,
    handleDateSelect,
    handlePrevWeek,
    handleNextWeek,
    renderEventContent,
    setModalOpen,
}) => {
    return (
        <div className="relative flex flex-col w-full h-auto sm:px-24 calendar-bg">
            <FullCalendar
                ref={calendarRef}
                plugins={[timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: "timeGridWeek,timeGridDay",
                    center: "customPrev title customNext",
                    right: "",
                }}
                initialView="timeGridWeek"
                events={events}
                navLinks={true}
                eventClick={handleEventClick}
                locale="ko"
                editable={true}
                selectable={true}
                select={handleDateSelect}
                eventContent={renderEventContent}
                eventBackgroundColor="#343B7B"
                defaultAllDay={false}
                slotMinTime="08:00"
                slotMaxTime="22:00"
                navLinkHint={"클릭시 해당 날짜로 이동합니다."}
                slotEventOverlap={false}
                customButtons={{
                    customPrev: {
                        text: "<",
                        click: () => {
                            if (calendarRef.current) {
                                const calendarApi =
                                    calendarRef.current.getApi();
                                calendarApi.prev();
                                handlePrevWeek();
                            }
                        },
                    },
                    customNext: {
                        text: ">",
                        click: () => {
                            if (calendarRef.current) {
                                const calendarApi =
                                    calendarRef.current.getApi();
                                calendarApi.next();
                                handleNextWeek();
                            }
                        },
                    },
                }}
            />
            {selectedTeam && (
                <button
                    className="absolute sm:bottom-10 sm:right-16 right-5 bottom-5 bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300 z-50"
                    onClick={() => setModalOpen(true)}
                >
                    팀 일정 등록
                </button>
            )}
        </div>
    );
};

export default CalendarView;
