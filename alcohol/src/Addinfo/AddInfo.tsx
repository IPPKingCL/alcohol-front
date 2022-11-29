import React, { useEffect, useState } from 'react';
import '../css/App.css';
import '../css/Login.css';
import '../css/AddInfo.css';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { addr } from '../interface/serverAddr'
import DatePicker from '../DatePicker';
import AddInfoTextNickname from './AddInfoNickname';
import AddInfoTextAge from './AddInfoAge';
import AddInfoSex from './AddInfoSex';
import AddInfoMaximumPrice from './AddInfoMaximumPrice';
import { UserAddInfo } from '../interface/UserAddInfo'
import { UserAddInfoErrorMessage } from '../interface/UserAddInfoErrorMessage'

function AddInfo() {

  const { state } = useLocation();
  const navigate = useNavigate();

  const redirectMain = () => {
    navigate("/main");
  }

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

  const changeStateNickname = (nickstate : UserAddInfo, state: boolean) => {
    const stateChange: UserAddInfoErrorMessage = {
      ...userAddInfoErrorMessage,
      nicknameValidation: state,
    }
    const userNickChange: UserAddInfo = {
      ...userAddInfo,
      nickname : nickstate.nickname,
    }

    setUserAddInfo(userNickChange);
    setUserAddInfoErrorMessage(stateChange);

  }

  const changeStateSex = (sexstate : UserAddInfo, state: boolean) => {
    const stateChange: UserAddInfoErrorMessage = {
      ...userAddInfoErrorMessage,
      sexValidation: state,
    }

    const userSexChange : UserAddInfo = {
      ...userAddInfo,
      sex : sexstate.sex,
    }
    setUserAddInfo(userSexChange);
    setUserAddInfoErrorMessage(stateChange);
  }

  const changeStateAge = (agestate : UserAddInfo, state: boolean) => {
    const stateChange: UserAddInfoErrorMessage = {
      ...userAddInfoErrorMessage,
      ageValidation: state,
    }
    
    const userAgeChange: UserAddInfo = {
      ...userAddInfo,
      age : agestate.age,
    }
    setUserAddInfo(userAgeChange);
    setUserAddInfoErrorMessage(stateChange);

  }

  const changeStateMaximumPrice = (priceState : string, state: boolean) => {
    const stateChange: UserAddInfoErrorMessage = {
      ...userAddInfoErrorMessage,
      MaximumPriceValidation: state,
    }

    const userPriceChange : UserAddInfo = {
      ...userAddInfo,
      MaximumPrice : parseInt(priceState),
    }
    setUserAddInfo(userPriceChange);
    setUserAddInfoErrorMessage(stateChange);

    console.log(userPriceChange.MaximumPrice);
  }

  const onChangeBirth = (e: any) => {
    const { name, value } = e.target;


    const nextJobInput: UserAddInfo = {
      ...userAddInfo,
      [name]: value,
    }
    setUserAddInfo(nextJobInput);

  }



  const onChangeJob = (e: any) => {
    const { name, value } = e.target;


    const nextJobInput: UserAddInfo = {
      ...userAddInfo,
      [name]: value,
    }
    setUserAddInfo(nextJobInput);

  }

  const onChangeFavoriteList = (e: any) => {
    console.log(e.target);
    const { id, name, value } = e.target;

    const nextFavoriteListInput: UserAddInfo = {
      ...userAddInfo
    }
    if (id == "select1") {
      nextFavoriteListInput.favoriteList[0] = value;
    }
    else if (id == "select2") {
      nextFavoriteListInput.favoriteList[1] = value;
    }
    else if (id == "select3") {
      nextFavoriteListInput.favoriteList[2] = value;
    }

    setUserAddInfo(nextFavoriteListInput);

  }

  function checkNickname() {
    fetch(addr + '/user/checkUser', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: userAddInfo.nickname,
      }),
    }).then((res) => res.json())
      .then((res) => {
        if (res.success) {
          console.log("사용가능한 닉네임 입니다.");
        } else {
          console.log("사용 불가능한 닉네임 입니다.");
        }
      })
  }




  function sendAddInfo() {

    const validate: UserAddInfoErrorMessage = {
      ...userAddInfoErrorMessage,
    }
    console.log(validate);
    console.log(userAddInfo);
    console.log(state);

    if (validate.MaximumPriceValidation && validate.ageValidation && validate.nicknameValidation
      && validate.sexValidation) {
      fetch(addr + '/user/insert', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          loginType : state.loginType,
          age: userAddInfo.age,
          birth: userAddInfo.birth,
          nickname: userAddInfo.nickname,
          sex: userAddInfo.sex,
          job: userAddInfo.job,
          userId: state.id,
          password: '-',
        }),
      }).then(res => {
        if (res.ok) {
          alert("응답완료");
        }
      })
    }

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

  const validateJob = (values: any) => {
    const errors: UserAddInfoErrorMessage = {
      ...userAddInfoErrorMessage
    };

    const regexJob = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.job) {
      errors.job = "Cannot be blank";
      errors.jobValidation = false;
      //비밀번호의 길이(length)가 4글자 이하일 때
    } else if (!regexJob.test(values.job)) {
      errors.job = "Password must be more than 4 characters";
      errors.jobValidation = false;
    } else {
      errors.job = "";
      errors.jobValidation = true;
    }

    return errors;
  }


  const validateFavoriteList = (values: any) => {
    const errors: UserAddInfoErrorMessage = {
      ...userAddInfoErrorMessage
    };

    const regexFavoriteList = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.favoriteList) {
      errors.favoriteList = "Cannot be blank";
      errors.favoriteListValidation = false;
    } else if (!regexFavoriteList.test(values.favoriteList)) {
      errors.favoriteList = "List must be choosed";
      errors.favoriteListValidation = false;
    } else {
      errors.favoriteList = "";
      errors.favoriteListValidation = true;
    }

    return errors;
  };

  return (
    <div className='addInfoInputTag'>
      <h1>추가 정보를 입력해 주세요.</h1>
      <div className='formAlign'>
        <AddInfoTextNickname type="닉네임" setState={changeStateNickname} />
        <AddInfoTextAge type="나이" setState={changeStateAge} />
        <h3>생일 : <input type="text" placeholder='birth' name='birth' onChange={onChangeBirth} required></input></h3>
        <DatePicker />
        <h4 style={{ color: 'red' }}>{validateBirth(userAddInfo.birth).birth}</h4><hr />
        <AddInfoSex type="성별" setState={changeStateSex} />
        <h3>직군 : <input type="text" placeholder='job' name='job' onChange={onChangeJob} required></input></h3>
        <h4 style={{ color: 'red' }}>{validateJob(userAddInfo).job}</h4><hr />
        <AddInfoMaximumPrice type="허용 최대 가격" setState={changeStateMaximumPrice} />
        <h3>좋아하는 목록 :
          <select id="select1" name='favoriteList' onChange={onChangeFavoriteList}>
            <option value="">디폴트</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
          <select id="select2" name='favoriteList' onChange={onChangeFavoriteList}>
            <option value="">디폴트</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
          <select id="select3" name='favoriteList' onChange={onChangeFavoriteList}>
            <option value="">디폴트</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select></h3>
        <h4 style={{ color: 'red' }}>{userAddInfo.favoriteList ? null : validateFavoriteList(userAddInfo).favoriteList}</h4><hr />
        <button onClick={sendAddInfo}>완료</button>
      </div>
    </div>
  );
}

export default AddInfo;
