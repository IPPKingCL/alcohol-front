import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../Common/Cookies";
import { alcho } from "../interface/Alcho";
import { addr } from "../Common/serverAddr";
import AlchoComment from "./AlcoholInfoComment/AlchoComment";
import MainCard from '../ui-component/cards/MainCard';
import { styled } from '@mui/material/styles';
import { Box, Button, CssBaseline, Grid, Skeleton, SwipeableDrawer, Typography } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import { MarginRounded } from "@mui/icons-material";
import { Global } from "@emotion/react";


interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    windowT?: () => Window;
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
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#424242',
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



function AlcoholDetail(prop: any, props: Props) {

    const { windowT } = props;
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [alcoholData, setAlcoholData] = useState<alcho>();
    const [color, setColor] = useState<string>();
    const navigate = useNavigate();
    const detail = async () => {

        fetch(addr + '/alcohol/detail/' + id, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${getCookie('myToken')}`,
            }
        }).then((res) => res.json())
            .then((res) => {
                setAlcoholData(res);
                if (res.color == 'tp') {
                    setColor("Transparency(무색)")
                } else {
                    setColor(res.color);
                }
                setLoading(false);

            })
    }

    useEffect(() => {
        detail()
    }, []);

    const onclick = () => {
        window.history.go(-1);
    }

    const Recipe = () => {
        navigate('/cocktail/recipe/' + id + '&' + alcoholData?.category);
    }

    const container = windowT !== undefined ? () => windowT().document.body : undefined;

    return (
        <div>
            {loading ? <strong>loading...</strong> :
                <>
                    <Grid sx={{
                        marginBlock : '1rem',
                        marginLeft : '1rem',
                        marginRight : '1rem'
                    }}>
                        <CssBaseline />
                        <Global
                            styles={{
                                '.MuiDrawer-root > .MuiPaper-root': {
                                    height: `calc(50% - ${drawerBleeding}px)`,
                                    overflow: 'visible'
                                },
                            }}
                        />

                        <CardWrapper2 border={false} content={false}>
                            <Typography align='justify' paragraph variant="h3" sx={{
                                color: "dark",
                                marginBlock: "1rem",
                            }}>
                                Title
                            </Typography>
                        </CardWrapper2>
                        <hr/>
                        <Typography align='justify' paragraph variant="h3" sx={{
                                color: "dark",
                                marginBlock: "1rem",
                            }}>
                                {alcoholData?.name}
                            </Typography>
                        <CardWrapper2 border={false} content={false}>
                            <Typography align='justify' paragraph variant="h3" sx={{
                                color: "dark",
                                marginBlock: "1rem",
                            }}>
                                Detail
                            </Typography>
                        </CardWrapper2>
                        <hr />
                        <CardWrapper border={false} content={false}>
                            <Box sx={{ p: 2.25 }}>
                                <CardMedia
                                    component="img"
                                    height="400vh"
                                    width="400vh"
                                    image={alcoholData?.imgUrl}
                                    alt="Paella dish"
                                    sx={{
                                        objectFit: "fill",
                                        borderRadius: "20px"
                                    }}
                                />
                            </Box>
                            <Typography align='justify' sx={{
                                color: "yellow",
                                marginBlock: "1rem",
                                marginLeft: "2rem"
                            }}>
                                종류 : {alcoholData?.category}
                            </Typography>
                            <Typography align='justify' sx={{
                                color: "yellow",
                                marginBlock: "1rem",
                                marginLeft: "2rem"
                            }}>
                                당도 : {alcoholData?.sugar} (달수록 숫자가 높습니다)
                            </Typography>
                            <Typography align='justify' sx={{
                                color: "yellow",
                                marginBlock: "1rem",
                                marginLeft: "2rem"
                            }}>
                                색 : {color}
                            </Typography>
                            <Typography align='justify' sx={{
                                color: "yellow",
                                marginBlock: "1rem",
                                marginLeft: "2rem"
                            }}>
                                도수 : {alcoholData?.dosu}
                            </Typography>
                            <Typography align='justify' sx={{
                                color: "yellow",
                                marginBlock: "1rem",
                                marginLeft: "2rem"
                            }}>
                                가격 : {alcoholData?.price}원 (매장 별 가격 상이)
                            </Typography>
                        </CardWrapper>

                        <div className='input-btn'>
                            <button className="d-btn" onClick={onclick}>뒤로</button>
                            <button className="m-btn" onClick={Recipe}>칵테일 레시피</button>
                        </div>

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
                                <Puller />
                                <AlchoComment></AlchoComment>
                            </StyledBox>
                            <StyledBox
                                sx={{
                                    px: 2,
                                    pb: 2,
                                    height: '100%',
                                    overflow: 'auto',
                                }}
                            >
                                <Skeleton variant="rectangular" height="100%" />
                            </StyledBox>
                        </SwipeableDrawer>
                        <div>

                        </div>
                    </Grid>
                </>
            }
        </div >
    )

}

export default AlcoholDetail;