import React, { useState, forwardRef } from 'react';
import './css/App.css';
import './css/Login.css';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { UserAddInfoErrorMessage } from './interface/UserAddInfoErrorMessage'
import { UserAddInfo } from './interface/UserAddInfo'

function DatePicker(props : {type : string, setState : any}) {
    const [startDate, setStartDate] = useState(new Date());

    const [userAddInfo, setUserAddInfo] = useState<UserAddInfo>({
        nickname: '',
        age: '',
        birth: '',
        sex: '',
        job: '',
        MaximumPrice: 0,
        favoriteList: new Array,
      });
    
      const [userAddInfoErrorMessage, setUserAddInfoErrorMessage] = useState<UserAddInfoErrorMessage>({
        nickname: '',
        age: '',
        birth: '',
        sex: '',
        job: '',
        MaximumPrice: '',
        favoriteList: '',
        nicknameValidation: false,
        ageValidation: false,
        birthValidation: false,
        sexValidation: false,
        jobValidation: false,
        MaximumPriceValidation: false,
        favoriteListValidation: false
      });

    const ExampleCustomInput = forwardRef<any>(({ value, onClick }: any, ref) => (
        <button className="example-custom-input" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    const onDateChange = (date : Date) => {
        setStartDate(date);
        validateBirth(startDate.toLocaleDateString());
        props.setState(date, true);
    }

    const validateBirth = (values: any) => {
        const errors: UserAddInfoErrorMessage = {
          ...userAddInfoErrorMessage
        };
    
        const regexBirth = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/i;
    
        if (!values) {
          errors.birth = "Cannot be blank";
          errors.birthValidation = false;
        } else if (!regexBirth.test(values.birth)) {
          errors.birth = "Invalid birth format";
          errors.birthValidation = false;
        } else {
          errors.birth = "";
          errors.birthValidation = true;
        }
    
        return errors;
      }

    console.log(startDate.toLocaleDateString());
    return (
        <div>
            <ReactDatePicker
                selected={startDate}
                onChange={(date: Date) => onDateChange(date)}
                customInput={<ExampleCustomInput />}
            />
            <h4 style={{ color: 'red' }}>{userAddInfo.birth}</h4><hr />
        </div>
    );

}

export default DatePicker;
