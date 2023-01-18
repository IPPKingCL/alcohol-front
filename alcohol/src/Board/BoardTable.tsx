import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Grid, IconButton, IconButtonProps, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { red } from '@mui/material/colors';
import CommentIcon from '@mui/icons-material/Comment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AnimateButtonT from "../ui-component/extended/AnimateButtonT";
import { addr } from "../Common/serverAddr";
import { getCookie } from "../Common/Cookies";
import { commentList } from "../interface/CommentList";
import { boardList } from "../interface/BoardList";
import { SummarycommentList } from "../interface/SummaryCommentList";

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
    const id = props.data.id;

    const [comment, setComment] = useState<SummarycommentList[]>([{
        contents: "",
        nickname: "",
        dateTime: ""
    }]);
    const boardDateTime = dateTime.getFullYear() + "-" + (dateTime.getMonth() + 1) + "-" + dateTime.getDate() + " " +
        dateTime.getHours().toString().padStart(2, '0') + ":" + dateTime.getMinutes().toString().padStart(2, '0') + ":" + dateTime.getSeconds().toString().padStart(2, '0');

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);

        fetch(addr + '/board/select/comment/' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie('myToken')}`,
            }
        }).then((res) => res.json())
            .then((res) => {
                let i: number = 0;
                setComment([]);

                for (i; i < res.length; i++) {
                    const tempDate: Date = new Date(res[i].dateTime);
                    const realDate: string = (tempDate.getFullYear() - 2000) + "-" + (tempDate.getMonth() + 1).toString().padStart(2, '0') + "-" + tempDate.getDate() + " " +
                        tempDate.getHours().toString().padStart(2, '0') + ":" + tempDate.getMinutes().toString().padStart(2, '0') + ":" + tempDate.getSeconds().toString().padStart(2, '0');
                    const data: SummarycommentList = {
                        contents: res[i].contents,
                        nickname: res[i].nickname,
                        dateTime: realDate
                    }
                    setComment(comment => [...comment, data]);
                }
            })
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
                    subheader={boardDateTime}
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
                    <IconButton aria-label="add to favorites">
                        <CommentIcon sx={{
                            color: "#00A4FF"
                        }} />
                    </IconButton>
                    <AnimateButtonT>
                        <Button
                            disableElevation
                            variant="outlined"
                            color="info"
                            onClick={handleExpandClick}
                            sx={{
                                marginLeft: "1rem"
                            }}>
                            <Typography align='center' sx={{
                                color: "black"
                            }}>Comment</Typography>
                        </Button>
                    </AnimateButtonT>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {comment.map((comm, i) => {
                            return (
                                <Card key={i} sx={{ maxWidth: 390, width: '100%' }} style={{ marginBlock: 20, backgroundColor: '#DAFFFE', color: 'maroon', position: 'relative' }}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={4}>
                                            <Typography paragraph sx={{
                                                marginBlock: '1rem',
                                                marginLeft: '1rem'
                                            }}>
                                                <span>작성자 : {comm.nickname}</span>
                                                <span style={{ float: "right", marginRight: "1rem" }}>{comm.dateTime}</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography paragraph sx={{
                                                marginBlock: '1rem',
                                                marginLeft: '1rem'
                                            }}>
                                                {comm.contents}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Card>
                            )
                        }
                        )}
                    </CardContent>
                    <Button
                        disableElevation
                        variant="outlined"
                        color="info"
                        onClick={onclick}
                        sx={{
                            marginBlock: "1rem",
                            marginLeft: "1rem"
                        }}>
                        <Typography align='center' sx={{
                            color: "black"
                        }}>댓글 바로 가기</Typography>
                    </Button>
                </Collapse>
            </Card>
        </div >


    );

}

export default BoardTable;