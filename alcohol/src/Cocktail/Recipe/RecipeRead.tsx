import { useEffect,useState } from "react";
import { useParams } from "react-router";
import { addr } from "../../Common/serverAddr";
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import StarIcon from '@mui/icons-material/Star';
import { Cock } from "../../interface/cocktail/Cock";
import CockJuice from "./RecipeDetail/CockJuice";
import CockAlcho from "./RecipeDetail/CockAlcho";
import CocktailComment from "./RecipeComment/CocktailComment";

const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };
  
  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }
const RecipeRead = () =>{
    const {id} = useParams();
    const [recipe,setRecipe] = useState<Cock>();
    const [loading,setLoading] = useState<boolean>(true);
    const [amount, setAmount] = useState<string>();

    let tempAmount ='';
    const recipeFunc = async () => {
        fetch(addr+'/cocktail/'+id,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res)=>res.json())
        .then((res)=>{
            console.log(res);
            if(res['cocktail'].only){
                res['cocktail'].only = '해당 술만 사용할 수 있는 칵테일입니다'
            }else{
                res['cocktail'].only = '같은 종류의 술을 대체하여 사용할 수 있는 칵테일입니다.'
            }

            setRecipe(res);
            setLoading(false);
        })
    }

    useEffect(()=>{
        recipeFunc()
    },[])

    const onclick = () =>{
        alert(value);
    }
    const [value, setValue] = React.useState<number | null>(2);
    const [hover, setHover] = React.useState(-1);
    return (
        <div>
            

                {loading ? <strong>loading...</strong>:
                <>
                    <h2>{recipe?.cocktail.name}</h2>
                    <hr></hr>
                    <h5>도수 : {recipe?.cocktail.dosu}도</h5>
                    <h5>이 칵테일은 {recipe?.cocktail.only}</h5>
                    <img src={recipe?.cocktail.imgUrl}/>
                    <hr></hr>
                    <h3>레시피</h3>
                    <CockAlcho datas={recipe?.cockAlcho}/>
                    <CockJuice datas={recipe?.cockJuice}/>
                    <Box
                        sx={{
                            '& > legend': { mt: 2 },
                        }}
                        >
                        <Typography component="legend">Rating</Typography>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                            setValue(newValue);
                            }}
                        />
                        
                        <button onClick={onclick}>별점주기</button>
                    </Box>
                    <div>
                        <CocktailComment/>
                    </div>
                </>
               
                
                }
        </div>
    )
}

export default RecipeRead;