import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {AddFaceChat} from '../interface/AddFaceChat'
import AlcoholSearch from "../alcohol/AlcoholSearch/AlcoholSearch";
import { AlchoCategory } from "../interface/AlchoCategory";
import AlcoholSearchOption from "../alcohol/AlcoholSearch/AlcoholSearchOption";
import { addr } from "../Common/serverAddr";

const AddFaceChatPage = () => {
    
    const [addFaceChat, setAddFaceChat] = useState<AddFaceChat>({
        roomName:'',
        detailComment:'',
        category:''
    });

    const onchange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        let category = '';
        
        category = e.target.value;

        console.log(category)
    }

    const [option,setOption] = useState<AlchoCategory[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
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
                //onChange={onchange}
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
                //onChange={onchange}
                style={{marginLeft:'1rem',marginTop:'1rem'}}
            />
           
           
            <>
                    <select name="selectBoard" id="selectBoard" className="select-search"  onChange = {e=>onchange(e)}>
                        <option value={0}>전체</option>
                        {option.map((data:any)=>(
                                <AlcoholSearchOption prop={data} key={data.id}/>
                        ))}
                    </select>

            </>

        </div>
    );
}

export default AddFaceChatPage;