import { useEffect } from "react";
import { getCookie } from "../Common/Cookies";
import { addr } from "../Common/serverAddr";

const FilterCocktail = () => {
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
        })
    }

    useEffect(()=>{
        recommendCocktail();
    },[]);

    return (
        <div>

        </div>
    )
}

export default FilterCocktail;