import { useState } from "react";
import { getCookie } from "../Common/Cookies";
import { addr } from "../interface/serverAddr";

function Test() {
    const [selectedFile, setSelectedFile] = useState<any>('');
    const handleFileInput = (e:any) => {
        console.log("event : "+e);
        const file = e.target.files[0];
        console.log(file);
        setSelectedFile(file);
    }

    const onclick = () => {
        fetch(addr+'/board/s3url',{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${getCookie('myToken')}`
            }
        }).then((res) => res.json())
        .then((res) => {
            console.log(res.data);
            fetch(res.data,{
                method:"put",
                headers:{
                    "Content-Type": "multipart/form-data",
                    "Authorization":`Bearer ${getCookie('myToken')}`
                },
                body:selectedFile
            })

            const imageUrl = res.data.split('?')[0]
            console.log(imageUrl)
        })
    }

    return (
        <div>
         
            <input id="imageFile" type="file" onChange={handleFileInput} accept="image/*"/>
            <button onClick={onclick}>이미지 업로드</button>
        
        </div>
    )
}

export default Test;