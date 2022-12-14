import React, { useEffect, useState } from 'react';
import '../css/App.css';
import '../css/Login.css';
import '../css/AddInfo.css';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { addr } from '../Common/serverAddr'
import DatePicker from '../DatePicker';
import AddInfoTextNickname from './AddInfoNickname';
import AddInfoTextAge from './AddInfoAge';
import AddInfoSex from './AddInfoSex';
import AddInfoMaximumPrice from './AddInfoMaximumPrice';
import { UserAddInfo } from '../interface/UserAddInfo'
import { UserAddInfoErrorMessage } from '../interface/UserAddInfoErrorMessage'
import { setCookie } from '../Common/Cookies';
import TransferList from './AddInfoFavorList';

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
    favoriteList: [],
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
    favoriteListValidation: false,
    duplicationCheck : false
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

    setUserAddInfoErrorMessage({...userAddInfoErrorMessage, duplicationCheck : false});

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
  }

  const onChangeBirth = (birthState : Date, state: boolean) => {

    const stateChange: UserAddInfoErrorMessage = {
      ...userAddInfoErrorMessage,
      birthValidation : state,
    }

    const nextBirthInput: UserAddInfo = {
      ...userAddInfo,
      birth : birthState.toLocaleDateString().substring(0,birthState.toLocaleDateString().length-1).replace(/ /g, '').replace(/\./g,'-'),
    }
    setUserAddInfo(nextBirthInput);
    setUserAddInfoErrorMessage(stateChange);

  }



  const onChangeJob = (e: any) => {
    const { name, value } = e.target;


    const nextJobInput: UserAddInfo = {
      ...userAddInfo,
      [name]: value,
    }
    setUserAddInfo(nextJobInput);

  }

  const onChangeFavoriteList = (favoriteListstate : number[], state : boolean) => {

    const nextFavoriteListInput: UserAddInfo = {
      ...userAddInfo,
      favoriteList: favoriteListstate,
    }

    const stateChange : UserAddInfoErrorMessage = {
      ...userAddInfoErrorMessage,
      favoriteListValidation: state,
    }

    setUserAddInfo(nextFavoriteListInput);
    setUserAddInfoErrorMessage(stateChange);

  }

  function checkNickname() {
    fetch(addr + '/user/checkNickName', {
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
          setUserAddInfoErrorMessage({...userAddInfoErrorMessage, duplicationCheck : true});
        } else {
          console.log("사용 불가능한 닉네임 입니다.");
        }
      })
  }




  function sendAddInfo() {

    const validate: UserAddInfoErrorMessage = {
      ...userAddInfoErrorMessage,
    }

    console.log(userAddInfo);
    console.log(userAddInfoErrorMessage);

    if (validate.MaximumPriceValidation && validate.ageValidation && validate.nicknameValidation
      && validate.sexValidation && validate.favoriteListValidation && validate.birthValidation) {
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
          price : userAddInfo.MaximumPrice,
          favorite : userAddInfo.favoriteList,
          password: '-',
        }),
      }).then(res => res.json())
      .then((res) => {
        console.log(res.success);
        if (res.success) {
          alert("응답완료");
          setCookie('myToken',res.token,{
            path:"/",
            secure:true,
            sameSite:"none"
          })
        
          navigate("/Main");
        }else{
          alert("회원가입 중 에러 발생");
          return;
        }
      })
    }

  }

  

  const validateJob = (values: any) => {
    const errors: UserAddInfoErrorMessage = {
      ...userAddInfoErrorMessage
    };

    const regexJob = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.job) {
      errors.job = "Cannot be blank";
      errors.jobValidation = false;
    } else if (!regexJob.test(values.job)) {
      errors.job = "Invalid Job Format";
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
    <div className='addInfoInputTag' id='wrapper'>
      <h1>추가 정보를 입력해 주세요.</h1>
      <div className='formAlign'>
        <AddInfoTextNickname type="닉네임" setState={changeStateNickname} checkNick={checkNickname}/>
        <AddInfoTextAge type="나이" setState={changeStateAge} />
        <h3 style={{display : 'inline-block'}}>생일 : {userAddInfo.birth}<DatePicker type="생일" setState={onChangeBirth}/></h3>
        <AddInfoSex type="성별" setState={changeStateSex} />
        <h3>직군 : <input type="text" placeholder='job' name='job' onChange={onChangeJob} required></input></h3>
        <h4 style={{ color: 'red' }}>{validateJob(userAddInfo).job}</h4><hr />
        <AddInfoMaximumPrice type="허용 최대 가격" setState={changeStateMaximumPrice} />
        <h3>좋아하는 목록 :</h3>
        <TransferList type="리스트" setState={onChangeFavoriteList}/>
        <h4 style={{ color: 'red' }}>{userAddInfo.favoriteList ? null : validateFavoriteList(userAddInfo).favoriteList}</h4><hr />
        <button onClick={sendAddInfo}>완료</button>
      </div>
    </div>
  );
}

export default AddInfo;
