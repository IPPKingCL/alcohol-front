import { useEffect, useState } from "react";
import { getCookie } from "../Common/Cookies";
import { addr } from "../Common/serverAddr";
import {alcho} from "../interface/Alcho"
import { CockJuice } from "../interface/cocktail/CockJuice";
import { Unit } from "../interface/unit";
const NewCocktail = () => {
    const [alcho,setAlcho] = useState<alcho[]>([]);
    const [juice,setJuice] = useState<CockJuice[]>([]);
    const [unit,setUnit] = useState<Unit[]>([]);
    const [loading,setLoading] = useState<boolean>(true);

    const list = async () => {
        fetch(addr+'/admin/newCocktail',{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${getCookie('myToken')}`,
            },
        }).then((res) => res.json())
        .then((res)=>{
            console.log(res);
            setAlcho(res.alchoCategory);
            setJuice(res.juiceCategory);
            setUnit(res.unitCategory)
        })
        setLoading(false);
    }

    useEffect(()=>{
        list();
    },[]);

    
    return(
        <div>
            {loading ? <strong>loading...</strong>:
                <>
                    <h1>관리자 페이지</h1>
                    <hr></hr>
                    칵테일 이름 : <input type="text"/><br></br>
                    이미지 : <input accept="image/*" multiple type="file"/>

                    <div>

                    </div>

                    <div>


                    </div>

                    <button>완료</button>
                </>
                
                
                
            }
        </div>
    )
    
}

export default NewCocktail;