import { useNavigate } from "react-router"
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


const AlchoIndex = () => {
    const navigate = useNavigate();
    const info = () => {
        navigate('/alcohol/info');
    }

    const recipe = () => {
        navigate('/cocktail/recipe/all')
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
                            술 정보
                        </Typography>
                    </Grid>
                </Box>
                <Box>
                    <Grid container direction="column">
                        <Typography align='center' paragraph variant='h6' sx={{                            
                            color: "yellow"
                        }}>
                            다양한 술 정보와 칵테일 레시피
                        </Typography>
                    </Grid>
                </Box>
            </CardWrapper>
            <hr />
            <CardWrapper border={false} content={false}>
                <Box sx={{ p: 2.25 }}>
                    <Grid container alignItems="center">
                        <Grid item>
                            <CardMedia
                                component="img"
                                height="400vh"
                                width="400vh"
                                image="https://myhsproject.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20221231_173124605.jpg"
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
                                    onClick={info}
                                    sx={{
                                        float: 'center',
                                        marginTop: '1rem'                       
                                    }}>
                                    <Typography align='center' sx={{
                                        color: "yellow"
                                    }}>
                                        다양한 술 알아보기
                                    </Typography>
                                </Button>
                            </AnimateButtonT>
                        </Grid>
                    </Grid>
                </Box>
            </CardWrapper>

            <hr />

            <CardWrapper border={false} content={false}>
                <Box sx={{ p: 2.25 }}>
                    <Grid container alignItems="center">
                        <Grid item>
                            <CardMedia
                                component="img"
                                height="400vh"
                                width="400vh"
                                image="https://myhsproject.s3.ap-northeast-2.amazonaws.com/istockphoto-1302161390-612x612.jpg"
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
                                    onClick={recipe}
                                    sx={{
                                        float: 'center',
                                        marginTop: '1rem'
                                    }}>
                                    <Typography align='center' sx={{
                                        color: "yellow"
                                    }}>
                                        홈텐딩을 위한 칵테일 레시피
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

export default AlchoIndex;