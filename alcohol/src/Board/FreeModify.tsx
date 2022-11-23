import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { boardRead } from '../interface/Board';
import { addr } from '../interface/serverAddr';

function FreeModify(){
    const [loading, setLoading] = useState<boolean>(true);
    const [board, setBoard] = useState<boardRead>();
    const {id} = useParams();

    const getBoard = async () => {
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
        getBoard();
    },[]);

    const onclick = () => {

    }

    return(
        <div>
            {loading ?<strong>loading...</strong>:
               <div className = "input-Board">
                    
                    <div className = 'bar2'>
                        <h1>Title</h1>
                    </div>
                    <input name='title' type="text" className="search-input" defaultValue={board?.title} />
                    <div className = 'bar2'>
                        <h1>content</h1>
                    </div>
                    <table className="content_table">
                        <tbody>
                            <tr>
                                <td>
                                    <textarea name="content" className="content" id="content" defaultValue={board?.contents} ></textarea>
                                </td>
                            </tr>
                        </tbody>
                        
                    </table>

                    <div className = 'bar2'>
                        <h1>ID & Date</h1>
                    </div>
                   
                
                    <button className="d-btn" ><Link to="/" >목록</Link></button>
                    <button className="m-btn" onClick={onclick}>저장</button>
               </div>
            }
        </div>
    )
}

export default FreeModify;