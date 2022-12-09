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

    const [alert, setAlert] = useState<string>("Cannot be blank");

    const onDateChange = (date : Date) => {
        setStartDate(date);
        validateBirth(startDate);
        props.setState(date, true);
    }

    const validateBirth = (values: Date) => {
        const errors: UserAddInfoErrorMessage = {
          ...userAddInfoErrorMessage
        };
    
        const regexBirth = /^\d{4}\.([1-9][0-9]?)\.([1-9][0-9]?)\.$/i;


        if (!values) {
          errors.birth = "Cannot be blank";
          errors.birthValidation = false;
          setAlert(errors.birth);
        } else if (!regexBirth.test(values.toLocaleDateString().replace(/ /g, ''))) {
          console.log(values.toLocaleDateString().replace(/ /g, ''));
          errors.birth = "Invalid birth format";
          errors.birthValidation = false;
          setAlert(errors.birth);
        } else {
          errors.birth = "";
          errors.birthValidation = true;
          setAlert(errors.birth);
        }
    
        return errors;
      }

    return (
        <div>
            <ReactDatePicker
                selected={startDate}
                onChange={(date: Date) => onDateChange(date)}
                showYearDropdown
                yearDropdownItemNumber={100}
                customInput={<ExampleCustomInput />}
                scrollableYearDropdown
            />
            <h4 style={{ color: 'red' }}>{alert}</h4><hr />
        </div>
    );

}

export default DatePicker;
