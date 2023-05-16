import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CockSkeleton from "../../../Common/CockSkeleton";
import { getCookie } from "../../../Common/Cookies";
import { addr } from "../../../Common/serverAddr";
import { commentList } from "../../../interface/CommentList";
import CocktailCoList from "./CocktailCoList";
import { useLocation } from "react-router-dom";

const CocktailComment = (prop:any) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [content, setContent] = useState<string>();
    const [comment, setComment] = useState<commentList[]>([]);
    const {id} = useParams();
    const [commentNum,setCommentNum] = useState<number>();
    const navigate = useNavigate();
    const param = useLocation();
    const selfRecipeFlag = prop.url;
    
    const commentList = async () => {
        const endPoint = selfRecipeFlag === 'recipe' ? '/cocktail/comment/all/' : '/selfcocktail/comment/all/';

        fetch(addr+endPoint+id,{
            method:"GET",
            headers:{
                "Content-Type" : "application/json",
            }
        }).then((res)=>res.json())
        .then((res) => {
            let i:number = 0;
            setCommentNum(res.length);
            for(i;i<res.length;i++){
                const data:commentList = {
                    id:res[i].id,
                    contents:res[i].contents,
                    dateTime:res[i].dateTime,
                    nickname:res[i].nickname,
                    isDeleted:res[i].isDeleted,
                    //isModified:res[i].isModified,
                    userId:res[i].user.id
                }
                setComment(comment => [...comment,data])
            }
            setLoading(false);
        })
    }

    useEffect(() => {
        commentList();
    },[]);

    const onRemove = (id:number) => {
        setComment([]);
        commentList();
    }
    const onchange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }

    const onclick = async () => {
        const endPoint = selfRecipeFlag === 'recipe' ? '/cocktail/comment/insert' : '/selfcocktail/comment/insert';
        fetch(addr+endPoint,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
                "Authorization":`Bearer ${getCookie('myToken')}`,
            },
            body : JSON.stringify({
                contents : content,
                boardId : id
            }),
        }).then((res) => res.json())
        .then((res) => {
            if(res.success){
                
                setContent('');
                setLoading(true);
                setComment([]);
                commentList();
            }else{
                if(res.message=='Unauthorized'){
                    alert('로그인 후 이용 가능합니다')
                    navigate('/login');
                }else{
                    alert("등록 실패");
                }
                
            }
        })
    }
    return (
        <div id='wrapper'>
            <div style={{marginBlock : '1.4rem'}}>
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
            {loading ? <CockSkeleton/> :
                <div style={{overflow : 'scroll'}}>
                    <CocktailCoList
                        datas={comment}
                        onRemove={onRemove}
                        url={selfRecipeFlag}
                    />
                </div>
            }           

        </div>
        
    )
}

export default CocktailComment;