import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";

const notificationSettings = [
  {
    title: "강습 예약 알림",
    description: "강습 예약 알림을 설정합니다.",
    checked: true,
  },
  {
    title: "피드백 수신 알림",
    description: "피드백 수신 알림을 설정합니다.",
    checked: true,
  },
  {
    title: "쪽지 수신 알림",
    description: "쪽지 수신 알림을 설정합니다.",
    checked: false,
  },
];

type NotificationSettingItemProps = {
  title: string;
  checked: boolean;
  onToggle: () => void;
};

const NotificationSettingItem = ({
  title,
  checked,
  onToggle,
}: NotificationSettingItemProps) => (
  <div className="flex flex-row items-center justify-between mb-2">
    <div className="text-sm">{title}</div>
    <input
      type="checkbox"
      checked={checked}
      onChange={onToggle}
      className="form-checkbox h-5 w-5 text-primary-600 transition duration-150 ease-in-out"
      aria-label={title}
    />
  </div>
);

const UserSettings = () => {
  const [settings, setSettings] = useState(notificationSettings);
  const [showSetting, setShowSetting] = useState(false);

  const handleSettingBtn = () => {
    setShowSetting(!showSetting);
  };

  const handleToggle = (index: number) => {
    setSettings((prevSettings) =>
      prevSettings.map((setting, i) =>
        i === index ? { ...setting, checked: !setting.checked } : setting
      )
    );
  };

  return (
    <div className="relative flex items-center justify-center w-10 h-10">
      <button
        onClick={handleSettingBtn}
        className="text-2xl p-2 rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label="Settings"
      >
        <IoSettingsOutline />
      </button>
      {showSetting && (
        <div className="absolute top-12 right-0 z-50 w-64 p-2 bg-white rounded-lg shadow-lg">
          <div className="w-full bg-primary-400 text-white text-center py-2 rounded-t-lg">
            알림 설정
          </div>
          <div className="flex flex-col gap-2 p-4">
            {settings.map((setting, index) => (
              <NotificationSettingItem
                key={index}
                title={setting.title}
                checked={setting.checked}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettings;
