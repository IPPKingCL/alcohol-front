import { useEffect, useState } from "react";
import { alcho } from "../interface/Alcho";
import { addr } from "../Common/serverAddr";
import AlcoholList from "./AlcoholList";
import { setServers } from "dns/promises";
import AlcoholSearch from "./AlcoholSearch/AlcoholSearch";

function AlcoholInfo(){
    const [arrData,setArrData] = useState<alcho[]>([])
    const [loading,setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [searchData,setSearchData] = useState<alcho[]>([])
    const list = async () => {
        setArrData([]);
        setSearchData([]);
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
                setSearchData(searchData => [...searchData,data]);
            }
            
        })
        setLoading(false);
    }

    useEffect(() => {
        list();
    },[]);

    const onChange = (e:any) => {
        let category = '';
        console.log(e.target.value)
        category = e.target.value;
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
    const onSearch = (e:React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();
        console.log(search);
        if(search==''){
            list();
            return;
        }
        const filterData = searchData.filter((row)=>row.name.includes(search));

        setArrData(filterData)
        setSearch('');
    }

    const onChangeSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    
    return(
        <div id='wrapper2'>
           
            <AlcoholSearch
                onSearch={onSearch}
                onChange={onChange}
                onChangeSearch = {onChangeSearch}
                />
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