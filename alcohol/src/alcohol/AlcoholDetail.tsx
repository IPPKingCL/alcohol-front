import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../Common/Cookies";
import { alcho } from "../interface/Alcho";
import { addr } from "../Common/serverAddr";
import AlchoComment from "./AlcoholInfoComment/AlchoComment";




function AlcoholDetail(prop:any){
    const {id} = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [alcoholData,setAlcoholData] = useState<alcho>();
    const [color,setColor] = useState<string>(); 
    const navigate = useNavigate();
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
            if(res.color=='tp'){
                setColor("Transparency(무색)")
            }else{
                setColor(res.color);
            }
            setLoading(false);
            
        })
    }  

    useEffect(() => {
        detail()
    },[]);

    const onclick = () => {
        navigate('/alcohol')
    }
    return (
        <div>
            {loading ? <strong>loading...</strong>:
            <><div>
                    <h2>{alcoholData?.name}</h2>
                    <p>종류 : {alcoholData?.category} </p>
                    <p>당도 : {alcoholData?.sugar} (달수록 숫자가 높습니다)</p>
                    <p>색 : {color} </p>
                    <p>도수 : {alcoholData?.dosu} </p>
                    <p>가격 : {alcoholData?.price}원 (판매점마다 가격이 다를 수 있습니다)</p>
                    <img className="alcoholImg" src={alcoholData?.imgUrl} />
                    <div>
                        <button onClick={onclick}>뒤로</button>
                        <button>칵테일 레시피</button>
                    </div>
                </div>
                <div>
                
                </div>
                <div>
                    <AlchoComment></AlchoComment>
                </div></>
                
            }
        </div>
    )

}

export default AlcoholDetail;