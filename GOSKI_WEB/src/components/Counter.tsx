import React from "react";
import { useStore } from "../store/useStore";

const Counter: React.FC = () => {
  const { count, increment, decrement } = useStore();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl">Count: {count}</h1>
      <div className="mt-4">
        <button className="btn btn-primary mr-2" onClick={increment}>
          Increment
        </button>
        <button className="btn btn-secondary" onClick={decrement}>
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;
