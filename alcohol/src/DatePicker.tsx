import React, { useState, forwardRef } from 'react';
import logo from './logo.svg';
import './css/App.css';
import './css/Login.css';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { addr } from './interface/serverAddr';
import ReactDatePicker from 'react-datepicker';

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
