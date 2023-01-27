import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getCookie, removeCookie, setCookie } from '../Common/Cookies';
import { addr } from '../Common/serverAddr';
import '../css/MyPage.css';
import { User } from '../interface/user';
import MyFavorite from './MyFavorite';


function MyPage(){
    const [userData, setUserData] = useState<User>();
    const [loading, setLoading] = useState<boolean>(true);
    const [favoirtes, setFavorite] = useState<string[]>([]);
    const [img, setImg] = useState<string>(); 
    const navigate = useNavigate();
    let copy;
    const user = () =>{
        
        fetch(addr+'/user/selectUser',{
            method:'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${getCookie('myToken')}`,
            },
        }).then((res)=>res.json())
        .then((res) => {

            if(res.success===false){
                alert('회원 조회 중 에러 발생');
                window.history.go(-1);
            }
            if(res.message=='Unauthorized'){
                alert('로그인 후 이용 가능합니다')
                navigate('/Login');
            }
            setUserData(res);
            favoriteList();
            
            if(res.img===""){
                let copy= {...userData};

                setImg('https://ifh.cc/g/QCO7Gm.png');

               
                
            }else{
                setImg(res.img);
            }
            
        })
    }

    const favoriteList = () => {
        setFavorite([])
        fetch(addr+'/user/selectFavorite',{
            method:"GET",
            headers : {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${getCookie('myToken')}`,
            }
        }).then((res)=>res.json())
        .then((res) => {
            
            for(let i =0; i<res.length;i++){
                setFavorite(favoirtes => [...favoirtes,res[i].alcho.category])
            }
            setLoading(false);
        })
    }

    useEffect(()=>{
        user()
    },[]);

    const logOut = () => {
        const res = removeCookie('myToken');
        
        if(res.success){
            alert('로그아웃 되었습니다');
            navigate('/Main');
        }else{
            alert('로그아웃 도중 에러 발생');
            return;
        }
        
        //일단 현재 프로젝트 상황 상 클라이언트에서 쿠키 삭제로 로그인 구현해놓았습니다
        //추후 좀 더 서치하고 보강할 예정입니다
    }

    return(
        <div>
            {loading ? <strong>loading....</strong>:
            <div>
                <div className='mypage'>
                    <h3>{userData?.nickname}님의 마이페이지</h3>
                </div>
         
             <hr></hr>
                <div >
                    <img className="myImg" src={img}/>
                    <div className='myHi'>
                        <p className=''> {userData?.name}</p>
                        <p className=''> {userData?.nickname}</p>
                        <p className=''> {userData?.birth}</p>
                        <p className=''> {userData?.job}</p>
                        <p className=''> {userData?.price}</p>
                        <p className=''> {userData?.email}</p>
                        
                    </div>
                    
                   
                    
                </div>
                
               <MyFavorite
                    
                    datas={favoirtes}/>
                
              
              
            </div>
            
            }
            <button onClick ={logOut}>로그아웃</button>
            <button onClick = {()=>{navigate('/myPage/modify')}} >수정</button>
        </div>
    )
}


export default MyPage;