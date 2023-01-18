import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, IconButtonProps, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { red } from '@mui/material/colors';
import CommentIcon from '@mui/icons-material/Comment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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

function BoardTable(props: any) {
    const navigate = useNavigate();

    const dateTime: Date = new Date(props.data.dateTime);

    const boardDateTime = dateTime.getFullYear() + "-" + (dateTime.getMonth() + 1) + "-" + dateTime.getDate() + " " +
        dateTime.getHours().toString().padStart(2, '0') + ":" + dateTime.getMinutes().toString().padStart(2, '0') + ":" + dateTime.getSeconds().toString().padStart(2, '0');

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const onclick = () => {
        const id = props.data.id;
        const path = '/free/read/' + id;
        navigate(path);
    }

    return (

        <div>
            <Card sx={{ maxWidth: 390, width: '100%' }} style={{ marginBlock: 20, backgroundColor: '#FFFFB6', color: 'maroon', position: 'relative' }}>
                <CardHeader
                    avatar={
                        <Avatar src={props.data.imgurl} aria-label="recipe" />
                    }
                    title={props.data.title + " ------- " + props.data.nickname}
                    subheader={props.data.dateTime}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary" sx={{
                    }}>
                        {props.data.contents}
                    </Typography>
                    <Button
                        disableElevation
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="warning"
                        onClick={onclick}
                        sx={{
                            marginBlock: "1rem"
                        }}>게시글 바로가기</Button>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        {props.data.userId === null ? <FavoriteIcon /> : <FavoriteIcon sx={{ color: "red" }} />}
                    </IconButton>
                    <IconButton aria-label="add to favorites"
                        onClick={handleExpandClick}>
                        <CommentIcon />
                        <Typography align='center' sx={{
                            color: "black",
                            marginLeft: "1rem"
                        }}>
                            Comment
                        </Typography>
                    </IconButton>

                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            댓글 박스
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>


    );

}

export default BoardTable;