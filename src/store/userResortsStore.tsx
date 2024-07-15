import { create } from "zustand";

type userResorts = {
  resortId: number;
  resortName: string;
  resortLocation: string;
  longitude: number;
  latitude: number;
  lessonTime: number[];
};

interface userResortsStoreState extends userResorts {
  setResortInfo: (resorts: userResorts) => void;
}

const userResortsStore = create<userResortsStoreState>((set) => ({
  // 초기 상태
  resortId: 0,
  resortName: "",
  resortLocation: "",
  longitude: 0,
  latitude: 0,
  lessonTime: [],

  // 상태 업데이트 함수
  setResortInfo: ({
    resortId,
    resortName,
    resortLocation,
    longitude,
    latitude,
    lessonTime,
  }: userResorts) =>
    set({
      resortId,
      resortName,
      resortLocation,
      longitude,
      latitude,
      lessonTime,
    }),
}));

export default userResortsStore;
