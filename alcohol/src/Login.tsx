import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './css/App.css';
import './css/Login.css';
import './css/footer.css';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { addr } from './Common/serverAddr';
import { setCookie } from './Common/Cookies';
import EmailLogin from './Login/EmailLogin';

function Login() {

    const clientId =
        "722148392125-6qdo1sho8shp117jpfipd8vggfgb1qo9.apps.googleusercontent.com";


    const [type, setType] = useState<string>("g");

    const check = () => {
        const filter = "win16|win32|win64|mac|macintel";

        let device = "";

        if (navigator.platform) {
            if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
                device = "mobile";
            } else {
                device = "pc";
            }

        }

        setCookie('device', device, {
            path: "/",
            sameSite: "Lax"
        });
    }


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

        check();

        const profile = res.getBasicProfile();

        const userdata = {
            id: profile.getId(),
            email: profile.getEmail(),
            image: profile.getImageUrl(),
            name: profile.getName(),
            loginType: type,
        };
        // 로그인 성공 후 실행하기 원하는 코드 작성.
        alert("구글 로그인에 성공하였습니다.");


        fetch(addr + '/user/checkEmail', {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": addr,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: userdata.email
            }),
        }).then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    redirectAddInfo(userdata);
                } else {
                    console.log(res.token)
                    setCookie('myToken', res.token, {
                        path: "/",
                        secure: true,
                        sameSite: "none"
                    })
                    redirectMain(userdata);
                }
            })

    }

    /*인증할 때 보내는 헤더 예시 참조*/
    /*headers:{
        "Content-Type":"application/json"
        Authorization:"Bearer ${getCookie('myToken')}",
    }
    */

    const onFailure = (res: any) => {
        alert("구글 로그인에 실패하였습니다");
        console.log("err", res);
    };

    const navigate = useNavigate();

    const redirectAddInfo = (data: any) => {
        navigate("/AddInfo", { state: data });
    }


    const redirectMain = (data: any) => {
        navigate("/Main", { state: data });
    }


    return (
        <div id='wrapper'>
            <div className='LoginComponentBox'>
                <h2 className='LoginText'>Login</h2>
                <EmailLogin />
                <button>Login</button>
                <hr/>
                <h2 style={{textAlign:"center"}}>소셜ID로 로그인하기</h2>
                <div style={{textAlign:"center"}}>
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Login with Google" // 버튼에 뜨는 텍스트
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
