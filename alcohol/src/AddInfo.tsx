import React from 'react';
import './css/App.css';
import './css/Login.css';
import './css/AddInfo.css';
import { useNavigate } from 'react-router-dom';

function AddInfo() {

  const navigate = useNavigate();

  const redirectMain = () => {
    navigate("/main");
  }

  return (
    <div className='addInfoInputTag'>
      <h1>추가 정보를 입력해 주세요.</h1> 
      <form className='formAlign' method='post' action='/main'>
        <h3>닉네임 : <input type="text" placeholder='nickname' required></input> </h3><hr/>
        <h3>직업 : <input type="text" placeholder='job' required></input></h3><hr/>
        <h3>허용 최대 가격 : <input type="text" placeholder='Maximum price' required></input></h3><hr/>
        <h3>좋아하는 목록 : <input type="select" placeholder='favorite List' required></input></h3><hr/>
        <input type="submit" value="완료"></input>
      </form>
    </div>
  );
}

export default AddInfo;
