

function CommentOne(prop:any){
    console.log(prop)
    return (
        <div>
            {prop.data.nickname} : <input type="text" value={prop.data.contents} disabled/>
            <hr></hr>
        </div>
    )
}

export default CommentOne;