import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function FreeRead(){
    const [loading,setLoading] = useState<boolean>(true);
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
                    <input name='title' type="text" className="search-input" value="" disabled/>
                    <div className = 'bar2'>
                        <h1>content</h1>
                    </div>
                    <table className="content_table">
                        <tr>
                            <td><textarea name="content" className="content" id="content" disabled></textarea>
                            </td>
                        </tr>
                    </table>

                    <div className = 'bar2'>
                        <h1>ID & Date</h1>
                    </div>
                    <input name='title' type="text" className="search-input" value="" disabled/>

                    <input name='title' type="text" className="search-input" value="" disabled/>
                
                    <button className="d-btn" ><Link to="/" >목록</Link></button>
                    <button className="m-btn" onClick={onclick}>수정</button>
               </div>
            }
        </div>
    )

}

export default FreeRead;