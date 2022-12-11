import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../Common/Cookies";
import { addr } from "../interface/serverAddr";

function AlcoholDetail(prop:any){
    const {id} = useParams();
    const detail = () => {
        fetch(addr+'/alcohol/detail/'+id,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${getCookie('myToken')}`,
            }
        }).then((res) => res.json())
        .then((res)=>{
            console.log(res)
        })
    }

    useEffect(() => {
        detail()
    },[]);

    return (
        <div>

        </div>
    )

}

export default AlcoholDetail;