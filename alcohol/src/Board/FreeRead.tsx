import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { boardRead } from '../interface/Board';
import { addr } from '../interface/serverAddr';
import Comment from './Comment';
import '../css/board.css';

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
            console.log(board);
        })

        setLoading(false);
    }

    useEffect(() => {
        list();
    },[])
    const onclick = () => {
        //수정 함수 작성 예쩡
        navigate('/free/modify/'+id);
    }

    const boardList = () => {
        navigate('/free');
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
                    <input name='title' type="text" className="search-input" value={board?.userId||''} disabled/>

                    <input name='title' type="text" className="search-input" value={board?.dateTime||''} disabled/>
                    <div className='input-btn'>
                        <button className="d-btn" onClick={boardList}>목록</button>
                        <button className="m-btn" onClick={onclick}>수정</button>
                        <button className="m-btn" >삭제</button>
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