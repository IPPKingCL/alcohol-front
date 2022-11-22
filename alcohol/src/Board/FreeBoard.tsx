import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { boardList } from '../interface/BoardList';
import { addr } from '../interface/serverAddr';
import List from './List';

function FreeBoard(){
    const [loading, setLoading] = useState<boolean>(true);
    const [arrData, setArrData] = useState<boardList[]>([]);
    const navigate=useNavigate();
    
    const list = async () => {
        setArrData([]);
        fetch(addr+'/board', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => res.json())
        .then((res) => {
            console.log(res.length)
            let i:number=0
            for(i;i<res.length;i++){
                const data:boardList = {
                    id : res[i].id,
                    title:res[i].title,
                    contents:res[i].contents,
                    dateTime:res[i].dateTime,
                    isDeleted:res[i].isDeleted,
                    isModified:res[i].isModified,
                }
                setArrData(arrData => [...arrData,data]);
            }
            
            setLoading(false);
        })

    }

    useEffect(()=>{
        list();
    },[])

    const onclick = () =>{
        console.log("hi");
        navigate('write');
    }

    const onChangeBoard = (e:any) => {
        console.log(e.target.value);
        const tag = e.target.value;
        if(tag==='D'){
            list();
            return;
        }
        setLoading(true);
        setArrData([]);
        fetch(addr+'/board', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                boardType:tag
            }),
        }).then((res) => res.json())
        .then((res) => {
            console.log(res.length)
            let i:number=0
            if(res.length==0){
                setLoading(false);
                return;
            }else{
                for(i;i<res.length;i++){
                    const data:boardList = {
                        id : res[i].id,
                        title:res[i].title,
                        contents:res[i].contents,
                        dateTime:res[i].dateTime,
                        isDeleted:res[i].isDeleted,
                        isModified:res[i].isModified,
                    }
                    setArrData(arrData => [...arrData,data]);
                }
                
                setLoading(false);
            }
            
        })
    }

    return(
        <div>
            <select name="selectBoard" id="selectBoard" onChange={onChangeBoard}>
                <option value= "D">전체 게시글</option>
                <option value = "F">자유게시판</option>
                <option value = "A">술 관련 게시판</option>
                <option value = "R">레시피 게시판</option>
            </select>

            <hr></hr>

            {loading ? <strong>Loading...</strong>:
                <div>
                    <List
                        datas={arrData}
                        
                    />
                     <button onClick={onclick}>글쓰기</button>
                </div>
                
            }

           
        </div>
    )
}

export default FreeBoard;