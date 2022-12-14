import React, { useState, forwardRef, useEffect } from 'react';
import '../css/App.css';
import '../css/Login.css';
import { UserAddInfoErrorMessage } from '../interface/UserAddInfoErrorMessage'
import { UserAddInfo } from '../interface/UserAddInfo'

function AddInfoNickName(props: { type: string , setState : any, checkNick : any}) {

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

    const onChangeNickname = (e: any) => {
        const { name, value } = e.target;


        const nextNickNameInput: UserAddInfo = {
            ...userAddInfo,
            [name]: value,
        }

        let errorsInput : UserAddInfoErrorMessage;
        errorsInput = validateNickname(nextNickNameInput);
        props.setState(nextNickNameInput, errorsInput.nicknameValidation);
    }


    const validateNickname = (values: any) => {
        const errors: UserAddInfoErrorMessage = {
            ...userAddInfoErrorMessage
        };

        const regexNickname = /^[가-힣a-zA-z0-9]{2,8}$/i;

        if (values.nickname === "") {
            errors.nickname = "Cannot be blank";
            setAlert("Cannot be blank");
            errors.nicknameValidation = false;
            // props.setState(userAddInfo.nickname, errors.nicknameValidation);
        } else if (!regexNickname.test(values.nickname)) {
            errors.nickname = "Invalid nickname format";
            errors.nicknameValidation = false;
            setAlert("Invalid nickname format");
            // props.setState(userAddInfo.nickname, errors.nicknameValidation);
        } else {
            errors.nickname = "";
            errors.nicknameValidation = true;
            setAlert("");
            // props.setState(userAddInfo.nickname, errors.nicknameValidation);
        }

        return errors;

    }


    return (

        <div>
            <h3>{props.type} : <input type="text" placeholder="2~8글자 사이로 입력하세요." name='nickname' onChange={onChangeNickname} required></input></h3>
            <button onClick={props.checkNick}>닉네임 중복 확인</button>
            <h4 style={{ color: 'red' }}>{alert}</h4>
            <h4 style={{ color: 'red' }}>{userAddInfo.nickname}</h4><hr/>
        </div>
    );

}

export default AddInfoNickName;
