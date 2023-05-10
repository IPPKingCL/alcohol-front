import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {AddFaceChat} from '../interface/AddFaceChat'
import AlcoholSearch from "../alcohol/AlcoholSearch/AlcoholSearch";
import { AlchoCategory } from "../interface/AlchoCategory";
import AlcoholSearchOption from "../alcohol/AlcoholSearch/AlcoholSearchOption";
import { addr } from "../Common/serverAddr";
import { Button } from "primereact/button";

const AddFaceChatPage = () => {
    
    const [addFaceChat, setAddFaceChat] = useState<AddFaceChat>({
        roomName:'',
        detailComment:'',
        category:''
    });

    let category = '';

    const onchange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        category = e.target.value;    
    }

    const [option,setOption] = useState<AlchoCategory[]>([]);
    const [loading,setLoading] = useState<boolean>(true);

    const getRoomInfo = (e: React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement|any>) => {//타입 수정 예정
        const {name,value} = e.target;
        setAddFaceChat({
            ...addFaceChat,
            [name] : value
        })
    }

    const list = async () => {
        setOption([]);
        fetch(addr+'/alcohol/category',{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            }
        }).then((res)=>res.json())
        .then((res)=>{
            setOption(res);
            
        })
        setLoading(false);
    }

    useEffect(()=>{
        list();
    },[]);

    const AddRoom = () => {
        console.log(addFaceChat);

        // fetch(addr + '/face-chat/addFaceChat'),{
        //     method:"POST",
        //     headers: {
        //         "Content-Type": "application/json",

        //     },
        //     body:

        // }
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
                onChange={getRoomInfo}
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
                onChange={getRoomInfo}
                style={{marginLeft:'1rem',marginTop:'1rem'}}
            />
           
           
            <>
                    <select id="selectBoard" name='category' className="select-search"  onChange = {getRoomInfo}>
                        <option value={0}>전체</option>
                        {option.map((data:any)=>(
                                <AlcoholSearchOption prop={data} key={data.id}/>
                        ))}
                    </select>

            </>

            <Button onClick={AddRoom}>생성</Button>

        </div>
    );
}

export default AddFaceChatPage;