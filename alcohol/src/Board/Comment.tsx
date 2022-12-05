import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { commentList } from '../interface/CommentList';
import { addr } from '../interface/serverAddr';
import CommentList from './CommentList';
import '../css/footer.css';

function Comment(){
    const [loading, setLoading] = useState<boolean>(true);
    const [content, setContent] = useState<string>();
    const {id} = useParams();
    const [comment,setComment] = useState<commentList[]>([]);
    const [commentNum,setCommentNum] = useState<number>();
    const commentList = async () => {
        fetch(addr+'/board/comment/'+id,{
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
                    isModified:res[i].isModified
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
        fetch(addr+'/board/insertComment',{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                contents : content,
                nickname : "bk",//가라데이터 임시 사용
                boardId : id
            }),
        }).then((res) => res.json())
        .then((res) => {
            if(res.success){
                
                setContent('');
                setLoading(true);
                setComment([]);
                commentList();
            }else{
                alert("등록 실패");
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
                    <CommentList
                        datas={comment}
                        onRemove={onRemove}
                    />
                </div>
            }           

        </div>
        
    )
}

export default Comment;