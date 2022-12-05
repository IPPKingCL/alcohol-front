import CommentOne from './CommentOne';

function CommentList(props:any){
    
    return(
        <div>
            {props.datas.map((data:any)=>(
                <CommentOne
                    data={data}
                    key={data.id}
                    onRemove={props.onRemove}
                />
            )
            )}
        </div>
    )
}

export default CommentList;