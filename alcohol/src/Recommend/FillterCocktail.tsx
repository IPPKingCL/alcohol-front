import { useEffect, useState } from "react";
import { getCookie } from "../Common/Cookies";
import { addr } from "../Common/serverAddr";
import {Cocktail} from "../interface/Cocktail"
const FilterCocktail = () => {
    const [cocktail,setCocktail] = useState<Cocktail[]>();
    const [loading,setLoading] = useState<boolean>(true);

    const recommendCocktail = () => {
        fetch(addr+'/cocktail/recommend/contentFiltering',{
            method: "Get",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${getCookie('myToken')}`,
            }
        }).then((res) => res.json())
        .then((res) =>{
            console.log(res);
            setCocktail(res);
        })
        setLoading(false);
    }

    useEffect(()=>{
        recommendCocktail();
    },[]);

    const check = () => {
        console.log(cocktail);
    }
    return (
        <div>
            { loading ? <strong>loading...</strong>:
                <button onClick={check}>체크</button>
            }
        </div>
    )
}

export default FilterCocktail;