import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../Common/Cookies";
import { alcho } from "../interface/Alcho";
import { addr } from "../interface/serverAddr";

function AlcoholDetail(prop:any){
    const {id} = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [alcoholData,setAlcoholData] = useState<alcho>();
    const detail = async () => {
        fetch(addr+'/alcohol/detail/'+id,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${getCookie('myToken')}`,
            }
        }).then((res) => res.json())
        .then((res)=>{
            console.log(res)
            setAlcoholData(res);
            setLoading(false);
        })
    }

    useEffect(() => {
        detail()
    },[]);

    return (
        <div>
            {loading ? <strong>loading...</strong>:
            <div>
                <h2>{alcoholData?.name}</h2>
                <span>종류 : {alcoholData?.category} </span>
                <span>당도 : {alcoholData?.sugar} </span>
                <span>색 : {alcoholData?.color} </span>
                <span>도수 : {alcoholData?.dosu} </span>
                <span>가격 : {alcoholData?.price} </span>
                <img src = {alcoholData?.imgUrl}/>
            </div>
                
            }
        </div>
    )

}

export default AlcoholDetail;