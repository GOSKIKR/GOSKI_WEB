import React from "react";
import NavbarUser from "../../../components/common/NavbarUser";

const DM: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <NavbarUser />
      <div className="flex w-full h-full flex-row">
        <div className="w-1/3 border-r border-gray-300 p-4 overflow-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Direct Messages
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div className="font-medium text-gray-900">User 1</div>
            </div>
            {/* Repeat for each user */}
          </div>
        </div>
        <div className="w-2/3 p-4">
          <div className="border-b border-gray-300 mb-4 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="font-medium text-gray-900">User 1</div>
          </div>
          <div className="space-y-4">
            <div className="flex items-end space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div className="bg-gray-200 rounded-lg p-2">
                <p className="text-sm text-gray-900">Hello!</p>
              </div>
            </div>
            {/* Repeat for each message */}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              className="w-full rounded-lg border-gray-300 p-2 mr-2"
              placeholder="Type a message..."
            />
            <button className="py-2 px-4 bg-blue-500 text-white rounded-lg">
              보내기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DM;
