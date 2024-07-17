import React, { ChangeEvent, useState, useEffect } from "react";
import { CreateEvent } from "../../dto/EventDTO";
import { Member } from "../../dto/TeamDTO";
import { CreateEventService } from "../../api/CreateEventService";

interface EventModalProps {
    teamId?: number;
    teamMembers: Member[];
    weekOffset: number;
    onClose: () => void;
    onEventAdded: () => void;
    initialEvent?: Partial<CreateEvent>;
}

const CreateEventModal: React.FC<EventModalProps> = ({
    teamId,
    teamMembers,
    weekOffset,
    onClose,
    onEventAdded,
    initialEvent,
}) => {
    const [newEvent, setNewEvent] = useState<CreateEvent>({
        teamId: teamId || 0,
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

    useEffect(() => {
        if (initialEvent) {
            setNewEvent((prevEvent) => ({
                ...prevEvent,
                ...initialEvent,
                teamId: teamId || 0,
            }));
        }
    }, [initialEvent, teamId]);

    const handleInputChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleNumberChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: parseInt(value, 10) });
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = e.target.value;
        setNewEvent({ ...newEvent, startTime: time });
    };

    const handleAddEvent = async () => {
        const {
            teamId,
            instructorId,
            lessonType,
            lessonDate,
            startTime,
            duration,
            studentCount,
            userName,
            content,
            level,
        } = newEvent;

        if (!teamId) {
            alert("팀을 선택해주세요.");
            return;
        }
        if (!instructorId) {
            alert("담당 강사를 선택해주세요.");
            return;
        }
        if (!lessonType) {
            alert("종류를 선택해주세요.");
            return;
        }
        if (!lessonDate) {
            alert("일정을 선택해주세요.");
            return;
        }
        if (!startTime) {
            alert("시작 시간을 입력해주세요.");
            return;
        }
        if (!level) {
            alert("레벨을 선택해주세요.");
            return;
        }
        if (!duration) {
            alert("강습 시간을 선택해주세요.");
            return;
        }
        if (!userName) {
            alert("예약자를 입력해주세요.");
            return;
        }
        if (!content) {
            alert("특이사항을 입력해주세요.");
            return;
        }

        // Check if selected date and time is in the past
        const selectedDateTime = new Date(`${lessonDate}T${startTime}`);
        if (selectedDateTime < new Date()) {
            alert("과거의 시간은 선택할 수 없습니다.");
            return;
        }

        const eventToSave = {
            ...newEvent,
            duration: duration || 1,
            studentCount: studentCount || 1,
            startTime: startTime.replace(":", ""),
        };

        const createEventService = new CreateEventService();
        await createEventService.createEvent(eventToSave);

        onEventAdded();
        onClose();
    };

    // Get current date and time for min attribute
    const now = new Date();
    const currentDateString = now.toISOString().split("T")[0];
    const currentTimeString = now.toTimeString().slice(0, 5);

    return (
        <div
            className="fixed top-0 sm:left-0 h-full sm:w-full flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-primary-50 p-6 rounded-lg shadow-md w-4/5 h-4/5 sm:h-full sm:w-1/3 sm:text-base text-sm"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">
                    외부 일정 등록
                </h2>
                <div className="mb-4">
                    <label className="block mb-2">담당 강사</label>
                    <select
                        name="instructorId"
                        value={newEvent.instructorId}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                    >
                        <option value="">강사를 선택하세요</option>
                        {teamMembers.map((teamMember) => (
                            <option
                                key={teamMember.userId}
                                value={teamMember.userId}
                            >
                                {teamMember.userName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">종류</label>
                    <div className="flex space-x-4">
                        <button
                            onClick={() =>
                                setNewEvent({ ...newEvent, lessonType: "SKI" })
                            }
                            className={`w-1/3 h-10 ${
                                newEvent.lessonType === "SKI"
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
                                    lessonType: "BOARD",
                                })
                            }
                            className={`w-1/3 h-10 ${
                                newEvent.lessonType === "BOARD"
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
                                    lessonType: "DAYOFF",
                                })
                            }
                            className={`w-1/3 h-10 ${
                                newEvent.lessonType === "DAYOFF"
                                    ? "bg-primary-600 text-white"
                                    : "bg-primary-100 text-black"
                            } rounded-lg`}
                        >
                            휴무
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">일정 선택</label>
                    <input
                        type="date"
                        name="lessonDate"
                        value={newEvent.lessonDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg mb-2"
                        min={currentDateString} // 현재 날짜 이전은 선택 불가
                    />
                    <input
                        type="time"
                        name="startTime"
                        value={newEvent.startTime}
                        onChange={handleTimeChange}
                        className="w-full p-2 border rounded-lg"
                        min={
                            newEvent.lessonDate === currentDateString
                                ? currentTimeString
                                : undefined
                        } // 현재 시간 이전은 선택 불가
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">레벨</label>
                    <select
                        name="level"
                        value={newEvent.level}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                    >
                        <option value="">레벨을 선택하세요</option>
                        <option value="BEGINNER">초급</option>
                        <option value="INTERMEDIATE">중급</option>
                        <option value="ADVANCED">고급</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">강습 시간</label>
                    <select
                        name="duration"
                        value={newEvent.duration}
                        onChange={handleNumberChange}
                        className="w-full p-2 border rounded-lg"
                    >
                        <option value={1}>1시간</option>
                        <option value={2}>2시간</option>
                        <option value={3}>3시간</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2">강습 인원</label>
                    <select
                        name="studentCount"
                        value={newEvent.studentCount}
                        onChange={handleNumberChange}
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
                    <label className="block mb-2">특이사항</label>
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
                        onClick={onClose}
                        className="w-24 sm:w-full bg-gray-300 text-black py-2 rounded-lg"
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateEventModal;
