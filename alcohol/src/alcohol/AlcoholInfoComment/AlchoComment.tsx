import { defaultListboxReducer } from "@mui/base"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../../Common/Cookies";
import { addr } from "../../Common/serverAddr";
import { commentList } from "../../interface/CommentList";
import AlchoCoList from "./AlchoCoList";
import AlchoCoOne from "./AlchoCoOne";

function AlchoComment(){
    const [loading, setLoading] = useState<boolean>(true);
    const [content, setContent] = useState<string>();
    const {id} = useParams();
    const [comment,setComment] = useState<commentList[]>([]);
    const [commentNum,setCommentNum] = useState<number>();
    const navigate = useNavigate();

    const commentList = async () => {
        fetch(addr+'/alcohol/commentAll/'+id,{
            method:"GET",
            headers: {
                "Content-Type" : "application/json",
            }
        }).then((res)=>res.json())
        .then((res) => {
            console.log(res);
            let i:number = 0;
            setCommentNum(res.length);
            for(i;i<res.length;i++){
                const data:commentList = {
                    id:res[i].id,
                    contents:res[i].contents,
                    dateTime:res[i].dateTime,
                    nickname:res[i].nickname,
                    isDeleted:res[i].isDeleted,
                    isModified:res[i].isModified,
                    userId:res[i].user.id
                }
                setComment(comment => [...comment,data])
            }
            setLoading(false);
        })
    }

    useEffect(() => {
        commentList();
    },[]);

    const onRemove = (id:number) => {
        //setComment(comment.filter(comment => comment.id !== id));
        setComment([]);
        commentList();
    }
    const onchange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }

    const onclick = async () => { 
        fetch(addr+'/alcohol/insertComment',{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
                "Authorization":`Bearer ${getCookie('myToken')}`,
            },
            body : JSON.stringify({
                content : content,
                alchoId : id
            }),
        }).then((res) => res.json())
        .then((res) => {
            if(res.success){
                
                setContent('');
                setLoading(true);
                setComment([]);
                commentList();
            }else{
                if(res.message=='Unauthorized'){
                    alert('로그인 후 이용 가능합니다')
                    navigate('/login');
                }else{
                    alert("등록 실패");
                }
                
            }
        })
    }

    
    return(
        <div id='wrapper'>
            <div>
                <span>댓글 {commentNum}</span>
                <hr></hr>
            </div>
            <div className="comment-box">
                <input type="text" name="comment" className='select-search' value={content||''} onChange={onchange}></input>
                <button className = "btn-submit" onClick={onclick}>등록</button>
            </div>
            <hr></hr>
            {loading ? <strong>loading...</strong> :
                <div>
                    <AlchoCoList
                        datas={comment}
                        onRemove={onRemove}
                    />
                </div>
            }           

        </div>

    )
}

export default AlchoComment;