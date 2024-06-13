import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";

const ReservationBox = () => {
  const [skiOrBoard, setSkiOrBoard] = useState("ski");
  const [resort, setResort] = useState("");
  const [people, setPeople] = useState(0);
  const [level, setLevel] = useState("lv1");

  const handleSkiOrBoard = (type: string) => {
    setSkiOrBoard(type);
  };

  const handleResort = (resort: string) => {
    setResort(resort);
  };

  const handlePeople = (people: number) => {
    setPeople(people);
  };

  const handleLevel = (level: string) => {
    setLevel(level);
  };

  return (
    <div className="w-full bg-primary-50 rounded-lg shadow-md p-5">
      <div className="flex flex-row justify-between">
        <div className="basis-1/5 flex items-center justify-center">
          <div className="flex flex-row w-4/5 h-2/3 justify-center items-center rounded-full overflow-hidden">
            <div
              onClick={() => handleSkiOrBoard("ski")}
              className={`${
                skiOrBoard === "ski"
                  ? "bg-primary-500 text-white"
                  : "bg-gray-400 text-balck"
              }  cursor-pointer w-1/2 h-full items-center justify-center flex`}
            >
              스키
            </div>
            <div
              onClick={() => handleSkiOrBoard("board")}
              className={`${
                skiOrBoard === "board"
                  ? "bg-primary-500 text-white"
                  : "bg-gray-400 text-black"
              } w-1/2 h-full cursor-pointer items-center justify-center flex`}
            >
              보드
            </div>
          </div>
        </div>
        <div className="basis-1/5 flex flex-col">
          <div className="text-xl flex justify-center">스키장</div>
          <div className="flex justify-center">
            <select
              className="w-60 h-10 border border-gray-300 rounded-lg p-2 text-gray-400"
              defaultValue="select"
              onChange={(e) => {
                e.target.classList.remove("text-gray-400");
                handleResort(e.target.value);
              }}
            >
              <option value="select" selected disabled hidden>
                선택하세요
              </option>
              <option value="resort1" className="text-black">
                리조트1
              </option>
              <option value="resort2" className="text-black">
                리조트2
              </option>
              <option value="resort3" className="text-black">
                리조트3
              </option>
            </select>
          </div>
        </div>
        <div className="basis-1/5 flex flex-col">
          <div className="text-xl flex justify-center">인원</div>
          <div className="flex justify-center">
            <input
              type="number"
              placeholder="인원 입력(최대 8명)"
              className="w-60 h-10 border border-gray-300 rounded-lg p-2"
              onChange={(e) => {
                const numValue = Number(e.target.value);
                handlePeople(numValue);
              }}
            />
            <p className="flex items-center text-xl p-1">명</p>
          </div>
        </div>
        <div className="basis-1/5 flex flex-col">
          <div className="text-xl flex justify-center">레벨</div>
          <div className="flex flex-row justify-between">
            <div
              onClick={() => handleLevel("lv1")}
              className={`w-1/4 h-10 ${
                level === "lv1"
                  ? "bg-primary-500 text-white"
                  : "bg-white text-black"
              } rounded-lg flex flex-col justify-center items-center cursor-pointer`}
            >
              초급
              <p className="text-xs text-gray-400">lv1 이상 강사진</p>
            </div>
            <div
              onClick={() => handleLevel("lv2")}
              className={`w-1/4 h-10 ${
                level === "lv2"
                  ? "bg-primary-500 text-white"
                  : "bg-white text-black"
              } rounded-lg flex flex-col justify-center items-center cursor-pointer`}
            >
              중급
              <p className="text-xs text-gray-400">lv2 이상 강사진</p>
            </div>
            <div
              onClick={() => handleLevel("lv3")}
              className={`w-1/4 h-10 ${
                level === "lv3"
                  ? "bg-primary-500 text-white"
                  : "bg-white text-black"
              } rounded-lg flex flex-col justify-center items-center cursor-pointer`}
            >
              고급
              <p className="text-xs text-gray-400">lv3 이상 강사진</p>
            </div>
          </div>
        </div>

        <div className="basis-1/5 flex flex-col justify-center items-center">
          <button className="w-20 h-20 bg-primary-100 text-black rounded-full flex justify-center items-center text-3xl">
            <IoMdSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationBox;
