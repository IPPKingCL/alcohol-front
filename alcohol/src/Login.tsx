import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import './css/Login.css';
import { useNavigate} from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const redirectMain = () => {
        navigate("/main");
    }

  return (
    <div className='LoginComponentBox'>
        <h2 className='LoginText'>Login</h2>
        <img className='LoginImage' src="/resources/btn_google_signin_dark_normal_web.png" onClick={redirectMain}></img>
    </div>
  );
}

export default Login;
