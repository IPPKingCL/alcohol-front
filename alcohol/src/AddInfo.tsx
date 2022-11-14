import React, { useState } from 'react';
import './css/App.css';
import './css/Login.css';
import './css/AddInfo.css';
import { useNavigate } from 'react-router-dom';
import { deflateSync } from 'zlib';
import internal from 'stream';

function AddInfo() {

  interface UserAddInfo {
    nickname: string;
    job: string;
    MaximumPrice: number;
    favoriteList: Array<string>;
  }

  const navigate = useNavigate();

  const redirectMain = () => {
    navigate("/main");
  }

  const [userAddInfo, setUserAddInfo] = useState<UserAddInfo>({
    nickname: '',
    job: '',
    MaximumPrice: 0,
    favoriteList: new Array,
  });

  const {nickname, job, MaximumPrice, favoriteList} = userAddInfo;

  const onChangeNickname = (e : any) => {
    const { name, value } = e.target;
 

    const nextNickNameInput : UserAddInfo = {
      ...userAddInfo,
      [name] : value,
    }
    setUserAddInfo(nextNickNameInput);
    console.log(nextNickNameInput);
    
  }

  const onChangeJob = (e : any) => {
    const { name, value } = e.target;


    const nextNickNameInput : UserAddInfo = {
      ...userAddInfo,
      [name] : value,
    }
    setUserAddInfo(nextNickNameInput);
    console.log(nextNickNameInput);
    
  }

  const onChangeMaximumPrice = (e : any) => {
    const { name, value } = e.target;


    const nextNickNameInput : UserAddInfo = {
      ...userAddInfo,
      [name] : value,
    }
    setUserAddInfo(nextNickNameInput);
    console.log(nextNickNameInput);
    
  }

  const onChangeFavoriteList = (e : any) => {
    const { name, value } = e.target;

    
    console.log("value" + value);

    const nextNickNameInput : UserAddInfo = {
      ...userAddInfo,
      [name] : value,
    }
    setUserAddInfo(nextNickNameInput);
    console.log(nextNickNameInput);
    
  }


  function sendAddInfo() {
    fetch('http://localhost:5000/UserAddInfo', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      }),
    }).then(res => {
      if (res.ok) {
        alert("응답완료");
      }
    })
  }


  return (
    <div className='addInfoInputTag'>
      <h1>추가 정보를 입력해 주세요.</h1>
      <div className='formAlign'>
        <h3>닉네임 : <input type="text" placeholder='nickname' name='nickname' onChange={onChangeNickname} required></input><button>중복 확인</button></h3><hr />
        <h3>직업 : <input type="text" placeholder='job' name='job' onChange={onChangeJob} required></input></h3><hr />
        <h3>허용 최대 가격 : <input type="text" placeholder='Maximum price' name='MaximumPrice' onChange={onChangeMaximumPrice} required></input></h3><hr />
        <h3>좋아하는 목록 : <select name='favoriteList'></select><select name='favoriteList'></select><select name='favoriteList'></select></h3><hr />
        <input type="submit" value="완료"></input>
      </div>
    </div>
  );
}

export default AddInfo;
