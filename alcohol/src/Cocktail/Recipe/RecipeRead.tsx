import { useEffect,useState } from "react";
import { useParams } from "react-router";
import { addr } from "../../Common/serverAddr";
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import StarIcon from '@mui/icons-material/Star';

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
    const [recipe,setRecipe] = useState();
    const recipeFunc = async () => {
        fetch(addr+'/cocktail/'+id,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res)=>res.json())
        .then((res)=>{
            console.log(res);
        })
    }

    useEffect(()=>{
        recipeFunc()
    },[])

    const [value, setValue] = React.useState<number | null>(2);
    const [hover, setHover] = React.useState(-1);
    return (
        <div>
            dsfadsjfkdasf
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
                </Box>
        </div>
    )
}

export default RecipeRead;