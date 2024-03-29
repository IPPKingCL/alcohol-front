import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCookie } from '../Common/Cookies';
import { boardRead,board, modiBoard } from '../interface/Board';
import { addr } from '../Common/serverAddr';

function FreeModify(){
    const [loading, setLoading] = useState<boolean>(true);
    const [board, setBoard] = useState<boardRead>();
    const [modiboard, setModiBoard] = useState<modiBoard>({
        title:"",
        contents:"",
        boardType:"",
        userId : 0
    })

    const navigate=useNavigate();
    const {id} = useParams();
    let boardId = id;
    
    const getBoard = async () => {
        fetch(addr+'/board/modi',{
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin" : "http://localhost:5000" ,
                "Content-Type": "application/json",
                "Authorization":`Bearer ${getCookie('myToken')}`,
            },
            body: JSON.stringify({
                id:id,
               
            })
        }).then((res) => res.json())
        .then((res) => {
            console.log(res);
            if(res.success){
                if(!res.auth){
                    alert("권한이 없습니다")
                    window.history.go(-1);
                }else{
                    alert("오류가 발생했습니다\n 다시 시도해주세요");
                    window.history.go(-1);
                }
            }else{
                setBoard(res);
                setModiBoard(res);
                console.log(board);
            }
            
        })

        setLoading(false);
    }

    useEffect(() => {
        getBoard();
        
    },[]);

    const onchange = (e:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>|React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        setModiBoard({
            ...modiboard,
            [name]:value
        });
    }
    
    const onclick = async () => {
       
        if(!modiboard.title||!modiboard.contents){
            alert("제목과 내용을 입력해주세요");
            return;
        } 
        
        if(!modiboard.boardType){
            alert("카테고리를 입력해주세요");
            return;
        }
        console.log(modiboard);
        
        fetch(addr+'/board/modify', {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin" : "http://localhost:5000" ,
                "Content-Type": "application/json",
                Authorization:`Bearer ${getCookie('myToken')}`,
            },
            body: JSON.stringify({
                id:id,
                title:modiboard.title,
                contents:modiboard.contents,
                boardType:modiboard.boardType,
                userId : board?.userId
            }),
        }).then((res) => res.json())
        .then((res) => {
            if(res.success) {
                alert("수정 성공");
                navigate('/free')
            }else {
                console.log("수정 과정 중 에러 발생.");
                alert("수정 과정 중 에러발생 \n다시 시도해주세요");
            }
        })
    }

    const list = () => {
        navigate('/free');
    }

    return(
        <div>
            {loading ?<strong>loading...</strong>:
               <div className = "input-Board">
                    <div>
                        <h2>게시판 수정</h2>
                    </div>
                    <hr></hr>
                    <div className = 'bar2'>
                        <h3>Title</h3>
                    </div>
                    <input name='title' type="text" className="search-input" defaultValue={board?.title} onChange={onchange} />
                    <div className = 'bar2'>
                        <h3>content</h3>
                    </div>
                    <table className="content_table">
                        <tbody>
                            <tr>
                                <td>
                                    <textarea name="contents" className="content" id="content" defaultValue={board?.contents} onChange={onchange} ></textarea>
                                </td>
                            </tr>
                        </tbody>
                        
                    </table>

                    <div className = 'bar2'>
                        <h1>ID & Date</h1>
                    </div>
                    <select name="boardType" id="selectBoard" onChange={onchange}>
                        <option>카테고리 선택</option>
                        <option value = "F">자유게시판</option>
                        <option value = "A">술 관련 게시판</option>
                        <option value = "R">레시피 게시판</option>
                    </select>
                
                    <button className="d-btn" onClick={list} >목록</button>
                    <button className="m-btn" onClick={onclick}>저장</button>
               </div>
            }
        </div>
    )
}

export default FreeModify;