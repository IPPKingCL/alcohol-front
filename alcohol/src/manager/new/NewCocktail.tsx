import { Radio } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import AlcoholSearchOption from "../../alcohol/AlcoholSearch/AlcoholSearchOption";
import { getCookie } from "../../Common/Cookies";
import { addr } from "../../Common/serverAddr";
import {alcho} from "../../interface/Alcho"
import { CockJuice } from "../../interface/cocktail/CockJuice";
import { Unit } from "../../interface/unit";
import SearchOption from "./SearchOption";
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
                    
                    <hr></hr>
                    
                    <div>
                        술 레시피
                        <br></br>
                        <select>
                            {alcho.map((data:any)=>(
                                    <SearchOption prop={data} key={data.id}/>
                            ))}
                        </select>
                        <input type ="text"/>
                        <select>
                            {unit.map((data:any)=>(
                                    <SearchOption prop={data} key={data.id}/>
                            ))}
                        </select>
                        only<Radio></Radio>
                    </div>

                    <hr></hr>

                    <div>
                        음료 레시피
                        <br></br>
                        <select>
                            {juice.map((data:any)=>(
                                    <SearchOption prop={data} key={data.id}/>
                            ))}
                        </select>
                        <input type ="text"/>
                        <select>
                            {unit.map((data:any)=>(
                                    <SearchOption prop={data} key={data.id}/>
                            ))}
                        </select>
                        only<Radio></Radio> 
                    </div>

                </>
                
                
                
            }
        </div>
    )
    
}

export default NewCocktail;