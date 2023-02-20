import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeListco from "../Cocktail/Recipe/RecipeListco";
import { getCookie } from "../Common/Cookies";
import { addr } from "../Common/serverAddr";
import {Cocktail} from "../interface/Cocktail"
const FilterCocktail = () => {
    const [cocktail,setCocktail] = useState<Cocktail[]>();
    const [loading,setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const recommendCocktail = () => {
        fetch(addr+'/cocktail/recommend/type',{
            method: "Get",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${getCookie('myToken')}`,
            }
        }).then((res) => res.json())
        .then((res) =>{
            if(res.message=='Unauthorized'){
                alert('로그인 후 이용하여 주세요');
                navigate('/Login');
            }
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

    const again = () => {
        setCocktail([]);
        setLoading(true);
        fetch(addr+'/cocktail/recommend/contentFiltering/again',{
            method: "Get",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${getCookie('myToken')}`,
            }
            }).then((res) => res.json())
            .then((res) =>{
                if(res.message=='Unauthorized'){
                    alert('로그인 후 이용하여 주세요');
                    navigate('/Login');
                }
                console.log(res);
                setCocktail(res);
            })
        setLoading(false);
    }
    
    return (
        <div>
            <h1>당신에게 추천하는 칵테일</h1>
            <h5>각 칵테일에 별점을 주시면 더 정확한 추천을 받으실 수 있습니다</h5>
            <hr/>
            { loading ? <strong>loading...</strong>:
                 <RecipeListco
                 datas={cocktail}/>
                 
            }
             <Button
                        disableElevation
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="warning"
                        onClick={again}
                        sx={{
                            marginBlock: "1rem"
                        }}>다시 추천 받기
                    </Button>
             
        </div>
    )
}

export default FilterCocktail;