import React from 'react';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const InstructorMain = () => {
    return (
        <div>
            <Calendar></Calendar>
        </div>
    );
};

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const ReactCalender = () => {
    const [value, onChange] = useState<Value>(new Date());
    return (
        <div>
            <Calendar onChange={onChange} value={value} />
        </div>
    );
};

export default InstructorMain;