import { useEffect, useState,  } from "react";
import { useParams } from "react-router";
import { addr } from "../../Common/serverAddr";
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import StarIcon from '@mui/icons-material/Star';
import { Cock } from "../../interface/cocktail/Cock";
import CockJuice from "../Recipe/RecipeDetail/CockJuice";
import CockAlcho from "../Recipe/RecipeDetail/CockAlcho";
import CocktailComment from "../Recipe/RecipeComment/CocktailComment";
import { getCookie } from "../../Common/Cookies";
import { Button, Typography, styled, CardMedia, SwipeableDrawer, Grid, CssBaseline } from "@mui/material";
import MainCard from '../../ui-component/cards/MainCard';
import { Global } from "@emotion/react";
import { useNavigate } from 'react-router-dom';

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    windowT?: () => Window;
}

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




const CardWrapper: any = styled(MainCard)(({ theme }: any) => ({
    backgroundColor: theme.palette.secondary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary,
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary,
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

const CardWrapper2: any = styled(MainCard)(({ theme }: any) => ({
    backgroundColor: theme.palette.warning.light,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    width: 'auto',
    '&:after': {
        content: '""',
        position: 'relative',
        width: 210,
        height: 210,
        background: theme.palette.secondary,
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary,
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '	#99cc33' : '#424242',
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? '#424242' : '#212121',
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

const drawerBleeding = 56;

const SelfCockRecipeRead = (props: Props) => {
    const { windowT } = props;

    const { id } = useParams();
    const [recipe, setRecipe] = useState<Cock>();
    const [loading, setLoading] = useState<boolean>(true);
    const [amount, setAmount] = useState<string>();
    let ratingCheck:boolean = false;
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const container = windowT !== undefined ? () => windowT().document.body : undefined;

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    let tempAmount = '';
    const recipeFunc = async () => {
        fetch(addr + '/cocktail/' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => res.json())
            .then((res) => {
                console.log(res['cockAlcho'].only);
                if (res['cockAlcho'][0].only) {
                    res['cocktail'].only = '해당 술만 사용할 수 있는 칵테일입니다'
                } else {
                    res['cocktail'].only = '같은 종류의 술을 대체하여 사용할 수 있는 칵테일입니다.'
                }

                setRecipe(res);
                setLoading(false);
            })
    }

    useEffect(() => {
        recipeFunc()
    }, [])

    const onclick = () => {
        const urlEndPoint :string = ratingCheck ? '/cocktail/ratingAgain':'/cocktail/rating'; 
        console.log(ratingCheck)
        fetch(addr + urlEndPoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie('myToken')}`,
            },
            body: JSON.stringify({
                cocktailId: id,
                rating: value
            })
        }).then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    alert('평가되었습니다');
                } else {
                    if(res.msg==='already'){
                        const message = '이미 평가하신 칵테일입니다. 다시 평가하시겠습니까?'
               
                        if(window.confirm(message)){
                            ratingCheck = true;
                            onclick();
                        }else{

                        }
                    }else if(res.message==='Unauthorized'){
                        alert('로그인이 필요한 서비스입니다')
                        navigate('/login');
                    }
                    else{
                        alert(res.msg);

                    }
                }
            })
    }

    
    const [value, setValue] = React.useState<number | null>(2);
    const [hover, setHover] = React.useState(-1);

    const back = () => {
        window.history.go(-1);
    }
    return (
        <div>
            {loading ? <strong>loading...</strong> :
                <>
                    <CssBaseline />
                    <Global
                        styles={{
                            '.MuiDrawer-root > .MuiPaper-root': {
                                height: `calc(50% - ${drawerBleeding}px)`,
                                overflow: 'visible'
                            },
                        }}
                    />
                    <CardWrapper2 border={false} content={false} sx={{
                        marginBottom: "1rem"
                    }}>
                        <Typography align='center'
                            paragraph variant="h4" sx={{
                                color: "dark",
                                marginBlock: "1rem"
                            }}>{recipe?.cocktail.name}</Typography>
                        <hr />
                        <Typography align='center'
                            paragraph variant="h6" sx={{
                                color: "dark",
                                marginBlock: "1rem"
                            }}>도수 : {recipe?.cocktail.dosu}도</Typography>
                        <Typography align='center'
                            paragraph variant="h6" sx={{
                                color: "dark",
                                marginBlock: "1rem"
                            }}>이 칵테일은 {recipe?.cocktail.only}</Typography>
                    </CardWrapper2>
                    <CardWrapper border={false} content={false}>
                        <Box sx={{ p: 2.25 }}>
                            <CardMedia
                                component="img"
                                height="400"
                                image={recipe?.cocktail.imgUrl}
                                alt="Paella dish"
                                sx={{
                                    objectFit: "fill",
                                }}
                            />
                        </Box>
                    </CardWrapper>
                    <hr></hr>
                    <CardWrapper2 border={false} content={false} sx={{
                        marginBottom: "1rem"
                    }}>
                        <Typography align='center'
                            paragraph variant="h6" sx={{
                                color: "dark",
                                marginBlock: "1rem"
                            }}>레시피</Typography>
                    </CardWrapper2>
                    <CardWrapper border={false} content={false} sx={{
                        marginBottom: "1rem",
                    }}>
                        <Box sx={{ p: 2.25 }}>
                            <CockAlcho datas={recipe?.cockAlcho} />
                        </Box>
                    </CardWrapper>
                    <CardWrapper border={false} content={false} sx={{
                        marginBottom: "1rem",
                    }}>
                        <Box sx={{ p: 2.25 }}>
                            <CockJuice datas={recipe?.cockJuice} />
                        </Box>
                    </CardWrapper>
                    <Box
                        sx={{
                            '& > legend': { mt: 2 },
                        }}
                    >
                        <CardWrapper border={false} content={false}>
                            <Typography align='center'
                                paragraph variant="h4" sx={{
                                    color: "dark",
                                    marginBlock: "1rem"
                                }}>별점</Typography>
                        </CardWrapper>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />

                        <Button
                            disableElevation
                            size="large"
                            type="submit"
                            variant="contained"
                            color="warning"
                            onClick={onclick}
                            sx={{
                                marginBlock: "1rem",
                                marginLeft: "5rem"
                            }}>별점주기</Button>
                    </Box>
                    <Button
                        disableElevation
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="warning"
                        onClick={back}
                        sx={{
                            marginBlock: "1rem"
                        }}>뒤로
                    </Button>
                    <Grid>
                        <SwipeableDrawer
                            container={container}
                            anchor="bottom"
                            open={open}
                            onClose={toggleDrawer(false)}
                            onOpen={toggleDrawer(true)}
                            swipeAreaWidth={drawerBleeding}
                            disableSwipeToOpen={false}
                            ModalProps={{
                                keepMounted: true,
                            }}
                        >
                            <StyledBox
                                sx={{
                                    position: 'absolute',
                                    top: -drawerBleeding,
                                    borderTopLeftRadius: 8,
                                    borderTopRightRadius: 8,
                                    visibility: 'visible',
                                    right: 0,
                                    left: 0
                                }}
                            >
                                <Puller sx={{
                                    backgroundColor: "warning"
                                }} />
                                <CocktailComment />
                            </StyledBox>
                        </SwipeableDrawer>
                    </Grid>
                </>


            }
        </div>
    )
}


export default SelfCockRecipeRead