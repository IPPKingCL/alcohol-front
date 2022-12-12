import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { boardRead } from '../interface/Board';
import { addr } from '../Common/serverAddr';
import Comment from './Comment';
import '../css/board.css';
import { getCookie } from '../Common/Cookies';

function FreeRead(){
    const [loading,setLoading] = useState<boolean>(true);
    const [board, setBoard] = useState<boardRead>();
    const {id} = useParams();
    const navigate = useNavigate();
    
    const list = async () => {
        
        fetch(addr+'/board/read/'+id,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => res.json())
        .then((res) => {
            setBoard(res);
           
        })

        setLoading(false);
    }

    useEffect(() => {
        list();
    },[])
    const onclick = () => {
        fetch(addr + '/board/check', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${getCookie('myToken')}`,
            },
        }).then((res) => res.json())
        .then((res) => {
            if(res.success){
                navigate('/free/modify/'+id);
            }else{
                if(res.message=="Unauthorized"){
                    alert('로그인 후 사용가능합니다');
                    navigate('/login');
                }else{
                    alert('에러 발생 잠시 후 시도해주세요');
                }
            }
        })
        
    }

    const boardList = () => {
        navigate('/free');
    }

    const recommend = () => {
        console.log(id);
        fetch(addr+'/board/recommendBoard/'+id,{
            method :"Get",
            headers: {
                "Content-Type" :"application/json",
                "Authorization":`Bearer ${getCookie('myToken')}`,
            }
        }).then((res)=>res.json())
        .then((res) => {
            if(res.success){
                alert("추천되었습니다");
            }else{
                if(res.message=='Unauthorized'){
                    alert('로그인 후 이용 가능합니다')
                    navigate('/login');
                }else{
                    alert("게시글 추천 도중 에러 발생");
                }
                
            }
        })
    }

    const deleteBoard = () => {
        const message = "게시글을 삭제하시겠습니까";
        if (window.confirm(message)) {
            //세션 비교해서 삭제 권한 있는지 확인하는 작업 필요
            fetch(addr+"/board/deleteBoard/",{
                method:"Post",
                headers: {
                    "Access-Control-Allow-Origin" : "http://localhost:5000" ,
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${getCookie('myToken')}`,
                },
                body: JSON.stringify({
                    id:id,
                    userId:board?.userId,
                    
                }),
            }).then((res) => res.json())
            .then((res) => {
                if(res.success){
                    alert("삭제되었습니다");
                    navigate("/free");
                }else{
                    if(res.message=='Unauthorized'){
                        alert('로그인 후 이용 가능합니다')
                        navigate('/login');
                    }else{
                        alert("삭제 도중 에러발생 \n다시 시도해주세요");
                        return;
                    }
                }
            })
        }else{
            return;
        }
    }
    return(
        <div>
            <div>
                <h2>&nbsp;&nbsp;게시판</h2>
            </div>
            <hr></hr>
            {loading ?<strong>loading...</strong>:
               <div className = "input-Board">
                     
                    <div className = 'bar2'>
                        <h3>Title</h3>
                    </div>
                    <input name='title' type="text" className="search-input" value={board?.title||''} disabled/>
                    <div className = 'bar2'>
                        <h3>content</h3>
                    </div>
                    
                        <textarea name="content" className="content" id="content" value={board?.contents||''} disabled></textarea>
                  

                    <div className = 'bar2'>
                        <h3>ID & Date</h3>
                    </div>
                    <input name='title' type="text" className="search-input" value={board?.nickname||''} disabled/>

                    <input name='title' type="text" className="search-input" value={board?.dateTime||''} disabled/>
                    <div className='input-btn'>
                        <button className="d-btn" onClick={boardList}>목록</button>
                        <button className="m-btn" onClick={onclick}>수정</button>
                        <button className="m-btn" onClick={deleteBoard}>삭제</button>
                        <button className='m-btn' onClick={recommend}>추천</button>
                    </div>
                    <div>
                        <Comment/>
                    </div>
               </div>
            }
        </div>
    )

}

export default FreeRead;