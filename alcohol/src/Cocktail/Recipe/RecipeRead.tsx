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
            
            for(let i = 0 ;i<res['cockJuice'].length; i++){
                if(parseInt(res['cockJuice'][i].amount)>1000){
                    res['cockJuice'][i].amount=res['cockJuice'][i].amount/100;
                    tempAmount=res['cockJuice'][i].amount;
                }
            }
            setAmount(tempAmount+"% 높이로 따라주세요");
            setRecipe(res);
            setLoading(false);
        })
    }

    useEffect(()=>{
        recipeFunc()
    },[])

    const onclick = () =>{
        console.log(recipe);
        console.log(amount);
    }
    const [value, setValue] = React.useState<number | null>(2);
    const [hover, setHover] = React.useState(-1);
    return (
        <div>
            {/*dsfadsjfkdasf
            https://mui.com/material-ui/react-rating/
            <Box
                sx={{
                    width: 200,
                    display: 'flex',
                    alignItems: 'center',
                }}
                >
                <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                    setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                    setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {value !== null && (
                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                )}
                </Box>*/}

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
                    
                </>
                    
                }
        </div>
    )
}

export default RecipeRead;