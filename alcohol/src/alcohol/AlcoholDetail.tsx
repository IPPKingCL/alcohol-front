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

    const Recipe = () => {
        navigate('/cocktail/recipe/'+id+'&'+alcoholData?.category);
    }

    return (
        <div>
            {loading ? <strong>loading...</strong>:
            <>
                <div className = "input-Board">
                    <div className = 'bar2'>
                        <h3>Title</h3>
                    </div>

                    <input name='title' type="text" className="search-input" value={alcoholData?.name} disabled/>
                    <div className = 'bar2'>
                        <h3>detail</h3>
                    </div>
                        
                    <div className="content" id="content">
                        <p>종류 : {alcoholData?.category} </p>
                        <p>당도 : {alcoholData?.sugar} (달수록 숫자가 높습니다)</p>
                        <p>색 : {color} </p>
                        <p>도수 : {alcoholData?.dosu} </p>
                        <p>가격 : {alcoholData?.price}원 (판매점마다 가격이 다를 수 있습니다)</p>
                    
                        <div>
                            <img className="alcoholImg" src={alcoholData?.imgUrl} />
                        </div>
                    

                        
                    </div>

                    <div className='input-btn'>
                        <button className="d-btn" onClick={onclick}>뒤로</button>
                        <button className="m-btn" onClick={Recipe}>칵테일 레시피</button>
                    </div>
                <div>
                    <AlchoComment></AlchoComment>
                </div>
            </div> 
            </>
            }
        </div>
    )

}

export default AlcoholDetail;