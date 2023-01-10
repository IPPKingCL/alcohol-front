import { useNavigate } from "react-router"
import { styled, useTheme } from '@mui/material/styles';
import MainCard from '../ui-component/cards/MainCard';
import { Box, Grid, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

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
            <h2>술 정보</h2>
            <CardWrapper border={false} content={false}>
                <Box sx={{ p: 2.25 }}>
                    <Grid container direction="column">
                        <Typography align='center' paragraph variant='h6' sx={{
                            marginRight: "2rem",
                            color: "yellow"
                        }}>
                            다양한 술 정보와 칵테일 레시피
                        </Typography>
                    </Grid>
                    <Grid container alignItems="center">
                        <Grid item>
                            <img onClick={info} src="https://myhsproject.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20221231_173124605.jpg" />
                            <Typography align='center' paragraph variant='h6' sx={{
                                marginRight: "2rem",
                                color: "yellow"
                            }}>
                                다양한 술을 알아보자
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </CardWrapper>

            <hr></hr>
            <div>
                <img onClick={recipe} src="https://myhsproject.s3.ap-northeast-2.amazonaws.com/istockphoto-1302161390-612x612.jpg" />
                <strong>홈텐딩을 위한 칵테일 레시피</strong>
            </div>
        </>
    )
}

export default AlchoIndex;