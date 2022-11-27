import React, { useState, forwardRef } from 'react';
import './css/App.css';
import './css/Login.css';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function DatePicker() {
    const [startDate, setStartDate] = useState(new Date());
    const ExampleCustomInput = forwardRef<any>(({ value, onClick }: any, ref) => (
        <button className="example-custom-input" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));
    return (
        <div>
            <ReactDatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                customInput={<ExampleCustomInput />}
            />
        </div>
    );

}

export default DatePicker;
