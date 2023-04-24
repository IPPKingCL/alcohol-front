import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import {AddFaceChat} from '../interface/AddFaceChat'

const AddFaceChatPage = () => {
    
    const [addFaceChat, setAddFaceChat] = useState<AddFaceChat>({
        roomName:'',
        detailComment:'',
        category:''
    });

    const onchange = () => {

    }

    return (
        <div style={{width:'90%',textAlign:'center'}}>
            <h2>Let's Drink Together!!</h2>
            <TextField
                id="outlined-multiline-flexible-title"
                label="방 이름"
                name='roomName'
                multiline
                maxRows={2}
                autoFocus
                fullWidth
                inputProps={{ maxLength: 39 }}
                onChange={onchange}
                style={{marginLeft:'1rem'}}
            />

            <TextField
                id="outlined-multiline-flexible-title"
                label="디테일"
                name='detailComment'
                multiline
                maxRows={2}
                autoFocus
                fullWidth
                inputProps={{ maxLength: 39 }}
                onChange={onchange}
                style={{marginLeft:'1rem',marginTop:'1rem'}}
            />
           
           <select name="alchoCategory" id="selectBoard" onChange={onchange}>
                <option>카테고리 선택</option>
                <option value="F">자유게시판</option>
                <option value="A">술 관련 게시판</option>
                <option value="R">레시피 게시판</option>
            </select>

        </div>
    );
}

export default AddFaceChatPage;