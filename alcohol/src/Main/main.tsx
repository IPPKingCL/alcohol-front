import { getCookie } from '../Common/Cookies';
import '../css/App.css';
import '../css/Login.css';
import { addr } from '../interface/serverAddr';

function Main() {

    const tok = getCookie('myToken');

    const onClick = () => {
        fetch(addr + '/recommand', {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Content-Type": "application/json",
                "Authorization":`Bearer `+ tok,
            },
        }).then((res) => res.json())
        .then((res) => {
            if(res.success) {
                console.log(res);
                fetch('http://localhost:8080/recommand', {
                    method: "POST",
                    headers: {
                        "Access-Control-Allow-Origin": "http://localhost:3000",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id:res.id,
                    })
                }).then((res) => res.json())
                .then((res) => {
                    console.log(res);
                })
            }else {
                console.log("토큰 에러 로그인페이지로 리다이렉트 해아함");
            }
        })
    }

    return (

       <div>
            <h1>메인 페이지 입니다.</h1>
            <button onClick={onClick}>추천 해줘!!</button>
            
       </div>
    );

}

export default Main;
