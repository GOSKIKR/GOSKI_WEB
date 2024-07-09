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

interface StoreState extends ReservationDetails {
  setReservationDetails: (details: ReservationDetails) => void;
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useStore = create<StoreState>((set) => ({
  // 초기 상태
  type: "",
  location: "",
  participants: 0,
  date: "",
  startTime: "",
  duration: "",
  level: 0,

  count: 0,

  // 상태 업데이트 함수
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),

  setReservationDetails: ({
    type,
    location,
    participants,
    date,
    startTime,
    duration,
    level,
  }: ReservationDetails) =>
    set({ type, location, participants, date, startTime, duration, level }),
}));

export default useStore;
