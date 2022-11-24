import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { boardList } from '../interface/BoardList';
import { addr } from '../interface/serverAddr';
import List from './List';
import '../css/board.css';
import Pagination from './Paginattion';

function FreeBoard(){
    const [loading, setLoading] = useState<boolean>(true);
    const [arrData, setArrData] = useState<boardList[]>([]);
    const navigate=useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(1);//default 1 page
    const [pageCount,setPageCount] = useState<number>();  //page count
    const [aData, setAData] = useState<boardList[]>([]);
    
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
            if(res.length%10==0){
                setPageCount(res.length/5);
            }else{
                setPageCount(res.length/5+1);
            }
            setAData(arrData.slice(0,5));
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

    const getCurrentPage = (num:number) =>{
        alert(num);
    }
    return(
        <div>
            <div className='search-tool'>
                <select name="selectBoard" id="selectBoard" className="select-search" onChange={onChangeBoard}>
                    <option value= "D">전체 게시글</option>
                    <option value = "F">자유게시판</option>
                    <option value = "A">술 관련 게시판</option>
                    <option value = "R">레시피 게시판</option>
                </select>
                <input type="text" id="search"></input>
                <button className='btn-submit'>검색</button>
            </div>
            
            <hr></hr>

            {loading ? <strong>Loading...</strong>:
                <div>
                    <List
                        datas={aData}
                        
                    />
                    
                     <button className='btn-write' onClick={onclick}>글쓰기</button>
                
                </div>
                
                
            }

           
        </div>
    )
}

export default FreeBoard;