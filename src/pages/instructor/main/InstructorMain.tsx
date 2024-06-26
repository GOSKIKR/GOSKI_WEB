import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

const InstructorMain = () => {
    const [view, setView] = useState('monthly');

    const events = [
        { title: 'Meeting1', start: new Date('2024-6-10'),  }, 
        { title: 'Meeting2', start: new Date('2024-6-11') },
        { title: 'Afternoon Meeting', start: '2024-06-17T15:00:00', end: '2024-06-17T17:00:00' }
    ];

    return (
        <div className='flex flex-col h-5/6 px-10 py-10 space-y-10'>
            <div className='flex space-x-4'>
                <button
                    onClick={() => setView('monthly')}
                    className={`w-32 h-10 ${view === 'monthly' ? 'bg-primary-600' : 'bg-primary-500'} text-white text-lg rounded-lg flex items-center justify-center`}
                >
                    월간
                </button>
                <button
                    onClick={() => setView('weekly')}
                    className={`w-32 h-10 ${view === 'weekly' ? 'bg-primary-600' : 'bg-primary-500'} text-white text-lg rounded-lg flex items-center justify-center`}
                >
                    주간
                </button>
                <button
                    onClick={() => setView('daily')}
                    className={`w-32 h-10 ${view === 'daily' ? 'bg-primary-600' : 'bg-primary-500'} text-white text-lg rounded-lg flex items-center justify-center`}
                >
                    일간
                </button>
            </div>
            
            {view === 'monthly' && (
                <div className='flex flex-col w-3/5 h-auto'>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView='dayGridMonth'
                        events={events}
                        navLinks={true}
                    />
                </div>
            )}
            
            {view === 'weekly' && (
                <div className='flex flex-col w-3/5 h-auto'>
                    <FullCalendar
                        plugins={[timeGridPlugin]}
                        initialView='timeGridWeek'
                        events={events}
                        navLinks={true}
                    />
                </div>
            )}

            {view === 'daily' && (
                <div className='flex flex-col w-3/5 h-auto'>
                    <FullCalendar
                        plugins={[timeGridPlugin]}
                        initialView='timeGridDay'
                        events={events}
                        navLinks={true}
                    />
                </div>
            )}
        </div>
    );
};

export default InstructorMain;
