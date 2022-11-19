import React, { useEffect, useState } from 'react';
import { boardList } from '../interface/BoardList';
import { addr } from '../interface/serverAddr';

function FreeBoard(){
    const [loading, setLoading] = useState<boolean>(true);
    const [arrData, setArrData] = useState<boardList[]>();

    const list = async () => {
        fetch(addr+'/board', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => res.json())
        .then((res) => {
            console.log(res);
            setArrData(res);
            console.log("arrData : "+{arrData});
            setLoading(false);
        })

    }

    useEffect(()=>{
        list();
    },[])
    return(
        <div>
            <h2>게시판</h2>
        </div>
    )
}

export default FreeBoard;