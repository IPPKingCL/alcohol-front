import React, { useEffect } from 'react';
import logo from './logo.svg';
import './css/App.css';
import './css/Login.css';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { useCookies } from 'react-cookie';

function Login() {

    const [cookies, setCookie] = useCookies(['rememberText']);

    setCookie('rememberText', '', {sameSite: 'lax'});
    

    const clientId = "722148392125-6qdo1sho8shp117jpfipd8vggfgb1qo9.apps.googleusercontent.com";
    
    async function onSuccess(res: any) {
        const profile = res.getBasicProfile();
        const userdata = {
            email: profile.getEmail(),
            image: profile.getImageUrl(),
            name: profile.getName(),
        };

        alert("구글 로그인에 성공하였습니다");
        redirectMain();

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
