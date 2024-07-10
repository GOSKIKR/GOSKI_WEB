import create from "zustand";

interface ReservationDetails {
  type: string;
  location: string;
  participants: number;
  date: string;
  startTime: string;
  duration: string;
  level: number;
}

type userReserve = {
  resortId: number;
  resortName: string;
  lessonType: string; //'SKI' | 'BOARD';
  studentCount: number;
  lessonDate: string; // 'YYYY-MM-DD';
  startTime: string; // 'hhmm';
  duration: number;
  level: string; //'beginner' | 'intermediate' | 'advanced'
};

interface userReserveStoreState extends userReserve {
  setReservationInfo: (details: userReserve) => void;
}

const userReserveStore = create<userReserveStoreState>((set) => ({
  // 초기 상태
  resortId: 0,
  resortName: "",
  lessonType: "",
  studentCount: 0,
  lessonDate: "",
  startTime: "",
  duration: 0,
  level: "",

  // 상태 업데이트 함수

  //예약 정보 저장 함수
  setReservationInfo: ({
    resortId,
    resortName,
    lessonType,
    studentCount,
    lessonDate,
    startTime,
    duration,
    level,
  }: userReserve) =>
    set({
      resortId,
      resortName,
      lessonType,
      studentCount,
      lessonDate,
      startTime,
      duration,
      level,
    }),
}));

export default userReserveStore;
