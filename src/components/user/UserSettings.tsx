import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import apiClient from "../../utils/config/axiosConfig";

interface NotificationSetting {
  notificationType: number;
  status: boolean;
}

interface UserSettingsProps {
  setShowNotification: Dispatch<SetStateAction<boolean>>;
  showSettings: boolean;
  setShowSettings: Dispatch<SetStateAction<boolean>>;
}

const UserSettings = ({
  setShowNotification,
  showSettings,
  setShowSettings,
}: UserSettingsProps): JSX.Element => {
  const [settings, setSettings] = useState<NotificationSetting[]>([]);

  // 초기 알림 설정 가져오기
  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const response = await apiClient().get("/notification/setting");
        if (response.status === 200) {
          console.log("알림 설정 가져오기 성공:", response.data);
          setSettings(response.data.data);
        }
      } catch (error) {
        console.error("알림 설정 가져오기 중 오류 발생:", error);
      }
    };
    fetchSetting();
  }, []);

  // 알림 설정 변경
  useEffect(() => {
    if (settings.length > 0) {
      const updateSetting = async () => {
        try {
          const response = await apiClient().patch("/notification/setting", {
            notificationTypes: settings,
          });
          if (response.status === 200) {
            console.log("알림 설정 변경 성공:", response.data);
          }
        } catch (error) {
          console.error("알림 설정 변경 중 오류 발생:", error);
        }
      };
      updateSetting();
    }
  }, [settings]);

  const handleSettingBtn = () => {
    setShowSettings(!showSettings);
    setShowNotification(false);
  };

  const handleToggle = (index: number) => {
    setSettings((prevSettings) =>
      prevSettings.map((setting, i) =>
        i === index ? { ...setting, status: !setting.status } : setting
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
      {showSettings && (
        <div className="absolute top-12 right-0 z-50 w-64 p-2 bg-white rounded-lg shadow-lg">
          <div className="w-full bg-primary-400 text-white text-center py-2 rounded-t-lg">
            알림 설정
          </div>
          <div className="flex flex-col gap-2 p-4">
            {settings.length > 0 && (
              <>
                <div>
                  <label>강습 예약 알림</label>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={settings[0].status}
                    onChange={() => handleToggle(0)}
                  />
                </div>
                <div>
                  <label>피드백 수신 알림</label>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={settings[1].status}
                    onChange={() => handleToggle(1)}
                  />
                </div>
                <div>
                  <label>쪽지 수신 알림</label>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={settings[2].status}
                    onChange={() => handleToggle(2)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettings;
