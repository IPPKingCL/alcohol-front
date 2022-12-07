import { getCookie } from '../Common/Cookies';
import '../css/App.css';
import '../css/Login.css';
import { addr } from '../interface/serverAddr';

function Main() {
   

    const onClick = () => {
        fetch(addr + "/recommand", {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": addr,
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
        .then((res) => {
            if (res.success) {
                console.log(res);
            } else {
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
