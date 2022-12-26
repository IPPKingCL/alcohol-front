import { useState } from 'react';
import { setCookie, getCookie } from '../Common/Cookies';
import '../css/App.css';
import '../css/Login.css';
import { recommand } from '../interface/recommand';
import { addr } from '../Common/serverAddr';

function Main() {

    const [recommandList, setRecommandList] = useState<recommand[]>([]);

    const [whereConnect, setWhereConnect] = useState<string>();

    const tok = getCookie('myToken');


    const check = () => {
        const filter = "win16|win32|win64|mac|macintel";

        let device = "";

        if(navigator.platform) {
            if(filter.indexOf(navigator.platform.toLowerCase()) < 0) {
                device = "mobile";
            }else {
                device = "pc";
            }
            
        }

        setCookie('device', device,{
            path:"/",
            sameSite:"Lax"
        });

        alert(getCookie('device') + "  " + device);
    }
    

    

    const reco = () => {
        console.log(recommandList);
    }

    const onClick = () => {
        fetch(addr + '/recommand', {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Content-Type": "application/json",
                "Authorization": `Bearer ` + tok,
            },
        }).then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    console.log(res);
                    fetch('http://localhost:8080/recommand', {
                        method: "POST",
                        headers: {
                            "Access-Control-Allow-Origin": "http://localhost:3000",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            id: res.id,
                        })
                    }).then((res) => res.json())
                        .then((res) => {
                            let i :number = 0;
                            setRecommandList([]);
                            for (i; i < res.items.length; i++) {
                                const data: recommand = {
                                    uid : res.items[i].uid,
                                    iid : res.items[i].iid,
                                    est : res.items[i].est
                                }
                                setRecommandList(recommandList => [...recommandList, data]);
                            }
                        })
                } else {
                    console.log("토큰 에러 로그인페이지로 리다이렉트 해아함");
                }
            })
    }


    return (
        <div>
            <h1>메인 페이지 입니다.</h1>
            <button onClick={onClick}>추천 해줘!!</button>
            <button onClick={reco}>출력</button>
            <button onClick={check}>쿠키 입력해줘!</button>
        </div>
    );

}

export default Main;




/*

해야할 일

1. 술 정보 모으기(진행 중)

3. 로그아웃 기능 구현

5. 홈 화면에서는 제공하는 어플리케이션의 기능들을 한눈에 볼 수 있게 설계 (우선순위 1)

6. 현재 외부정보 + 내부정보의 따른 오늘의 술 추천 (우선순위 2)

8. 트랜잭션 작업 (나중에)

9. app bar 만들기



*/