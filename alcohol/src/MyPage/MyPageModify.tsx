import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddInfoAge from "../Addinfo/AddInfoAge";
import TransferList from "../Addinfo/AddInfoFavorList";
import AddInfoMaximumPrice from "../Addinfo/AddInfoMaximumPrice";
import AddInfoNickname from "../Addinfo/AddInfoNickname";
import AddInfoSex from "../Addinfo/AddInfoSex";
import { getCookie, setCookie } from "../Common/Cookies";
import { addr } from "../Common/serverAddr";
import DatePicker from "../DatePicker";
import { UserAddInfo } from "../interface/UserAddInfo";
import { UserAddInfoErrorMessage } from "../interface/UserAddInfoErrorMessage";
import { User } from '../interface/user';

function MyPageModify(){
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

  const [userData, setUserData] = useState<User>();

  const list = () => {
    fetch(addr+'/user/selectUser',{
        method:'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${getCookie('myToken')}`,
        },
    }).then((res)=>res.json())
    .then((res) => {

        if(res.success===false){
            alert('회원 조회 중 에러 발생');
            window.history.go(-1);
        }
        if(res.message=='Unauthorized'){
            alert('로그인 후 이용 가능합니다')
            navigate('/login');
        }
        console.log(res);
        setUserData(res);
        
    })
  }

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
    duplicationCheck: false
  });

  const changeStateNickname = (nickstate: UserAddInfo, state: boolean) => {
    const stateChange: UserAddInfoErrorMessage = {
      ...userAddInfoErrorMessage,
      nicknameValidation: state,
      duplicationCheck : false,
      duplication : "중복 여부를 확인해주세요!"
    }
    const userNickChange: UserAddInfo = {
      ...userAddInfo,
      nickname: nickstate.nickname,
    }

    setUserAddInfo(userNickChange);
    setUserAddInfoErrorMessage(stateChange);

  }

  const changeStateSex = (sexstate: UserAddInfo, state: boolean) => {
    const stateChange: UserAddInfoErrorMessage = {
      ...userAddInfoErrorMessage,
      sexValidation: state,
    }

    const userSexChange: UserAddInfo = {
      ...userAddInfo,
      sex: sexstate.sex,
    }
    setUserAddInfo(userSexChange);
    setUserAddInfoErrorMessage(stateChange);
  }

  const changeStateAge = (agestate: UserAddInfo, state: boolean) => {
    const stateChange: UserAddInfoErrorMessage = {
      ...userAddInfoErrorMessage,
      ageValidation: state,
    }

    const userAgeChange: UserAddInfo = {
      ...userAddInfo,
      age: agestate.age,
    }
    setUserAddInfo(userAgeChange);
    setUserAddInfoErrorMessage(stateChange);

  }

  const changeStateMaximumPrice = (priceState: number, state: boolean) => {
    const stateChange: UserAddInfoErrorMessage = {
      ...userAddInfoErrorMessage,
      MaximumPriceValidation: state,
    }
    console.log("pri = " + priceState);
    const userPriceChange: UserAddInfo = {
      ...userAddInfo,
      MaximumPrice: priceState,
    }
    setUserAddInfo(userPriceChange);
    setUserAddInfoErrorMessage(stateChange);
  }

  const onChangeBirth = (birthState: Date, state: boolean) => {

    const stateChange: UserAddInfoErrorMessage = {
      ...userAddInfoErrorMessage,
      birthValidation: state,
    }

    const nextBirthInput: UserAddInfo = {
      ...userAddInfo,
      birth: birthState.toLocaleDateString().substring(0, birthState.toLocaleDateString().length - 1).replace(/ /g, '').replace(/\./g, '-'),
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

  const onChangeFavoriteList = (favoriteListstate: number[], state: boolean) => {

    const nextFavoriteListInput: UserAddInfo = {
      ...userAddInfo,
      favoriteList: favoriteListstate,
    }

    const stateChange: UserAddInfoErrorMessage = {
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
          console.log(userAddInfoErrorMessage.nicknameValidation);
          if (userAddInfoErrorMessage.nicknameValidation) {
            console.log("사용가능한 닉네임 입니다.");
            setUserAddInfoErrorMessage({ ...userAddInfoErrorMessage, duplicationCheck: true, duplication: "중복체크 완료!" });
          }

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
      && validate.sexValidation && validate.favoriteListValidation && validate.birthValidation
      && validate.duplicationCheck) {
      fetch(addr + '/user/insert', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          loginType: state.loginType,
          age: userAddInfo.age,
          birth: userAddInfo.birth,
          nickname: userAddInfo.nickname,
          sex: userAddInfo.sex,
          job: userAddInfo.job,
          userId: state.id,
          price: userAddInfo.MaximumPrice,
          favorite: userAddInfo.favoriteList,
          password: '-',
        }),
      }).then(res => res.json())
        .then((res) => {
          console.log(res.success);
          if (res.success) {
            alert("응답완료");
            setCookie('myToken', res.token, {
              path: "/",
              secure: true,
              sameSite: "none"
            })

            navigate("/Main");
          } else {
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

    return(
        <div className='addInfoInputTag' id='wrapper'>
            <h1>정보를 수정해주세요.</h1>
            <hr></hr>
            <AddInfoNickname type="닉네임" setState={changeStateNickname} checkNick={checkNickname} />
            <h4 style={{ color: 'red' }}>{userAddInfoErrorMessage.duplication}</h4><hr />
            <AddInfoAge type="나이" setState={changeStateAge} />
            <h3 style={{ display: 'inline-block' }}>생일 : {userAddInfo.birth}<DatePicker type="생일" setState={onChangeBirth} /></h3>
            <AddInfoSex type="성별" setState={changeStateSex} />
            <h3>직군 : <input type="text" placeholder='job' name='job' onChange={onChangeJob} required></input></h3>
            <h4 style={{ color: 'red' }}>{validateJob(userAddInfo).job}</h4><hr />
            <AddInfoMaximumPrice type="허용 최대 가격" setState={changeStateMaximumPrice} />
            <h3>좋아하는 목록 :</h3>
            <TransferList type="리스트" setState={onChangeFavoriteList} />
            <h4 style={{ color: 'red' }}>{userAddInfo.favoriteList ? null : validateFavoriteList(userAddInfo).favoriteList}</h4><hr />
            <button onClick={sendAddInfo}>완료</button>
        </div>
    )
}

export default MyPageModify;