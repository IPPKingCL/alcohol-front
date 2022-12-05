import { useNavigate, useParams } from "react-router-dom";
import { addr } from "../interface/serverAddr";


function CommentOne(prop:any){
   
    const onclick = async () => {
        //아이디 비교하는 과정 필요
        
        fetch(addr + '/board/deleteComment/'+prop.data.id,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            },
            
        }).then((res)=>res.json())
        .then((res) => {
            if(res.success){
                alert('댓글이 삭제되었습니다');
               
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