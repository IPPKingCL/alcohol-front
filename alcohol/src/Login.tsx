import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import './css/Login.css';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

function Login() {


    const clientId =
        "722148392125-6qdo1sho8shp117jpfipd8vggfgb1qo9.apps.googleusercontent.com";

    async function onSuccess(res: any) {
        const profile = res.getBasicProfile();
        const userdata = {
            email: profile.getEmail(),
            image: profile.getImageUrl(),
            name: profile.getName(),
        };
        // 로그인 성공 후 실행하기 원하는 코드 작성.

    }

    const onFailure = (res: any) => {
        alert("구글 로그인에 실패하였습니다");
        console.log("err", res);
    };

    const navigate = useNavigate();

    const redirectMain = () => {
        navigate("/AddInfo");
    }

    return (
        <div className='LoginComponentBox'>
            <h2 className='LoginText'>Login</h2>
            <GoogleLogin
                className="google-button"
                clientId={clientId}
                buttonText="Login with Google" // 버튼에 뜨는 텍스트
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
            />
        </div>
    );
}

export default Login;
