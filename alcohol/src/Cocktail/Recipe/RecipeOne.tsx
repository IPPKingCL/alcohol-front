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

import { Grid } from "@mui/material";
import { RecipeList } from "../../interface/RecipeList";
import { addr } from "../../Common/serverAddr";
import { getCookie } from "../../Common/Cookies";


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


const RecipeOne = (prop: any) => {
    console.log(prop.data)
    const [recipeList, setRecipeList] = useState<RecipeList>();
    useEffect(() => {
        setRecipeList(prop.data);
    }, [])
    const navigate = useNavigate();

    const onclick = () => {

    }

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const favorite = () => {
        fetch(addr + '/cocktail/likeOne/' + prop.data.id, {
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

    

    const recipeOne = () => {
        navigate('/cocktail/recipeRead/' + prop.data.id);
    }

    return (
        <div className="alchoWrapper" >
            <Grid style={{ display: 'flex', justifyContent: 'center' }}>
                <Card sx={{ maxWidth: 390, width: '100%' }} style={{ marginBlock: 20, backgroundColor: 'orange', color: 'maroon', position: 'relative' }} >
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                <img className="alcoholImg" src={recipeList?.imgUrl || ''} />
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={recipeList?.name}
                        subheader={recipeList?.likeOne + ' 평가'}
                    />
                    <CardMedia
                        onClick={recipeOne}
                        component="img"
                        height="400"
                        image={recipeList?.imgUrl}
                        alt="Paella dish"
                        sx={{
                            objectFit: "fill",
                        }}

                    />
                    <CardContent>
                        {/*<Typography variant="body2" color="text.secondary">

                    </Typography>*/}
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites" onClick={favorite}>
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
                            <Typography paragraph onClick={recipeOne}>
                                레시피 보러가기
                            </Typography>
                            {/*<Typography >
                                <strong>{prop.data.name}을 이용한 레시피 보기</strong>
                </Typography>*/}
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
        </div>
    )
}

export default RecipeOne;