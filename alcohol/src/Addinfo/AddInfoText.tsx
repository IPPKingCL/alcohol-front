import React, { useState, forwardRef } from 'react';
import '../css/App.css';
import '../css/Login.css';
import { UserAddInfoErrorMessage } from '../interface/UserAddInfoErrorMessage'
import { UserAddInfo } from '../interface/UserAddInfo'

function AddInfoText(props : {type : string}) {

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

    const [userAddInfo, setUserAddInfo] = useState<UserAddInfo>({
        nickname: '',
        age: '',
        birth: '',
        sex: '',
        job: '',
        MaximumPrice: 0,
        favoriteList: new Array,
      });

    const onChangeNickname = (e: any) => {
        const { name, value } = e.target;


        const nextNickNameInput: UserAddInfo = {
            ...userAddInfo,
            [name]: value,
        }
        setUserAddInfo(nextNickNameInput);
    }

   

    const validateNickname = (values: any) => {
        const errors: UserAddInfoErrorMessage = {
            ...userAddInfoErrorMessage
        };

        const regexNickname = /^[가-힣a-zA-z0-9]{2,8}$/i;

        //닉네임 값이 없을시
        if (values === "") {
            errors.nickname = "Cannot be blank";
            errors.nicknameValidation = false;
            //닉네임 정규식 표현이 옳지 않을시
        } else if (!regexNickname.test(values.nickname)) {
            errors.nickname = "Invalid nickname format";
            errors.nicknameValidation = false;
        } else {
            errors.nickname = "";
            errors.nicknameValidation = true;
        }

        console.log("설마 이렇게 해도 다 뜨니?" + props.type);
        return errors;

    }
    

    return (

        <div>
            <h3>{props.type} : <input type="text" placeholder={props.type} name='nickname' onChange={onChangeNickname} required></input></h3>
            <h4 style={{ color: 'red' }}>{validateNickname(userAddInfo.nickname).nickname}</h4><hr />
        </div>
    );

}

export default AddInfoText;
