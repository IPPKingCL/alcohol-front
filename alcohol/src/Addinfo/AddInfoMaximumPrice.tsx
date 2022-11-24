import React, { useState, forwardRef } from 'react';
import '../css/App.css';
import '../css/Login.css';
import { UserAddInfoErrorMessage } from '../interface/UserAddInfoErrorMessage'
import { UserAddInfo } from '../interface/UserAddInfo'

function AddInfoMaximumPrice(props: { type: string }) {

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

    const onChangeMaximumPrice = (e: any) => {
        const { name, value } = e.target;
    
    
        const nextMaximumPriceInput: UserAddInfo = {
          ...userAddInfo,
          [name]: value,
        }
        setUserAddInfo(nextMaximumPriceInput);
    
      }

    const validateMaximumPrice = (values: any) => {
        const errors : UserAddInfoErrorMessage = {
          ...userAddInfoErrorMessage
        };
    
        const regexMaximumPrice = /^\d{3,7}$/i;
       
        
        if (!values.MaximumPrice) {
          errors.MaximumPrice = "Cannot be blank";
          errors.MaximumPriceValidation = false;
          //비밀번호의 길이(length)가 4글자 이하일 때
        } else if (!regexMaximumPrice.test(values.MaximumPrice)) {
          errors.MaximumPrice = "Invalid Price format";
          errors.MaximumPriceValidation = false;
        } else {
          errors.MaximumPrice = "";
          errors.MaximumPriceValidation = true;
        }
    
        return errors;
    
    }

    return (
        <div>
            <h3>{props.type} : <input type="text" placeholder={props.type} name='MaximumPrice' onChange={onChangeMaximumPrice} required></input></h3>
            <h4 style={{ color: 'red' }}>{validateMaximumPrice(userAddInfo).MaximumPrice}</h4><hr />
        </div>
    );

}

export default AddInfoMaximumPrice;
