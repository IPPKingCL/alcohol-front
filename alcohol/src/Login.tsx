import React from 'react';
import logo from './logo.svg';
import './App.css';
import './Login.css';

function Login() {
  return (
    <div className='LoginComponentBox'>
        <h2 className='LoginText'>Login</h2>
        <img className='LoginImage' src="/resources/btn_google_signin_dark_normal_web.png"></img>
    </div>
  );
}

export default Login;
