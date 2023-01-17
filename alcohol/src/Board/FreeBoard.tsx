import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { boardList } from '../interface/BoardList';
import { addr } from '../Common/serverAddr';
import List from './List';
import '../css/board.css';
import Pagination from './Paginattion';
import { getCookie } from '../Common/Cookies';
import PaginationBoard from './Paginattion';
import BasicSpeedDial from './BasicSpeedDial';
import { Box } from '@mui/material';

function FreeBoard() {
    const [loading, setLoading] = useState<boolean>(true);
    const [arrData, setArrData] = useState<boardList[]>([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(1);//default 1 page
    const [pageCount, setPageCount] = useState<number>();  //page count
    const [aData, setAData] = useState<boardList[]>([]);
    const [search, setSearch] = useState<string>("");//검색어
    const focusRef = useRef<HTMLInputElement>();
    const list = async () => {
        setArrData([]);
        fetch(addr + '/board', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie('myToken')}`,
            }
        }).then((res) => res.json())
            .then((res) => {
                if (res.message == 'Unauthorized') {
                    alert('로그인 후 이용 가능합니다')
                    navigate('/Login');
                }
                let i: number = 0
                for (i; i < res.length; i++) {
                    const data: boardList = {
                        id: res[i].id,
                        title: res[i].title,
                        contents: res[i].contents,
                        dateTime: res[i].dateTime,
                        isModified: res[i].isModified,
                        boardType: res[i].boardType,
                        userId: res[i].userId
                    }
                    setArrData(arrData => [...arrData, data]);
                }
                if (res.length % 10 == 0) {
                    setPageCount(res.length / 10);
                } else {
                    setPageCount(res.length / 10 + 1);
                }
                setAData(res.slice(0, 10));
            })
        setLoading(false);
    }

    useEffect(() => {
        list();
    }, [])

    const onclick = () => {
        fetch(addr + '/board/check', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie('myToken')}`,
            },
        }).then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    navigate('write');
                } else {
                    if (res.message == "Unauthorized") {
                        alert('로그인 후 사용가능합니다');
                        navigate('/login');
                    } else {
                        alert('에러 발생 잠시 후 시도해주세요');
                    }
                }
            })

    }

    const onChangeBoard = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tag = e.target.value;
        if (tag === 'D') {
            list();
            return;
        }
        setLoading(true);
        setArrData([]);
        fetch(addr + '/board', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                boardType: tag
            }),
        }).then((res) => res.json())
            .then((res) => {
                console.log(res.length)
                let i: number = 0
                if (res.length == 0) {
                    setLoading(false);
                    return;
                } else {
                    for (i; i < res.length; i++) {
                        const data: boardList = {
                            id: res[i].id,
                            title: res[i].title,
                            contents: res[i].contents,
                            dateTime: res[i].dateTime,
                            isModified: res[i].isModified,
                            boardType: res[i].boardType,
                            userId: res[i].userId
                        }
                        setArrData(arrData => [...arrData, data]);
                    }

                    if (res.length % 10 == 0) {
                        setPageCount(res.length / 10);
                    } else {
                        setPageCount(res.length / 10 + 1);
                    }
                    setAData(res.slice(0, 10));
                    setLoading(false);
                }

            })
    }

    const getCurrentPage = (num: number) => {
        let page = 10 * (num - 1);
        //if(search===''||search === null){
        setAData(arrData.slice(page, page + 10));
        // }else{

        //}

    }

    /**/

    const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(search);
        const filterData = aData.filter((row) => row.title.includes(search));


        if (filterData.length % 10 == 0) {
            setPageCount(filterData.length / 10);
        } else {
            setPageCount(filterData.length / 10 + 1);
        }
        setAData(filterData.slice(0, 10));
        setSearch('');
        //focusRef.current.focus()
    }

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.target.value);
    }
    return (
        <>
            <div id='wrapper'>
                <div className='search-tool'>
                    <select name="selectBoard" id="selectBoard" className="select-search" onChange={onChangeBoard}>
                        <option value="D">전체 게시글</option>
                        <option value="F">자유게시판</option>
                        <option value="A">술 관련 게시판</option>
                        <option value="R">레시피 게시판</option>
                    </select>
                    <form className='search-form' onSubmit={e => onSearch(e)}>
                        <input type="text" id="search" value={search} onChange={onChangeSearch} ></input>
                        <button type='submit' className='btn-submit'>검색</button>
                    </form>
                </div>

                <hr></hr>

                {loading ? <strong>Loading...</strong> :
                    <div>
                        <List
                            datas={aData}
                        />
                        <PaginationBoard
                            num={pageCount}
                            getCurrentPage={getCurrentPage}
                        />
                        <button className='btn-write' onClick={onclick}>글쓰기</button>
                    </div>
                }


            </div>
            {/* <div style={{position: 'fixed'}}>
                <BasicSpeedDial></BasicSpeedDial>
            </div> */}
        </>
    )
}

export default FreeBoard;