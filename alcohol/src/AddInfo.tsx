import React, { useState } from 'react';
import './css/App.css';
import './css/Login.css';
import './css/AddInfo.css';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { addr } from './interface/serverAddr'

function AddInfo() {

  interface UserAddInfo {
    nickname: string;
    age : string;
    birth : string;
    sex : string;
    job: string;
    MaximumPrice: number;
    favoriteList: Array<string>;
  }

  interface UserAddInfoErrorMessage {
    nickname: string;
    age : string;
    birth : string;
    sex : string;
    job: string;
    MaximumPrice: string;
    favoriteList: string;
  }

  const { state } = useLocation();
  console.log("state" + state.email);

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
  });

    const onChangeNickname = (e: any) => {
    const { name, value } = e.target;


    const nextNickNameInput: UserAddInfo = {
      ...userAddInfo,
      [name]: value,
    }
    setUserAddInfo(nextNickNameInput);
  }

  const onChangeAge = (e: any) => {
    const { name, value } = e.target;


    const nextJobInput: UserAddInfo = {
      ...userAddInfo,
      [name]: value,
    }
    setUserAddInfo(nextJobInput);
    console.log(nextJobInput);

  }

  const onChangeBirth = (e: any) => {
    const { name, value } = e.target;


    const nextJobInput: UserAddInfo = {
      ...userAddInfo,
      [name]: value,
    }
    setUserAddInfo(nextJobInput);
    console.log(nextJobInput);

  }

  const onChangeSex = (e: any) => {
    const { name, value } = e.target;


    const nextJobInput: UserAddInfo = {
      ...userAddInfo,
      [name]: value,
    }
    setUserAddInfo(nextJobInput);
    console.log(nextJobInput);

  }

  const onChangeJob = (e: any) => {
    const { name, value } = e.target;


    const nextJobInput: UserAddInfo = {
      ...userAddInfo,
      [name]: value,
    }
    setUserAddInfo(nextJobInput);
    console.log(nextJobInput);

  }

  const onChangeMaximumPrice = (e: any) => {
    const { name, value } = e.target;


    const nextMaximumPriceInput: UserAddInfo = {
      ...userAddInfo,
      [name]: value,
    }
    setUserAddInfo(nextMaximumPriceInput);
    console.log(nextMaximumPriceInput);

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
    console.log(nextFavoriteListInput);

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
    fetch(addr + '/user/insert', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name : state.name,
        email : state.email,
        age : userAddInfo.age,
        birth : userAddInfo.birth,
        nickname : userAddInfo.nickname,
        sex : userAddInfo.sex,
        job : userAddInfo.job,
        userId : '-',
        password : '-',
      }),
    }).then(res => {
      if (res.ok) {
        alert("응답완료");
      }
    })
  }




  const Form = () => {
    const intialValues = { userAddInfo };
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitForm = () => {
      console.log(formValues);
    };
  
   const handleChange = (e : any) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
  const handleSubmit = (e : any) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      setIsSubmitting(true);
    };
  
  const validate = (values : any) => {
      let errors = userAddInfoErrorMessage;
      
      //정규식 표현
      const regexNickname = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

      const regexAge = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

      const regexBirth = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

      const regexSex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

      const regexJob = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

      const regexMaximumPrice = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

      const regexFavoriteList = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      
      //닉네임 값이 없을시
    if (!values.nickname) {
      errors.nickname = "Cannot be blank";
      //닉네임 정규식 표현이 옳지 않을시
    } else if (!regexNickname.test(values.email)) {
      errors.nickname = "Invalid email format";
    }
    
    //나이 값이 없을시
    if (!values.age) {
      errors.age = "Cannot be blank";
      //나이의 길이(length)가 4글자 이하일 때
    } else if (!regexAge.test(values.email)) {
      errors.age = "Password must be more than 4 characters";
    }


    if (!values.birth) {
      errors.age = "Cannot be blank";
      //비밀번호의 길이(length)가 4글자 이하일 때
    } else if (!regexBirth.test(values.email)) {
      errors.birth = "Password must be more than 4 characters";
    }

    if (!values.sex) {
      errors.age = "Cannot be blank";
      //비밀번호의 길이(length)가 4글자 이하일 때
    } else if (!regexSex.test(values.email)) {
      errors.sex = "Password must be more than 4 characters";
    }

    if (!values.job) {
      errors.age = "Cannot be blank";
      //비밀번호의 길이(length)가 4글자 이하일 때
    } else if (!regexJob.test(values.email)) {
      errors.job = "Password must be more than 4 characters";
    }

    if (!values.MaximumPrice) {
      errors.age = "Cannot be blank";
      //비밀번호의 길이(length)가 4글자 이하일 때
    } else if (!regexMaximumPrice.test(values.email)) {
      errors.MaximumPrice = "Password must be more than 4 characters";
    }

    if (!values.favoriteList) {
      errors.age = "Cannot be blank";
      //비밀번호의 길이(length)가 4글자 이하일 때
    } else if (!regexFavoriteList.test(values.email)) {
      errors.favoriteList = "Password must be more than 4 characters";
    }
      
      //에러를 반환해줘 !
      return errors;
    };

  }

  return (
    <div className='addInfoInputTag'>
      <h1>추가 정보를 입력해 주세요.</h1>
      <div className='formAlign'>
        <h3>닉네임 : <input type="text" placeholder='nickname' name='nickname' onChange={onChangeNickname} pattern="^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$" required></input><button onClick={checkNickname}>중복 확인</button></h3><hr />
        <h3>나이 : <input type="text" placeholder='age' name='age' onChange={onChangeAge} required></input></h3><hr />
        <h3>생일 : <input type="text" placeholder='birth' name='birth' onChange={onChangeBirth} required></input></h3><hr />
        <h3>성별 : <select id="selectSex" name='sex' onChange={onChangeSex}>
          <option value="">디폴트</option>
          <option value="m">M</option>
          <option value="f">F</option>
        </select></h3><hr />
        <h3>직군 : <input type="text" placeholder='job' name='job' onChange={onChangeJob} required></input></h3><hr />
        <h3>허용 최대 가격 : <input type="text" placeholder='Maximum price' name='MaximumPrice' onChange={onChangeMaximumPrice} required></input></h3><hr />
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
          </select></h3><hr />
        <button>완료</button>
      </div>
    </div>
  );
}

export default AddInfo;
