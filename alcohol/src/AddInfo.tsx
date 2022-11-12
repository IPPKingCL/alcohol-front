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
      <form className='formAlign' method='post' action='/main'>
        <input type="text" placeholder='nickname'></input><hr/>
        <input type="text" placeholder='job'></input><hr/>
        <input type="text" placeholder='Maximum price'></input><hr/>
        <input type="text" placeholder='favorite List'></input><hr/>
        <input type="submit" value="완료"></input>
      </form>
    </div>
  );
}

export default AddInfo;
