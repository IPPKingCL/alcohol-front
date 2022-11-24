import React, { useEffect, useState } from 'react';
import { commentList } from '../interface/CommentList';
import CommentOne from './CommentOne';

function CommentList(props:any){
    
    return(
        <div>
            {props.datas.map((data:any)=>(
                <CommentOne
                    data={data}
                    key={data.id}
                />
            )
            )}
        </div>
    )
}

export default CommentList;