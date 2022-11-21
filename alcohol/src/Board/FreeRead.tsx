import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { boardRead } from '../interface/Board';
import { addr } from '../interface/serverAddr';

function FreeRead(){
    const [loading,setLoading] = useState<boolean>(true);
    const [board, setBoard] = useState<boardRead>();
    const {id} = useParams();
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
        
    }
    return(
        <div>
            {loading ?<strong>loading...</strong>:
               <div className = "input-Board">
                    
                    <div className = 'bar2'>
                        <h1>Title</h1>
                    </div>
                    <input name='title' type="text" className="search-input" value={board?.title} disabled/>
                    <div className = 'bar2'>
                        <h1>content</h1>
                    </div>
                    <table className="content_table">
                        <tbody>
                            <tr>
                                <td>
                                    <textarea name="content" className="content" id="content" value={board?.contents} disabled></textarea>
                                </td>
                            </tr>
                        </tbody>
                        
                    </table>

                    <div className = 'bar2'>
                        <h1>ID & Date</h1>
                    </div>
                    <input name='title' type="text" className="search-input" value={board?.userId} disabled/>

                    <input name='title' type="text" className="search-input" value={board?.dateTime} disabled/>
                
                    <button className="d-btn" ><Link to="/" >목록</Link></button>
                    <button className="m-btn" onClick={onclick}>수정</button>
               </div>
            }
        </div>
    )

}

export default FreeRead;