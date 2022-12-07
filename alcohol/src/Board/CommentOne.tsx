import { stringify } from "querystring";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../Common/Cookies";
import { addr } from "../interface/serverAddr";


function CommentOne(prop:any){
    console.log(prop)
    const onclick = async () => {
        //아이디 비교하는 과정 필요
        console.log(prop.data.id)
        fetch(addr + '/board/deleteComment',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${getCookie('myToken')}`,
            },
            body : JSON.stringify({
                id:prop.data.id,

            }),
        }).then((res)=>res.json())
        .then((res) => {
            if(res.success){
                alert('댓글이 삭제되었습니다');
                prop.onRemove(prop.data.id);
            }else{
                console.log("댓글 삭제 과정 중 에러발생");
                alert("삭제 과정 중 에러발생 \n다시 시도해주세요");
            }
        });
    }
    return (
        <div>
            {prop.data.nickname} : <input type="text" className="comment-input" value={prop.data.contents} disabled/> <span onClick={onclick} className="comment-span">삭제</span>
            <hr></hr>
        </div>
    )
}

export default CommentOne;