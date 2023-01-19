import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { commentList } from '../interface/CommentList';
import { addr } from '../Common/serverAddr';
import CommentList from './CommentList';
import '../css/footer.css';
import { getCookie } from '../Common/Cookies';
import { Button, Card, TextField } from '@mui/material';

function Comment() {
    const [loading, setLoading] = useState<boolean>(true);
    const [content, setContent] = useState<string>();
    const { id } = useParams();
    const [comment, setComment] = useState<commentList[]>([]);
    const [commentNum, setCommentNum] = useState<number>();
    const navigate = useNavigate();

    const commentList = async () => {
        fetch(addr + '/board/comment/' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => res.json())
            .then((res) => {
                let i: number = 0;
                setCommentNum(res.length);
                for (i; i < res.length; i++) {
                    const data: commentList = {
                        id: res[i].id,
                        contents: res[i].contents,
                        dateTime: res[i].dateTime,
                        nickname: res[i].nickname,
                        isDeleted: res[i].isDeleted,
                        //isModified:res[i].isModified,
                        userId: res[i].user.id
                    }
                    setComment(comment => [...comment, data])
                }
                setLoading(false);
            })
    }

    useEffect(() => {
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
        fetch(addr + '/board/insertComment', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie('myToken')}`,
            },
            body: JSON.stringify({
                contents: content,
                boardId: id
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
        <div id='wrapper'>
            <Card sx={{ maxWidth: 390, width: '100%' }} style={{ marginBlock: 20, backgroundColor: '#FFFFB6', color: 'maroon', position: 'relative' }}>
                <span style={{marginLeft:'1rem', marginTop:'1rem'}}>댓글 {commentNum}</span>
                <div className="comment-box">
                    <TextField
                        id="outlined-multiline-flexible"
                        label="댓글쓰기"
                        multiline
                        maxRows={4}
                        onChange={onchange}                        
                        value={content || ''}
                        sx={{
                            marginLeft:'1rem'
                        }}
                    />
                    <Button
                        disableElevation
                        size="large"
                        type="submit"
                        variant="contained"
                        color="warning"
                        onClick={onclick}
                        sx={{
                            marginLeft: "1rem",
                            width:'30%',
                            height:'6.5vh'
                        }}>등록</Button>
                </div>
            </Card>
            <Card sx={{ maxWidth: 390, width: '100%' }} style={{ marginBlock: 20, backgroundColor: '#FFFFB6', color: 'maroon', position: 'relative' }}>
                {loading ? <strong>loading...</strong> :
                    <div>
                        <CommentList
                            datas={comment}
                            onRemove={onRemove}
                        />
                    </div>
                }
            </Card>

        </div>

    )
}

export default Comment;