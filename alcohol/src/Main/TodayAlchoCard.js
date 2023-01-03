import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from '../ui-component/cards/MainCard';
import SkeletonEarningCard from '../ui-component/cards/Skeleton/EarningCard';

import Carousel from 'react-material-ui-carousel'


const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
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
        background: theme.palette.secondary[800],
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

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const TodayAlchoCard = ({ isLoading }) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    const items = [
        { src: "https://myhsproject.s3.ap-northeast-2.amazonaws.com/image_readmed_2017_354377_14958324642895797.jpeg" },
        { src: "https://myhsproject.s3.ap-northeast-2.amazonaws.com/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C+(2).jfif" },
        { src: "https://myhsproject.s3.ap-northeast-2.amazonaws.com/img+(1).jpg" },
        { src: "https://myhsproject.s3.ap-northeast-2.amazonaws.com/4135731d63daca9e71fb0f280fe4b25e697411015ec2429f3dca1514405d0137992d2ccc48bde4e3bf7632756e36ec340ef295ca1ccc3fa312a9f9f4db5c6c67382045e1bdc6e88267f288cf8d569457.jfif" },
    ];

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Typography align='center' paragraph variant='h4' sx={{
                                marginRight:"2rem",
                                color:"yellow"
                            }}>
                                오늘의 술
                            </Typography>
                            <Grid item>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Carousel autoPlay sx={{ width: "400px" }}>
                                            {
                                                items.map((item, i) => <img className="todayAlcho" src={item.src}></img>)
                                            }
                                        </Carousel>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

TodayAlchoCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TodayAlchoCard;
