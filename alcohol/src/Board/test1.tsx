import { useState } from "react";
import { getCookie } from "../Common/Cookies";
import { addr } from "../Common/serverAddr";

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
                
            }
        }).then((res) => res.json())
        .then((res) => {
            console.log(res.data);
            const s ='https://alcoholcocktail.s3.amazonaws.com/6e23c92ee6183bedb7646c488174c55d?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVP7CDT275SY2QKNN%2F20221209%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20221209T045203Z&X-Amz-Expires=60&X-Amz-Signature=0042060983233ccaf1d968ae13ef88d6218c819f104900cee1faaf4571d04f15&X-Amz-SignedHeaders=host'
            fetch(res.data,{
                method:"put",
                headers:{
                    "Content-Type": "multipart/form-data",
                    
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