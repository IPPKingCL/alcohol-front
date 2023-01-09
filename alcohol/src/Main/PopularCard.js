import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from '../ui-component/cards/MainCard';
import SkeletonPopularCard from '../ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from '../store/constant';
import RecommendIcon from '@mui/icons-material/Recommend';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { addr } from '../Common/serverAddr';
import { useNavigate } from 'react-router-dom';
import AnimateButton from '../ui-component/extended/AnimateButton';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
    const theme = useTheme();

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const [boardItems, setBoardItems] = useState([]);

    const console1 = () => {
        console.log(boardItems.length);
    }

    const fetchBoard = () => {
        fetch(addr + '/board/recommend/count', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => res.json())
            .then((res) => {
                console.log(res);
                setBoardItems([]);
                for (let i = 0; i < res.length; i++) {
                    const data = {
                        id: res[i].id,
                        title: res[i].title,
                        contents: res[i].contents,
                        nickname: res[i].nickname,
                        recommend: res[i].recommend
                    }
                    setBoardItems(boardItems => [...boardItems, data])
                }

            })
    }

    useEffect(() => {
        fetchBoard();
    }, [])

    const onClickNavigate = (id) => {
        navigate("/free/read/" + id);
    }

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4" onClick={console1}>인기 게시글 TOP 5</Typography>
                                    </Grid>
                                    <Grid item>
                                        <MoreHorizOutlinedIcon
                                            fontSize="small"
                                            sx={{
                                                color: theme.palette.primary[200],
                                                cursor: 'pointer'
                                            }}
                                            aria-controls="menu-popular-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        />
                                        <Menu
                                            id="menu-popular-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}> 하루 </MenuItem>
                                            <MenuItem onClick={handleClose}> 1주</MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                {boardItems.map((boardItems) => {
                                    return (
                                        <Grid key={boardItems.id} >
                                            <Divider sx={{ my: 1.5 }} />
                                            <Grid container direction="column" >
                                                <Grid item>
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid item>
                                                            <Typography variant="subtitle1" color="inherit">
                                                                {boardItems.title}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Grid container alignItems="center" justifyContent="space-between">
                                                                <Grid item>
                                                                    <Typography variant="subtitle1" color="inherit" sx={{
                                                                        marginRight: '1rem',
                                                                        color: 'blue'
                                                                    }}>
                                                                        {boardItems.nickname}
                                                                    </Typography>
                                                                </Grid>
                                                                <RecommendIcon />
                                                                <Grid item>
                                                                    <Avatar
                                                                        variant="rounded"
                                                                        sx={{
                                                                            width: 24,
                                                                            height: 24,
                                                                            borderRadius: '5px',
                                                                            backgroundColor: theme.palette.success.light,
                                                                            color: theme.palette.success.dark,
                                                                            ml: 2
                                                                        }}
                                                                    >
                                                                        {boardItems.recommend}
                                                                    </Avatar>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                                                        {boardItems.contents}
                                                    </Typography>
                                                    <AnimateButton>
                                                        <Button
                                                            disableElevation                           
                                                            fullWidth
                                                            size="large"
                                                            type="submit"
                                                            variant="contained"
                                                            color="secondary"
                                                            onClick={onClickNavigate}>게시글 바로가기</Button>
                                                    </AnimateButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    );

                                })}
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )
            }
        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;
