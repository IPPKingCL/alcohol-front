import React, { useState, forwardRef } from 'react';
import './css/App.css';
import './css/Login.css';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function DatePicker(props : {type : string, setState : any}) {
    const [startDate, setStartDate] = useState(new Date());
    const ExampleCustomInput = forwardRef<any>(({ value, onClick }: any, ref) => (
        <button className="example-custom-input" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    const onDateChange = (date : Date) => {
        setStartDate(date);
        props.setState(date, true);
    }

    console.log(startDate);
    return (
        <div>
            <ReactDatePicker
                selected={startDate}
                onChange={(date: Date) => onDateChange(date)}
                customInput={<ExampleCustomInput />}
            />
        </div>
    );

}

export default DatePicker;
