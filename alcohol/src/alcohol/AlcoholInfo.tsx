import { useEffect, useState } from "react";
import { alcho } from "../interface/Alcho";
import { addr } from "../interface/serverAddr";
import AlcoholList from "./AlcoholList";

function AlcoholInfo(){
    const [arrData,setArrData] = useState<alcho[]>([])
    const [loading,setLoading] = useState<boolean>(true);
    const list = async () => {
        setArrData([]);
        fetch(addr+'/alcohol',{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            }
        }).then((res) => res.json())
        .then((res)=>{
            let i:number = 0;
            for (i; i < res.length; i++) {
                const data:alcho ={
                    id:res[i].id,
                    name:res[i].name,
                    category:res[i].category,
                    sugar:res[i].sugar,
                    color : res[i].color,
                    dosu : res[i].dosu,
                    price : res[i].price,
                    imgUrl : res[i].imgUrl
                }
                setArrData(arrData => [...arrData,data])
            }
        })
        setLoading(false);
    }

    useEffect(() => {
        list();
    },[])
    return(
        <div id='wrapper2'>
            <div className='search-tool'>
                <select name="selectBoard" id="selectBoard" className="select-search">
                    <option value="D">카테고리</option>
                    <option value="F">위스키</option>
                    <option value="A">보드카</option>
                    <option value="R">브랜디</option>
                </select>
                <form className='search-form' >
                    <input type="text" id="search"  ></input>
                    <button type='submit' className='btn-submit'>검색</button>
                </form>
            </div>

            <hr></hr>

            {loading ? <strong>Loading...</strong> :
                <div>
                    <AlcoholList
                        datas={arrData}
                    />
                </div>    
            }
        </div>

    )
}

export default AlcoholInfo;