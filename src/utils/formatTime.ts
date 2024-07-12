export const formatTime = (startTime: number, duration: number) => {
    const startHour = Math.floor(startTime / 100);
    const startMinutes = startTime % 100;

    let endHour = startHour + duration;
    const endMinutes = startMinutes;

    if (endHour >= 24){
        endHour -= 24;
    }

    const format = (hour: number, minutes: number) => {
        return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    return `${format(startHour, startMinutes)} ~ ${format(endHour, endMinutes)}`;
};