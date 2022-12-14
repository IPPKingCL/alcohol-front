import React, { useState, forwardRef } from 'react';
import '../css/App.css';
import '../css/Login.css';
import { UserAddInfoErrorMessage } from '../interface/UserAddInfoErrorMessage'
import { UserAddInfo } from '../interface/UserAddInfo'

function AddInfoJob(props: { type: string }) {

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

    const onChangeSex = (e: any) => {
        const { name, value } = e.target;
    
    
        const nextJobInput: UserAddInfo = {
          ...userAddInfo,
          [name]: value,
        }
        setUserAddInfo(nextJobInput);
      }

    const validateSex = (values: any) => {
        const errors : UserAddInfoErrorMessage = {
          ...userAddInfoErrorMessage
        };
    
        const regexSex = /^[MF]$/i;
    
        if (!values.sex) {
          errors.sex = "Cannot be blank";
          errors.sexValidation = false;
    
        } else if (!regexSex.test(values.sex)) {
          errors.sex = "Password must be more than 4 characters";
          errors.sexValidation = false;
        } else {
          errors.sex = "";
          errors.sexValidation = true;
        }
    
        return errors;
      }

    return (

        <div>
            <h3>성별 : <select id="selectSex" name='sex' onChange={onChangeSex}>
                <option value="">선택</option>
                <option value="m">M</option>
                <option value="f">F</option>
            </select></h3>
            <h4 style={{ color: 'red' }}>{validateSex(userAddInfo).sex}</h4><hr />

        </div>
    );

}

export default AddInfoJob;
