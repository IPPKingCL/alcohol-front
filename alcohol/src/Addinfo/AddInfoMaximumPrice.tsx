import React, { useState, forwardRef } from 'react';
import '../css/App.css';
import '../css/Login.css';
import { UserAddInfoErrorMessage } from '../interface/UserAddInfoErrorMessage'
import { UserAddInfo } from '../interface/UserAddInfo'

function AddInfoMaximumPrice(props: { type: string, setState : any }) {

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

    const [alert, setAlert] = useState<string>("Cannot be blank");

    const onChangeMaximumPrice = (e: any) => {
        const { name, value } = e.target;
    
    
        const nextMaximumPriceInput: UserAddInfo = {
          ...userAddInfo,
          [name]: value,
        }
        setUserAddInfo(nextMaximumPriceInput);

        validateMaximumPrice(nextMaximumPriceInput);
        
      }

    const validateMaximumPrice = (values: any) => {
        const errors : UserAddInfoErrorMessage = {
          ...userAddInfoErrorMessage
        };
    
        const regexMaximumPrice = /^\d{3,7}$/i;
       
        
        if (!values.MaximumPrice) {
          errors.MaximumPrice = "Cannot be blank";
          errors.MaximumPriceValidation = false;
          setAlert(errors.MaximumPrice);
          props.setState(userAddInfo.MaximumPrice, errors.MaximumPriceValidation);
        } else if (!regexMaximumPrice.test(values.MaximumPrice)) {
          errors.MaximumPrice = "Invalid Price format";
          errors.MaximumPriceValidation = false;
          setAlert(errors.MaximumPrice);
          props.setState(userAddInfo.MaximumPrice, errors.MaximumPriceValidation);
        } else {
          errors.MaximumPrice = "";
          errors.MaximumPriceValidation = true;
          setAlert(errors.MaximumPrice);
          props.setState(userAddInfo.MaximumPrice, errors.MaximumPriceValidation);
        }
    
        return errors;
    
    }

    return (
        <div>
            <h3>{props.type} : <input type="text" placeholder="100~10,000,000 사이로 입력" name='MaximumPrice' onChange={onChangeMaximumPrice} required></input></h3>
            <h4 style={{ color: 'red' }}>{alert}</h4>
        </div>
    );

}

export default AddInfoMaximumPrice;
