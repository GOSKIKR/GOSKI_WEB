import React, { useState } from "react";

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
  <div className="flex flex-row items-center justify-between pb-10">
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

const MobileSettingModal = ({
  showSettingModal,
}: {
  showSettingModal: () => void;
}) => {
  const [settings, setSettings] = useState(notificationSettings);
  const [showSetting, setShowSetting] = useState(false);

  // 설정 항목 토글 핸들러
  const toggleSetting = (index: number) => {
    const newSettings = settings.map((setting, i) => {
      if (i === index) {
        return { ...setting, checked: !setting.checked };
      }
      return setting;
    });
    setSettings(newSettings);
  };

  // 모달 닫기 핸들러
  const handleClose = () => {
    showSettingModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="w-9/12 h-2/5 bg-white rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">설정</div>
          <button onClick={handleClose}>닫기</button>
        </div>
        <div className="mt-4">
          {settings.map((setting, index) => (
            <NotificationSettingItem
              key={index}
              title={setting.title}
              checked={setting.checked}
              onToggle={() => toggleSetting(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileSettingModal;
