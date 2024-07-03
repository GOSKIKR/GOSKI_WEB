import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";

type skiOrBoardType = "ski" | "board";
type levelType = "lv1" | "lv2" | "lv3";
type resortType = "resort1" | "resort2" | "resort3";
type peopleType = number;

const ReservationBox = () => {
  const [isSkiHovered, setIsSkiHovered] = useState(false);
  const [isBoardHovered, setIsBoardHovered] = useState(false);
  const [skiOrBoard, setSkiOrBoard] = useState("ski");
  const [resort, setResort] = useState("");
  const [people, setPeople] = useState(0);
  const [level, setLevel] = useState("lv1");

  const handleSkiOrBoard = (type: skiOrBoardType) => {
    setSkiOrBoard(type);
  };

  const handleResort = (resort: any) => {
    setResort(resort);
  };

  const handlePeople = (people: peopleType) => {
    if (people > 8) return alert("최대 8명까지 예약 가능합니다.");
    setPeople(people);
  };

  const handleLevel = (level: levelType) => {
    setLevel(level);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-8">
      <div className="flex flex-col xl:flex-row justify-between items-center gap-4">
        <div className="w-full flex items-center justify-center">
          <div className="flex w-full h-14 justify-center items-center rounded-lg overflow-hidden shadow-md">
            <div
              onClick={() => handleSkiOrBoard("ski")}
              onMouseEnter={() => setIsSkiHovered(true)}
              onMouseLeave={() => setIsSkiHovered(false)}
              className={`${
                skiOrBoard === "ski"
                  ? "bg-primary-500 text-white"
                  : "bg-white text-black"
              } cursor-pointer w-1/2 h-14 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors duration-300`}
            >
              <img
                className="w-8 h-8 mr-2"
                style={{
                  filter:
                    isSkiHovered || skiOrBoard === "ski"
                      ? "invert(0)"
                      : "invert(1)",
                }}
                src="/assets/images/ski.svg"
                alt="GOSKI"
              />
              스키
            </div>
            <div
              onClick={() => handleSkiOrBoard("board")}
              onMouseEnter={() => setIsBoardHovered(true)}
              onMouseLeave={() => setIsBoardHovered(false)}
              className={`${
                skiOrBoard === "board"
                  ? "bg-primary-500 text-white"
                  : "bg-white text-black"
              } cursor-pointer w-1/2 h-14 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors duration-300`}
            >
              보드
              <img
                className="w-8 h-8 ml-2"
                style={{
                  filter:
                    isBoardHovered || skiOrBoard === "board"
                      ? "invert(1)"
                      : "invert(0)",
                }}
                src="/assets/images/board.svg"
                alt="GOSKI"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          <div className="flex flex-col w-full">
            <div className="flex justify-center">
              <select
                className="w-full h-14 border border-gray-300 rounded-lg p-4 text-gray-500 cursor-pointer shadow-md"
                defaultValue="select"
                onChange={(e) => {
                  e.target.classList.remove("text-gray-500");
                  handleResort(e.target.value);
                }}
              >
                <option value="select" disabled hidden>
                  스키장 선택
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
          <div className="flex flex-col w-full">
            <div className="relative flex justify-center">
              <input
                type="number"
                min={1}
                max={8}
                placeholder="강습 인원"
                className="w-full h-14 border border-gray-300 rounded-lg pl-4 pr-12 shadow-md"
                onChange={(e) => {
                  const numValue = Number(e.target.value);
                  handlePeople(numValue);
                }}
              />
              <div className="absolute flex items-center justify-center text-gray-600 text-lg top-0 right-4 h-full">
                명
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col md:flex-row justify-center gap-2">
              <div
                onClick={() => handleLevel("lv1")}
                className={`w-full h-14 ${
                  level === "lv1"
                    ? "bg-primary-500 text-white"
                    : "bg-white text-black"
                } rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-primary-500 hover:text-white transition-colors duration-300 shadow-md`}
              >
                초급
                <p className="text-xs text-gray-400">lv1 이상 강사진</p>
              </div>
              <div
                onClick={() => handleLevel("lv2")}
                className={`w-full h-14 ${
                  level === "lv2"
                    ? "bg-primary-500 text-white"
                    : "bg-white text-black"
                } rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-primary-500 hover:text-white transition-colors duration-300 shadow-md`}
              >
                중급
                <p className="text-xs text-gray-400">lv2 이상 강사진</p>
              </div>
              <div
                onClick={() => handleLevel("lv3")}
                className={`w-full h-14 ${
                  level === "lv3"
                    ? "bg-primary-500 text-white"
                    : "bg-white text-black"
                } rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-primary-500 hover:text-white transition-colors duration-300 shadow-md`}
              >
                고급
                <p className="text-xs text-gray-400">lv3 이상 강사진</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full xl:w-auto mt-4 xl:mt-0">
          <button className="w-16 h-16 bg-primary-500 text-white rounded-full flex justify-center items-center text-3xl shadow-md hover:bg-primary-600 transition-colors duration-300">
            <IoMdSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationBox;
