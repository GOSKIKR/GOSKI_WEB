import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";

const ReservationBox = () => {
  const [isSkiHovered, setIsSkiHovered] = useState(false);
  const [isBoardHovered, setIsBoardHovered] = useState(false);
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
    if (people > 8) return alert("최대 8명까지 예약 가능합니다.");
    setPeople(people);
  };

  const handleLevel = (level: string) => {
    setLevel(level);
  };

  return (
    <div className="w-full bg-primary-50 rounded-lg shadow-md p-5">
      <div className="flex flex-col w-full xl:flex-row justify-between items-center gap-2">
        <div className=" w-full flex items-center justify-center">
          <div className="flex flex-row w-full h-14 justify-center items-center rounded-lg overflow-hidden shadow-lg">
            <div
              onClick={() => handleSkiOrBoard("ski")}
              onMouseEnter={() => setIsSkiHovered(true)}
              onMouseLeave={() => setIsSkiHovered(false)}
              className={`${
                skiOrBoard === "ski"
                  ? "bg-primary-500 text-white"
                  : "bg-white text-balck"
              }  cursor-pointer w-1/2 h-14 items-center justify-center flex hover:bg-primary-500 hover:text-white`}
            >
              <img
                className="w-10 h-10 mr-2"
                // style={{ filter: "invert(1)" }}
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
              } w-1/2 h-14 cursor-pointer items-center justify-center flex hover:bg-primary-500 hover:text-white`}
            >
              보드
              <img
                className="w-10 h-10 ml-2"
                src="/assets/images/board.svg"
                style={{
                  filter:
                    isBoardHovered || skiOrBoard === "board"
                      ? "invert(1)"
                      : "invert(0)",
                }}
                alt="GOSKI"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center ">
          <div className=" flex flex-col">
            {/* <div className="text-xl flex justify-center">스키장</div> */}
            <div className="flex justify-center">
              <select
                className="sm:w-full w-64 h-14 border border-gray-300 rounded-lg p-2 text-gray-400 cursor-pointer shadow-md"
                defaultValue="select"
                onChange={(e) => {
                  e.target.classList.remove("text-gray-400");
                  handleResort(e.target.value);
                }}
              >
                <option value="select" selected disabled hidden>
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
          <div className=" flex flex-col">
            {/* <div className="text-xl flex justify-center">인원</div> */}
            <div className="relative flex justify-center">
              <input
                type="number"
                min={1}
                max={8}
                placeholder="강습 인원"
                className="md:w-full w-64 h-14 border border-gray-300 rounded-lg pl-2 pr-10 shadow-md"
                onChange={(e) => {
                  const numValue = Number(e.target.value);
                  handlePeople(numValue);
                }}
              />
              <div className="absolute flex items-center justify-center text-gray-600 text-xl p-1 top-2 right-2">
                명
              </div>
            </div>
          </div>
          <div className=" flex flex-col">|</div>
          <div className=" flex flex-col">
            {/* <div className="text-xl flex justify-center">레벨</div> */}
            <div className="flex flex-col md:flex-row justify-center gap-2">
              <div
                onClick={() => handleLevel("lv1")}
                className={`sm:w-32 lg:w-full w-64 h-14 ${
                  level === "lv1"
                    ? "bg-primary-500 text-white"
                    : "bg-white text-black"
                } rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-primary-500 hover:text-white shadow-md`}
              >
                초급
                <p className="text-xs text-gray-400">lv1 이상 강사진</p>
              </div>
              <div
                onClick={() => handleLevel("lv2")}
                className={`sm:w-32 lg:w-full w-64 h-14 ${
                  level === "lv2"
                    ? "bg-primary-500 text-white"
                    : "bg-white text-black"
                } rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-primary-500 hover:text-white shadow-md`}
              >
                중급
                <p className="text-xs text-gray-400">lv2 이상 강사진</p>
              </div>
              <div
                onClick={() => handleLevel("lv3")}
                className={`sm:w-32 lg:w-full h-14 ${
                  level === "lv3"
                    ? "bg-primary-500 text-white"
                    : "bg-white text-black"
                } rounded-lg flex flex-col justify-center items-center cursor-pointer hover:bg-primary-500 hover:text-white shadow-md`}
              >
                고급
                <p className="text-xs text-gray-400">lv3 이상 강사진</p>
              </div>
            </div>
          </div>
        </div>

        <div className="basis-1/12 flex flex-col justify-center items-center">
          <button className="w-20 h-20 bg-primary-100 text-black rounded-full flex justify-center items-center text-3xl">
            <IoMdSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationBox;
