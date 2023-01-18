import { useEffect, useState } from "react";
import { addr } from "../../Common/serverAddr";
import { AlchoCategory } from "../../interface/AlchoCategory";
import AlcoholSearchOption from "./AlcoholSearchOption";

const AlcoholSearch = (props:any) => {
    const [option,setOption] = useState<AlchoCategory[]>([]);
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
            setOption(res);
            
        })
        setLoading(false);
    }

    useEffect(()=>{
        list();
    },[])


    return (
        <div>
            {loading ? <strong>Loading....</strong>:
                <div className='search-tool'>
                    <select name="selectBoard" id="selectBoard" className="select-search"  onChange = {props.onChange}>
                        <option value={0}>전체</option>
                        {option.map((data:any)=>(
                                <AlcoholSearchOption prop={data} key={data.id}/>
                        ))}
                    </select>
                    <form className='search-form' onSubmit={e => props.onSearch(e)}>
                        <input type="text" id="search" onChange={props.onChangeSearch}></input>
                        <button type='submit' className='btn-submit'>검색</button>
                    </form>
                   
                </div>
            }
            
        </div>
    )
}

export default AlcoholSearch;