import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { useEffect, useState } from 'react';
import { FaceChat } from '../interface/faceChat';
import { addr } from '../Common/serverAddr';
import { getCookie } from '../Common/Cookies';
import { useNavigate } from 'react-router-dom';
import BasicSpeedDial from '../Board/BasicSpeedDial';

const FaceChatList =() => {
    const [roomList, setRoomList] = useState<FaceChat[]>(); 
    const navigate = useNavigate();

    useEffect(()=>{
        fetch(addr + '/face-chat/list',{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${getCookie('myToken')}`,

            },
        }).then((res)=>res.json())
        .then((res)=>{
            if(res.message== "Unauthorized") {
                alert('로그인 후 사용가능합니다');
                navigate('/login');
            } 

            setRoomList(res);
        })
    },[]);

    const getInFaceChat = (id:number) => {
        fetch(addr + '/face-chat/faceChat/'+id,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${getCookie('myToken')}`,
            },
        }).then((res)=>res.json())
        .then((res)=>{
            if(res.success){
                alert('get in');
            }
        })
    }

    const itemTemplate = (product: FaceChat) => {
        return (
            <div className="col-12" style={{height:"5.5rem"}}>
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900" style={{marginLeft:"2rem", height:"2rem"}}>
                                <h3>
                                {product.roomName}

                                </h3>
                            </div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                  
                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-t sm:align-items-end gap-3 sm:gap-2">
                           
                            <Button style={{marginLeft:'14rem', }} className="p-button-rounded" size="small" label="Let's Join!!" raised></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const onclick = () =>{
        navigate('/addFaceChat');
    }

    return (
        <div>
            <DataView value={roomList} itemTemplate={itemTemplate} />
            <BasicSpeedDial click={onclick}></BasicSpeedDial>

        </div>
    )
}

export default FaceChatList;