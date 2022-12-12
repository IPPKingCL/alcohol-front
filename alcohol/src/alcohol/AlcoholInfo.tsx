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
    },[]);

    const onChange = (e:any) => {
        let category = '';
        
        switch(e.target.value){
            case 'D':
                list();
                break;
            case 'W':
                category='위스키';
                break;
            case 'B':
                category='보드카';
                break;
            case 'BR':
                category='브랜디';
                break;
            case 'S':
                category='전통주';
                break;
            case 'BE':
                category='맥주';
                break;
            case 'G':
                category='진';
                break;
            case 'R':
                category='럼';
                break;
            case 'D':
                category='데낄라';
                break;
            case 'WI':
                category='와인';
                break;
        }
        console.log(category)
        setLoading(true);
        setArrData([]);
        fetch(addr+'/alcohol/category/'+category,{
            method:'GET',
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
        .then((res) => {
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
                setArrData(arrData => [...arrData,data]);
            }
            setLoading(false);
        })
    }
    return(
        <div id='wrapper2'>
            <div className='search-tool'>
                <select name="selectBoard" id="selectBoard" className="select-search" onChange = {onChange}>
                    <option value="D">전체</option>
                    <option value="W">위스키</option>
                    <option value="B">보드카</option>
                    <option value="BR">브랜디</option>
                    <option value="S">전통주</option>
                    <option value="BE">맥주</option>
                    <option value='G'>진</option>
                    <option value='R'>럼</option>
                    <option value="D">데낄라</option>
                    <option value='WI'>와인</option>
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