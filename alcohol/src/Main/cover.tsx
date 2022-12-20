import React from 'react';
import '../css/App.css';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

function Cover() {

    const navigate = useNavigate();

    const redirect = () => {
        navigate("/LoginTest");
    }
   

    return (
        <div>
            <h1>Cocktail에 오신걸 환영합니다.</h1>
            <Button onClick={redirect}>로그인</Button>
        </div>
    );

}

export default Cover;
