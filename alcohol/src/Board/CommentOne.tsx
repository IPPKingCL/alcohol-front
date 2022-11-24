

function CommentOne(prop:any){
    
    return (
        <div>
            {prop.data.nickname} : <input type="text" className="comment-input" value={prop.data.contents} disabled/> <span className="comment-span">삭제</span>
            <hr></hr>
        </div>
    )
}

export default CommentOne;