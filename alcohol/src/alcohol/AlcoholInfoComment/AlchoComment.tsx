import { defaultListboxReducer } from "@mui/base"
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../../Common/Cookies";
import { addr } from "../../Common/serverAddr";
import { alchoComment } from "../../interface/AlchoComment";
import { commentList } from "../../interface/CommentList";
import AlchoCoList from "./AlchoCoList";


function AlchoComment() {
    const [loading, setLoading] = useState<boolean>(true);
    const [content, setContent] = useState<string>();
    const { id } = useParams();
    const [comment, setComment] = useState<alchoComment[]>([]);
    const [commentNum, setCommentNum] = useState<number>();
    const navigate = useNavigate();

    const commentList = async () => {
        fetch(addr + '/alcohol/commentAll/' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => res.json())
            .then((res) => {
                let i: number = 0;
                setCommentNum(res.length);
                for (i; i < res.length; i++) {
                    const data: alchoComment = {
                        id: res[i].id,
                        content: res[i].content,
                        dateTime: res[i].dateTime,
                        nickname: res[i].nickname,
                        userId: res[i].user.id
                    }
                    setComment(comment => [...comment, data])
                }
                setLoading(false);
            })
    }

    useEffect(() => {
        setComment([]);
        commentList();
    }, []);

    const onRemove = (id: number) => {
        //setComment(comment.filter(comment => comment.id !== id));
        setComment([]);
        commentList();
    }
    const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }

    const onclick = async () => {
        fetch(addr + '/alcohol/insertComment', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie('myToken')}`,
            },
            body: JSON.stringify({
                content: content,
                alchoId: id
            }),
        }).then((res) => res.json())
            .then((res) => {
                if (res.success) {

                    setContent('');
                    setLoading(true);
                    setComment([]);
                    commentList();
                } else {
                    if (res.message == 'Unauthorized') {
                        alert('로그인 후 이용 가능합니다')
                        navigate('/login');
                    } else {
                        alert("등록 실패");
                    }

                }
            })
    }


    return (
        <div id='wrapper' style={{ overflow: "scroll" }}>
            <div style={{ marginBlock: '1.4rem' }}>
                <span>댓글 {commentNum}</span>
                <hr></hr>
            </div>
            <Box sx={{ p: 2.25 }}>
                <TextField
                    type="string"
                    fullWidth
                    id="outlined-basic"
                    label="댓글 입력"
                    multiline={true}
                    variant="standard"
                    value={content || ''}
                    onChange={onchange}
                    inputProps={{ maxLength: 50 }}
                />
                <Button
                    disableElevation
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="warning"
                    onClick={onclick}
                    sx={{
                        marginBlock: "1rem",
                    }}>등록</Button>
            </Box>
            <hr></hr>
            {loading ? <strong>loading...</strong> :
                <div style={{ overflow: 'scroll' }}>
                    <AlchoCoList
                        datas={comment}
                        onRemove={onRemove}
                    />
                </div>
            }

        </div>

    )
}

export default AlchoComment;