import { useEffect, useState } from "react";
import { addr } from "../../Common/serverAddr";

const AlcoholSearch = (props:any) => {
    const [option,setOption] = useState<string[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    const list = async () => {
        setOption([]);
        fetch(addr+'/alcohol/category',{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            }
        }).then((res)=>res.json())
        .then((res)=>{
            console.log(res);
            for(let i = 0; i<res.length;i++){
                setOption(option => [...option,res[i].category])
            }
            
        })
    }

    useEffect(()=>{
        list();
    },[])

    const test = () => {
        console.log( option);
    }
    return (
        <div>
            <div className='search-tool'>
                <select name="selectBoard" id="selectBoard" className="select-search"  onChange = {props.onChange}>
                    <option value="A">전체</option>
                    <option value="W">위스키</option>
                    <option value="B">보드카</option>
                    <option value="BR">브랜디</option>
                    <option value="S">전통주</option>
                    <option value="BE">맥주</option>
                    <option value='G'>진</option>
                    <option value='R'>럼</option>
                    <option value="D">데낄라</option>
                    <option value='WI'>와인</option>
                    <option value="Rq">리큐르</option>
                </select>
                <form className='search-form' onSubmit={e => props.onSearch(e)}>
                    <input type="text" id="search" onChange={props.onChangeSearch}></input>
                    <button type='submit' className='btn-submit'>검색</button>
                </form>
                <button onClick={test}>테스트</button>
            </div>
        </div>
    )
}

export default AlcoholSearch;