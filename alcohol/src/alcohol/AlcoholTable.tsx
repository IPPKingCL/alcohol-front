import { PresignedPost } from "aws-sdk/clients/s3";
import { useNavigate } from "react-router-dom";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useEffect, useState } from "react";
import { addr } from "../Common/serverAddr";
import { getCookie } from "../Common/Cookies";
import { Grid } from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


function AlcoholTable(prop: any) {
    const navigate = useNavigate();
    const [color, setColor] = useState<string>();

    useEffect(() => {
        if (prop.data.color === 'tp') {
            setColor("Transparency(무색)")
        } else {
            setColor(prop.data.color);
        }
    }, []);
    const onclick = () => {
        navigate('/alcohol/detail/' + prop.data.id);
    }

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const like = () => {
        fetch(addr + '/alcohol/like/' + prop.data.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ` + getCookie('myToken'),
            }
        }).then(res => res.json())
            .then((res) => {
                if (res.success) {
                    alert("추천완료")
                } else {
                    alert(res.msg);
                }
            })
    }

    const cocktail = () => {
        navigate('/cocktail/recipe/' + prop.data.id + '&' + prop.data.category);
    }

    const category = () => {
        navigate('/cocktail/recipe/&' + prop.data.category);
    }

    return (
        <div className="alchoWrapper" >
            <Grid style={{ display: 'flex', justifyContent: 'center' }}>
                <Card sx={{ maxWidth: 390, width: '100%' }} style={{ marginBlock: 20, backgroundColor: 'orange', color: 'maroon', position: 'relative' }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                <img className="alcoholImg" src={prop.data.imgUrl} />
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={prop.data.name}
                        subheader={prop.data.category}
                    />
                    <CardMedia
                        component="img"
                        height="400vh"
                        width="400vh"
                        image={prop.data.imgUrl}
                        alt="Paella dish"
                        onClick={onclick}
                        sx={{
                            objectFit: "fill"
                        }}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">

                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites" onClick={like}>
                            <FavoriteIcon />
                        </IconButton>
                        {/*<IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>*/}
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>{prop.data.name}</Typography>
                            <Typography paragraph>
                                종류 : {prop.data.category}
                            </Typography>
                            <Typography paragraph>
                                당도 : {prop.data.sugar} (달수록 숫자가 높습니다)
                            </Typography>
                            <Typography paragraph>
                                색 : {color}
                            </Typography>
                            <Typography paragraph>
                                도수 : {prop.data.dosu}
                            </Typography>
                            <Typography paragraph>
                                가격 : {prop.data.price}원 (판매점마다 가격이 다를 수 있습니다)
                            </Typography>
                            <Typography onClick={cocktail}>
                                <strong>{prop.data.name}을 이용한 레시피 보기</strong>
                            </Typography>
                            <Typography onClick={category}>
                                <strong>{prop.data.category}을 이용한 레시피 보기</strong>
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
            {/*<h2 className="board-title" >{}</h2>
            <span className="board-title">종류 : {}</span>
            <img className="alcoholImg" src={prop.data.imgUrl}/>*/}

        </div>
    )
}

export default AlcoholTable;