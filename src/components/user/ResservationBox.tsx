import React, { useState } from "react";

const ReservationBox = () => {
  return (
    <div className=" bg-primary-50 rounded-lg shadow-md p-5">
      <div className="flex flex-row justify-between">
        <div className="basis-1/5 flex flex-row justify-center items-center">
          <div className="bg-primary-500 w-1/2 h-2/3 ">스키</div>
          <div className="bg-primary-200 w-1/2 h-2/3">보드</div>
        </div>
        <div className="basis-1/5 flex flex-col">
          <div className="text-xl">날짜</div>
          <input
            type="date"
            className="w-60 h-10 border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="basis-1/5 flex flex-col">
          <div className="text-xl">시간</div>
          <input
            type="time"
            className="w-60 h-10 border border-gray-300 rounded-lg p-2"
          />
        </div>
        <div className="basis-1/5 flex flex-col">
          <div className="text-xl">인원</div>
          <input
            type="number"
            className="w-60 h-10 border border-gray-300 rounded-lg p-2"
          />
        </div>
        <button className="basis-1/5 bg-primary-600 text-white p-2 rounded-lg">
          예약
        </button>
      </div>
    </div>
  );
};

export default ReservationBox;
