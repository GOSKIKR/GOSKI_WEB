import React from "react";
import Counter from "./components/Counter";
import UserMain from "./pages/user/main/UserMain";
import { Link, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-white text-2xl font-bold">
            <Link to="/" className="text-white">
              GOSKI
            </Link>
          </h1>
          <h1 className="text-white text-xl font-bold">
            <Link to="/user/main" className="text-white">
              User Main
            </Link>
          </h1>
        </div>
      </nav>
      <div className="p-4">
        <Counter />
      </div>
      <Routes>
        <Route path="/user/main" element={<UserMain />} />
      </Routes>
    </div>
  );
};

export default App;
