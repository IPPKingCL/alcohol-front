import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import MainCard from '../ui-component/cards/MainCard';
import SkeletonEarningCard from '../ui-component/cards/Skeleton/EarningCard';

import Carousel from 'react-material-ui-carousel'
import { addr } from '../Common/serverAddr';

import AlchoImg from './AlchoImg';


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

    
    const [image, setImage] = useState([]);


    const items = [];

    const fetchImage = () => {
        fetch(addr + '/cocktail/rating/day', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json())
            .then((res) => {
                console.log(res);
                setImage([]);
                for (let i = 0; i < res.length; i++) {
                    const data = {
                        cocktailId: res[i].cocktailId,
                        cnt: res[i].cnt,
                        imgUrl: res[i].imgUrl,
                        name: res[i].name                        
                    }
                    items.push({id : data.cocktailId, src : data.imgUrl});
                    setImage(image => [...image, data])
                }
            })
    }

    useEffect(() => {
        fetchImage();
    }, [])


  

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false} onClick={() => {console.log(image)}}>
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
                                                image.map((img, i) => {
                                                    return <Grid key={i}><AlchoImg key={i} img={img.imgUrl} i={img.cocktailId} /></Grid>;
                                                })
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
