import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { boardRead } from '../interface/Board';
import { addr } from '../Common/serverAddr';
import Comment from './Comment';
import '../css/board.css';
import { getCookie } from '../Common/Cookies';
import { Avatar, Typography, Card, CardHeader, CardContent, Button, Grid, CardMedia } from '@mui/material';

function FreeRead() {
    const [loading, setLoading] = useState<boolean>(true);
    const [board, setBoard] = useState<boardRead>();
    const { id } = useParams();

    const navigate = useNavigate();

    const list = async () => {

        fetch(addr + '/board/read/' + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => res.json())
            .then((res) => {
                setBoard(res);

            })

        setLoading(false);
    }

    useEffect(() => {
        list();
    }, [])
    const onclick = () => {
        fetch(addr + '/board/check', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie('myToken')}`,
            },
        }).then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    navigate('/free/modify/' + id);
                } else {
                    if (res.message == "Unauthorized") {
                        alert('로그인 후 사용가능합니다');
                        navigate('/login');
                    } else {
                        alert('에러 발생 잠시 후 시도해주세요');
                    }
                }
            })

    }

    const boardList = () => {
        navigate('/free');
    }

    const recommend = () => {
        fetch(addr + '/board/recommendBoard/' + id, {
            method: "Get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie('myToken')}`,
            }
        }).then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    alert(res.msg);
                } else {
                    if (res.message == 'Unauthorized') {
                        alert('로그인 후 이용 가능합니다')
                        navigate('/login');
                    } else {
                        alert("게시글 추천 도중 에러 발생");
                    }

                }
            })
    }

    const deleteBoard = () => {
        const message = "게시글을 삭제하시겠습니까";
        if (window.confirm(message)) {
            //세션 비교해서 삭제 권한 있는지 확인하는 작업 필요
            fetch(addr + "/board/deleteBoard/", {
                method: "Post",
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:5000",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('myToken')}`,
                },
                body: JSON.stringify({
                    id: id,
                    userId: board?.userId,

                }),
            }).then((res) => res.json())
                .then((res) => {
                    if (res.success) {
                        alert("삭제되었습니다");
                        navigate("/free");
                    } else {
                        if (res.message == 'Unauthorized') {
                            alert('로그인 후 이용 가능합니다')
                            navigate('/login');
                        } else {
                            alert("삭제 도중 에러발생 \n다시 시도해주세요");
                            return;
                        }
                    }
                })
        } else {
            return;
        }
    }
    return (
        <div>
            <Card style={{ marginBlock: 20, backgroundColor: '#FFFFB6', color: 'maroon', position: 'relative' }}>
                <h2 style={{ textAlign: 'center' }}>&nbsp;&nbsp;게시판</h2>
            </Card>
            {loading ? <strong>loading...</strong> :
                <div>
                    <Card style={{ marginBlock: 20, backgroundColor: '#FFFFB6', color: 'maroon', position: 'relative' }}>
                        <CardHeader
                            title={<Typography sx = {{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                width: '10rem'
                            }}>
                                <span style={{float: "inherit", fontSize: "20px", color: "#FFFFB6" }}>{board?.title || ''}</span><span style={{ float: "right", fontSize: "20px", color: "blue" }}>{board?.nickname}</span>
                            </Typography>}
                            subheader={<Typography><span>{board?.dateTime}</span></Typography>}
                        />
                        <CardContent>
                            <Typography variant="h6" color="text.secondary" sx={{
                            }}>
                                {board?.contents || ''}
                                {board?.imgUrl != "" ?
                                <CardMedia
                                    component="img"
                                    image={board?.imgUrl}
                                /> : ""
                                }
                            </Typography>
                        </CardContent>
                    </Card>
                    <Grid container spacing={4} sx={{
                        marginBottom: '1rem'
                    }}>
                        <Grid item xs={3}>
                            <Button
                                disableElevation
                                fullWidth
                                size="medium"
                                type="submit"
                                variant="contained"
                                color="warning"
                                onClick={boardList}>목록</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                disableElevation
                                fullWidth
                                size="medium"
                                type="submit"
                                variant="contained"
                                color="warning"
                                onClick={onclick}>수정</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                disableElevation
                                fullWidth
                                size="medium"
                                type="submit"
                                variant="contained"
                                color="warning"
                                onClick={deleteBoard}>삭제</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                disableElevation
                                fullWidth
                                size="medium"
                                type="submit"
                                variant="contained"
                                color="warning"
                                onClick={recommend}>추천</Button>
                        </Grid>
                    </Grid>
                    <div>
                        <Comment />
                    </div>
                </div>
            }
        </div >
    )

}

export default FreeRead;