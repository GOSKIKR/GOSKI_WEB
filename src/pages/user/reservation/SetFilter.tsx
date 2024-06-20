import React, { useState } from 'react';
import NavbarUser from '../../../components/common/NavbarUser';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoTimeOutline } from 'react-icons/io5';

const SetFilter: React.FC = () => {
    const navigate = useNavigate();
    const [location, setLocation] = useState('');
    const locations = ['a스키장', 'b스키장', 'c스키장'];
    const [participant, setParticipant] = useState(0);
    const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
    const [startTime, setStartTime] = useState('');
    const [entireTime, setEntireTime] = useState(0);
    const [level, setLevel] = useState(1);
    const [calendarOpen, setCalendarOpen] = useState(false);

    const goToResult = () => {
        navigate(`/reserve/result`);
    }

    const handleParticipantIncrement = () => {
        if (participant < 10) {
            setParticipant(prev => prev + 1);
        }
    }

    const handleParticipantDecrement = () => {
        if (participant > 0) {
            setParticipant(prev => prev - 1);
        }
    }

    const handleTimeIncrement = () => {
        if (entireTime < 10) {
            setEntireTime(prev => prev + 1);
        }
    }

    const handleTimeDecrement = () => {
        if (entireTime > 0) {
            setEntireTime(prev => prev - 1);
        }
    }

    const toggleCalendar = () => {
        setCalendarOpen(!calendarOpen);
    }

    const generateTimeSlots = () => {
        const slots = [];
        for (let i = 0; i < 24; i++) {
            slots.push(`${i.toString().padStart(2, '0')}:00`);
            slots.push(`${i.toString().padStart(2, '0')}:30`);
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    const today = new Date();

    return (
        <div>
            <NavbarUser />
            <div className='flex flex-col w-screen h-screen justify-center items-center'>
                <div className='text-xl font-extrabold pt-16 pb-8'>
                    스키 강습 설정
                </div>
                <div className='flex flex-row space-x-10 w-full h-full justify-center items-center'>
                    {/* 필터 설정 박스 */}
                    <div className="p-6 bg-primary-50 border border-gray-300 rounded-lg shadow-sm w-1/2 h-4/5">
                        {/* 종류 */}
                        <div className='flex flex-row mb-4 justify-center items-center'>
                            <div className='w-32'>종류 *</div>
                            <div className='w-72 h-10'>
                                <button className='w-1/2 h-full bg-gray-100 rounded-l-lg border-x-2 border-y-2 border-gray-400'>스키</button>
                                <button className='w-1/2 h-full bg-primary-600 rounded-r-lg border-r-2 border-y-2 border-gray-400'>보드</button>
                            </div>
                        </div>
                        {/* 장소 */}
                        <div className='flex flex-row mb-4 justify-center items-center'>
                            <div className='w-32'>장소 *</div>
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className='mt-1 p-2 block w-72 border border-gray-300 rounded'
                            >
                                {locations.map((loc, index) => (
                                    <option key={index} value={loc}>{loc}</option>
                                ))}
                            </select>
                        </div>
                        {/* 강습 인원 */}
                        <div className='flex flex-row mb-4 justify-center items-center'>
                            <div className='w-32'>강습인원 *</div>
                            <div className='flex flex-row items-center w-72 h-10'>
                                <button
                                    onClick={handleParticipantDecrement}
                                    className={`w-1/3 h-full text-2xl font-extrabold ${participant === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={participant === 0}
                                >
                                    -
                                </button>
                                <div className='w-1/3 h-full flex justify-center items-center'>
                                    {participant === 10 ? '10+' : participant}
                                </div>
                                <button
                                    onClick={handleParticipantIncrement}
                                    className={`w-1/3 h-full text-2xl font-extrabold ${participant === 10 ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={participant === 10}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        {/* 일정 선택 */}
                        <div className='flex flex-row mb-4 justify-center items-center'>
                            <div className='w-32'>일정 선택 *</div>
                            <div className='flex items-center w-72'>
                                <button onClick={toggleCalendar} className='p-2 border border-gray-300 rounded'>
                                    <FaCalendarAlt />
                                </button>
                                {dateRange && (
                                    <div className='ml-2'>
                                        {dateRange[0].toLocaleDateString()} - {dateRange[1].toLocaleDateString()}
                                    </div>
                                )}
                            </div>
                            {calendarOpen && (
                                <div className='absolute mt-2'>
                                    <Calendar
                                        selectRange
                                        onChange={(range: [Date, Date]) => {
                                            setDateRange(range);
                                            setCalendarOpen(false);
                                        }}
                                        className='border border-gray-300 rounded shadow-lg'
                                        minDate={today}
                                    />
                                </div>
                            )}
                        </div>
                        {/* 강습시간 선택 */}
                        <div className='flex flex-row mb-4 justify-center items-center'>
                            <div className='w-32'>시작 시간</div>
                            <input
                                type="time"
                                value={entireTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="mt-1 p-2 block w-72 border border-gray-300 rounded"
                                step="1800" // 30 minutes
                            />
                        </div>
                        <div className='flex flex-row mb-4 justify-center items-center'>
                            <div className='w-32'>강습 시간</div>
                            <div className='flex flex-row items-center w-72 h-10'>
                                <button
                                    onClick={handleTimeDecrement}
                                    className={`w-1/3 h-full text-2xl font-extrabold ${entireTime === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={entireTime === 0}
                                >
                                    -
                                </button>
                                <div className='w-1/3 h-full flex justify-center items-center'>
                                    {entireTime === 10 ? '10+' : entireTime}
                                </div>
                                <button
                                    onClick={handleTimeIncrement}
                                    className={`w-1/3 h-full text-2xl font-extrabold ${entireTime === 10 ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={entireTime === 10}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        {/* 레벨 선택 */}
                       {/* 레벨 선택 */}
                        <div className='flex flex-row mb-4 justify-center items-center'>
                            <div className='w-32'>레벨 선택 *</div>
                            <div className='w-72 h-10'>
                                <button
                                    className={`w-1/3 h-full ${level === 1 ? 'bg-primary-600 text-white' : 'bg-gray-100'} rounded-l-lg border-x-2 border-y-2 border-gray-400`}
                                    onClick={() => setLevel(1)}
                                >
                                    레벨 1
                                </button>
                                <button
                                    className={`w-1/3 h-full ${level === 2 ? 'bg-primary-600 text-white' : 'bg-gray-100'} border-x-2 border-y-2 border-gray-400`}
                                    onClick={() => setLevel(2)}
                                >
                                    레벨 2
                                </button>
                                <button
                                    className={`w-1/3 h-full ${level === 3 ? 'bg-primary-600 text-white' : 'bg-gray-100'} rounded-r-lg border-x-2 border-y-2 border-gray-400`}
                                    onClick={() => setLevel(3)}
                                >
                                    레벨 3
                                </button>
                            </div>
                            
                        </div>
                        
                        <div onClick={goToResult} className='w-20 h-12 bg-primary-500 text-white flex justify-center items-center cursor-pointer'>
                            강습 조회
                            {/* 클릭하면 api 요청하고 페이지 넘겨주기 */}
                            {/* 선택한 레벨에 따라 다른 api 요청 */}
                        </div>
                    </div>

                    {/* 설명 */}
                    <div className='w-2/6 h-4/5 bg-primary-50 rounded-lg shadow-md flex justify-center items-center'>
                        hi
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SetFilter;
