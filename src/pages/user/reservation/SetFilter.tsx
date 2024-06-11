import React, { useState } from 'react';
import NavbarUser from '../../../components/common/NavbarUser';

const SetFilter: React.FC = () => {
    const [location, setLocation] = useState('');
    const [participants, setParticipants] = useState(1);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [level, setLevel] = useState(1);

    return (
        <div>
            <NavbarUser/>
            <div className="p-6 border border-gray-300 rounded-lg w-80">
            <h2 className="text-xl mb-4">스키 강습 설정</h2>
            <div className="mb-4">
                <label className="block text-gray-700">
                    장소:
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    강습 인원:
                    <input
                        type="number"
                        value={participants}
                        onChange={(e) => setParticipants(Number(e.target.value))}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded"
                        min={1}
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    일정 선택:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    강습시간 선택:
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    레벨 선택:
                    <select
                        value={level}
                        onChange={(e) => setLevel(Number(e.target.value))}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded"
                    >
                        <option value={1}>레벨 1</option>
                        <option value={2}>레벨 2</option>
                        <option value={3}>레벨 3</option>
                    </select>
                </label>
            </div>
        </div>
        </div>
    
    );
};

export default SetFilter;
