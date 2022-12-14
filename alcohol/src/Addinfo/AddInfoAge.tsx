import React, { useState, forwardRef } from 'react';
import '../css/App.css';
import '../css/Login.css';
import { UserAddInfoErrorMessage } from '../interface/UserAddInfoErrorMessage'
import { UserAddInfo } from '../interface/UserAddInfo'

function AddInfoText(props: { type: string, setState : any }) {

    const [userAddInfoErrorMessage, setUserAddInfoErrorMessage] = useState<UserAddInfoErrorMessage>({
        nickname: '',
        age: '',
        birth: '',
        sex: '',
        job: '',
        MaximumPrice: '',
        favoriteList: '',
        duplication: '',
        nicknameValidation: false,
        ageValidation: false,
        birthValidation: false,
        sexValidation: false,
        jobValidation: false,
        MaximumPriceValidation: false,
        favoriteListValidation: false,
        duplicationCheck : false
    });

    const [userAddInfo, setUserAddInfo] = useState<UserAddInfo>({
        nickname: '',
        age: '',
        birth: '',
        sex: '',
        job: '',
        MaximumPrice: 0,
        favoriteList: new Array,
    });

    const [alert, setAlert] = useState<string>("Cannot be blank");

    const onChangeAge = (e: any) => {
        const { name, value } = e.target;


        const nextAgeInput: UserAddInfo = {
            ...userAddInfo,
            [name]: value,
        }
        let errorsInput : UserAddInfoErrorMessage;
        errorsInput = validateAge(nextAgeInput);
        props.setState(nextAgeInput, errorsInput.ageValidation);
    }


    const validateAge = (values: any) => {
        const errors: UserAddInfoErrorMessage = {
            ...userAddInfoErrorMessage
        };

        const regexAge = /^[1-9][0-9]?$/i;

        if (values.age === "") {
            errors.age = "Cannot be blank";
            errors.ageValidation = false;
            setAlert(errors.age);
        } else if (!regexAge.test(values.age)) {
            errors.age = "Invalid age format";
            errors.ageValidation = false;
            setAlert(errors.age);
        } else {
            errors.age = "";
            errors.ageValidation = true;
            setAlert(errors.age);
        }
        return errors;

    }


    return (

        <div>
            <h3>{props.type} : <input type="text" placeholder="1~100사이의 숫자를 입력하세요." name='age' onChange={onChangeAge} required></input></h3>
            <h4 style={{ color: 'red' }}>{alert}</h4><hr />
        </div>
    );

}

export default AddInfoText;
