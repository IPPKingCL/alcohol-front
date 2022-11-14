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

  const { nickname, job, MaximumPrice, favoriteList } = userAddInfo;

  const onChangeNickname = (e: any) => {
    const { name, value } = e.target;


    const nextNickNameInput: UserAddInfo = {
      ...userAddInfo,
      [name]: value,
    }
    setUserAddInfo(nextNickNameInput);
    console.log(nextNickNameInput);

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
        <input type="submit" value="완료"></input>
      </div>
    </div>
  );
}

export default AddInfo;
