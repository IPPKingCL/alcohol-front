import React, { useState, forwardRef } from 'react';
import '../css/App.css';
import '../css/Login.css';
import { UserAddInfoErrorMessage } from '../interface/UserAddInfoErrorMessage'
import { UserAddInfo } from '../interface/UserAddInfo'

function AddInfoSex(props: { type: string, setState : any}) {

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

    const onChangeSex = (e: any) => {
        const { name, value } = e.target;
    
    
        const nextSexInput: UserAddInfo = {
          ...userAddInfo,
          [name]: value,
        }
        setUserAddInfo(nextSexInput);

        validateSex(nextSexInput);
      }

    const validateSex = (values: any) => {
        const errors : UserAddInfoErrorMessage = {
          ...userAddInfoErrorMessage
        };
    
        const regexSex = /^[MF]$/i;

        console.log(values.sex);
    
        if (values.sex === "") {
          errors.sex = "Cannot be blank";
          errors.sexValidation = false;
          setAlert(errors.sex);
          props.setState(errors.sexValidation);
        } else if (!regexSex.test(values.sex)) {
          errors.sex = "Invalid sex format";
          errors.sexValidation = false;
          setAlert(errors.sex);
          props.setState(errors.sexValidation);
        } else {
          errors.sex = "";
          errors.sexValidation = true;
          setAlert(errors.sex);
          props.setState(errors.sexValidation);
        }
    
        return errors;
      }

    return (

        <div>
            <h3>성별 : <select id="selectSex" name='sex' onChange={onChangeSex}>
                <option value="">성별을 선택하세요.</option>
                <option value="m">M</option>
                <option value="f">F</option>
            </select></h3>
            <h4 style={{ color: 'red' }}>{alert}</h4><hr />
        </div>
    );

}

export default AddInfoSex;
