import React from "react";

interface TimePickerProps {
    startTime: string;
    setStartTime: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ startTime, setStartTime }) => {
    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const timeString = `${hour.toString().padStart(2, "0")}:${minute
                    .toString()
                    .padStart(2, "0")}`;
                options.push(timeString);
            }
        }
        return options;
    };

    const timeOptions = generateTimeOptions();

    //시간 저장 핸들러
    const handleSaveTime = (time: string) => {
        // 시간 형식 변환
        // "HH:MM" to "HHMM"
        const convertTime = (time: string) => {
            const [hour, minute] = time.split(":"); // 콜론을 기준으로 시간과 분을 나눔
            return `${hour}${minute}`; // 시간과 분을 합쳐서 반환
        };

        // 시작 시간 저장
        setStartTime(convertTime(time));
    };

    // "HHMM" to "HH:MM" 변환 함수
    const formatTime = (time: string): string => {
        if (time.length === 4) {
            return `${time.slice(0, 2)}:${time.slice(2)}`;
        }
        return time;
    };

    return (
        <div className="flex flex-col items-center w-full sm:w-1/6">
            <label className="mb-1 text-sm">강습 시작 시간</label>
            <select
                value={formatTime(startTime)}
                onChange={(e) => handleSaveTime(e.target.value)}
                className="px-6 bg-white shadow-md rounded-lg flex-1 h-9"
            >
                {timeOptions.map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TimePicker;
