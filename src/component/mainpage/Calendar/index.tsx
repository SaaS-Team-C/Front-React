import React, { useState } from 'react';
import Calendar from 'react-calendar';


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarEnd: React.FC = () => {
    const [value, setValue] = useState<Value>(new Date());

    const handleChange = (newValue: Value) => {
        setValue(newValue);

        // 선택된 날짜를 추출
        if (Array.isArray(newValue)) {
            const [startDate, endDate] = newValue;
            console.log('시작 날짜:', startDate);
            console.log('종료 날짜:', endDate);
        } else {
            console.log('선택된 날짜:', newValue);
        }
    };

    return (
        <div>
            <Calendar onChange={handleChange} value={value} />
        </div>
    );
};

export default CalendarEnd;
