import React, { useState } from 'react';
import './css/App.css';
import './css/Login.css';
import './css/AddInfo.css';
import { useNavigate } from 'react-router-dom';
import { deflateSync } from 'zlib';
import internal from 'stream';

function AddInfo() {

  interface UserAddInfo {
    nickname : string;
    job : string;
    MaximumPrice : number;
    favoriteList : Array<string>;
  }

  const navigate = useNavigate();

  const redirectMain = () => {
    navigate("/main");
  }

  const [userAddInfo, setUserAddInfo] = useState<UserAddInfo>();

  function sendAddInfo() {
    fetch('http://localhost:5000/UserAddInfo' , {
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
      }),
    }).then(res => {
      if(res.ok) {
        alert("응답완료");
      }
    })
  }


  return (
    <div className='addInfoInputTag'>
      <h1>추가 정보를 입력해 주세요.</h1> 
      <div className='formAlign'>
        <h3>닉네임 : <input type="text" placeholder='nickname' name='nickname'required></input><button>중복 확인</button></h3><hr/>
        <h3>직업 : <input type="text" placeholder='job' name='job' required></input></h3><hr/>
        <h3>허용 최대 가격 : <input type="text" placeholder='Maximum price' name='MaximumPrice' required></input></h3><hr/>
        <h3>좋아하는 목록 : <select name='list1'></select><select name='list2'></select><select name='list3'></select></h3><hr/>
        <input type="submit" value="완료"></input>
      </div>
    </div>
  );
}

export default AddInfo;
