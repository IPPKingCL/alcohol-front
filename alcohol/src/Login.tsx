import React, { useEffect } from 'react';
import logo from './logo.svg';
import './css/App.css';
import './css/Login.css';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

function Login() {

    const clientId =
        "722148392125-6qdo1sho8shp117jpfipd8vggfgb1qo9.apps.googleusercontent.com";



    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId,
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);

    async function onSuccess(res: any) {
        const profile = res.getBasicProfile();
        console.log(profile);
        console.log(profile.ma);
        console.log(profile.sU);
        console.log(profile.nU);
        const userdata = {
            id: profile.getId(),
            email: profile.getEmail(),
            image: profile.getImageUrl(),
            name: profile.getName(),
        };
        // 로그인 성공 후 실행하기 원하는 코드 작성.
        alert("구글 로그인에 성공하였습니다.");


        fetch('http://192.168.0.29:5000/user/checkEmail', {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin" : "http://192.168.0.29:5000" ,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: userdata.email
            }),
        }).then((res) => res.json())
        .then((res) => {
            if(res.success) {
                redirectMain(userdata);
            }else {
                console.log("이미 존재하는 사람임.");
            }
        })

    }

    const onFailure = (res: any) => {
        alert("구글 로그인에 실패하였습니다");
        console.log("err", res);
    };

    const navigate = useNavigate();

    const redirectMain = (data: any) => {
        navigate("/AddInfo", { state: data });
    }

    return (
        <div className='LoginComponentBox'>
            <h2 className='LoginText'>Login</h2>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login with Google" // 버튼에 뜨는 텍스트
                onSuccess={onSuccess}
                onFailure={onFailure}
            />
        </div>
    );
}

export default Login;
