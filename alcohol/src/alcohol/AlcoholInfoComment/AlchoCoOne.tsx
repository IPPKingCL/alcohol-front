import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../Common/Cookies";
import { addr } from "../../Common/serverAddr";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { FilledInput } from "@material-ui/core";

function AlchoCoOne(prop:any){
    useEffect(()=>{
    },[]);
    const navigate = useNavigate();
    const onclick = async () => {
        
        fetch(addr + '/alcohol/delete',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${getCookie('myToken')}`,
            },
            body : JSON.stringify({
                id:prop.data.id,
                userId:prop.data.userId
            }),
        }).then((res)=>res.json())
        .then((res) => {
            if(res.success){
                alert('댓글이 삭제되었습니다');
                prop.onRemove(prop.data.id);
            }else{
                if(res.message=='Unauthorized'){
                    alert('로그인 후 이용 가능합니다')
                    navigate('/login');
                }else{
                    if(res.msg==='fail'||'no'){
                        alert('권한이 없습니다');
                        return;
                    }
                    alert("삭제 과정 중 에러발생 \n다시 시도해주세요");
                }
                
            }
        });
    }
    return(
        <div className="g">
            {prop.data.nickname} : <FilledInput multiline={true} value={prop.data.content}/><Tooltip title="Delete">
            <IconButton>
                <DeleteIcon onClick={onclick}/>
            </IconButton>
            </Tooltip>
            <hr></hr>
        </div>
    )
}

export default AlchoCoOne;