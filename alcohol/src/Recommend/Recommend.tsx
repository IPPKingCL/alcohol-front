import { useNavigate } from "react-router-dom"
import { styled, useTheme } from '@mui/material/styles';
import MainCard from '../ui-component/cards/MainCard';
import { Box, Button, Grid, Typography } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import AnimateButtonT from "../ui-component/extended/AnimateButtonT";


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


const Recommend = () => {
    const navigate = useNavigate();
    const onclick = () =>{
        navigate('/recommend/cocktail')
    }
    return (
       <>
        <CardWrapper border={false} content={false}>
                <Box>
                    <Grid container direction="column">
                        <Typography align='center' paragraph variant='h4' sx={{
                            marginTop: "1rem",
                            color: "yellow"
                        }}>
                            나에게 맞는 칵테일 추천
                        </Typography>
                    </Grid>
                </Box>
                <Box>
                    <Grid container direction="column">
                        <Typography align='center' paragraph variant='h6' sx={{                            
                            color: "yellow"
                        }}>
                            별점을 주면 정확도가 올라가요
                        </Typography>
                    </Grid>
                </Box>
            </CardWrapper>

            <hr/>

            <CardWrapper border={false} content={false} onClick={onclick}>
                <Box sx={{ p: 2.25 }}>
                    <Grid container alignItems="center">
                        <Grid item>
                            <CardMedia
                                component="img"
                                height="400vh"
                                width="400vh"
                                image="https://alcoholcocktail.s3.ap-northeast-2.amazonaws.com/85119_152985_302.webp"
                                alt="Paella dish"
                                sx={{
                                    objectFit: "fill",
                                    borderRadius: "20px"                                    
                                }}
                            />
                            <AnimateButtonT>
                                <Button
                                    disableElevation
                                    fullWidth
                                    size="medium"
                                    type="submit"
                                    variant="contained"
                                    color="warning"
                                    onClick={onclick}
                                    sx={{
                                        float: 'center',
                                        marginTop: '1rem'                       
                                    }}>
                                    <Typography align='center' sx={{
                                        color: "yellow"
                                    }}>
                                        추천 받으러 가기
                                    </Typography>
                                </Button>
                            </AnimateButtonT>
                        </Grid>
                    </Grid>
                </Box>
            </CardWrapper>
            <hr/>
            <CardWrapper border={false} content={false} onClick={onclick}>
                <Box sx={{ p: 2.25 }}>
                    <Grid container alignItems="center">
                        <Grid item>
                            <CardMedia
                                component="img"
                                height="400vh"
                                width="400vh"
                                image="https://alcoholcocktail.s3.ap-northeast-2.amazonaws.com/images.jfif"
                                alt="Paella dish"
                                sx={{
                                    objectFit: "fill",
                                    borderRadius: "20px"                                    
                                }}
                            />
                            <AnimateButtonT>
                                <Button
                                    disableElevation
                                    fullWidth
                                    size="medium"
                                    type="submit"
                                    variant="contained"
                                    color="warning"
                                    onClick={onclick}
                                    sx={{
                                        float: 'center',
                                        marginTop: '1rem'                       
                                    }}>
                                    <Typography align='center' sx={{
                                        color: "yellow"
                                    }}>
                                        함께 술 마시기
                                    </Typography>
                                </Button>
                            </AnimateButtonT>
                        </Grid>
                    </Grid>
                </Box>
            </CardWrapper>
       </>
    )
}

export default Recommend