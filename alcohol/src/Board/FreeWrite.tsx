import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { board } from '../interface/Board'
import { addr } from '../interface/serverAddr';
import AWS from 'aws-sdk';
import { getCookie } from '../Common/Cookies';

//자유게시판 글 작성 컴포넌트
function FreeWrite(){

    const [board, setBoard] = useState<board>({
        title:"",
        contents:"",
        boardType:""
    })
    const navigate=useNavigate();
    
    /* 아이디 세션 처리 어떻게 할지 정해지면
    useEffect(() => {
        
    },[])
    */

    const onchange = (e:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLTextAreaElement>|React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        setBoard({
            ...board,
            [name]:value
        });
    }

    const onclick = async () => {
        
        console.log("selectedFile : "+selectedFile.name);
        uploadFile(selectedFile);
        console.log(board);
        if(!board.title||!board.contents){
            alert("제목과 내용을 입력해주세요");
            return;
        } 
        
        if(!board.boardType){
            alert("카테고리를 입력해주세요");
            return;
        }
        const tok = getCookie('myToken');

        fetch(addr+'/board/write', {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin" : "http://localhost:5000" ,
                "Content-Type": "application/json",
                "Authorization":`Bearer `+ tok,
            },
            body: JSON.stringify({
                title:board.title,
                contents:board.contents,
                boardType:board.boardType,
                token:getCookie('myToken'),
            }),
        }).then((res) => res.json())
        .then((res) => {
            if(res.success) {
                alert("등록 성공");
                navigate('/free')
            }else {
                console.log("등록 과정 중 에러 발생.");
                alert("등록 과정 중 에러발생 \n다시 시도해주세요");
            }
        })

    }

    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState<any>('');
    const [showAlert, setShowAlert] = useState(false);

    const ACCESS_KEY = process.env.REACT_APP_accessKeyId;
    const SECRET_ACCESS_KEY = process.env.REACT_APP_secretAccessKey;
    const REGION = process.env.REACT_APP_region;
    const S3_BUCKET = "alcoholcocktail";

    AWS.config.update({
        accessKeyId : ACCESS_KEY,
        secretAccessKey : SECRET_ACCESS_KEY,
        region:REGION
    });

    const myBucket = new AWS.S3({
        params:{Bucket : S3_BUCKET},
        region : REGION,
    });

    const handleFileInput = (e:any) => {
        console.log("event : "+e);
        const file = e.target.files[0];
        console.log(file);
        setProgress(0);
        setSelectedFile(file);
        
    }
    
    const uploadFile = (file: any) => {
        const params = {
            ACL:'public-read',
            Body:file,
            Bucket:S3_BUCKET,
            Key:file.name
        };

        myBucket.putObject(params)
        .on('httpUploadProgress',(evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100))
            setShowAlert(true);
            setTimeout(() => {
            setShowAlert(false);
            setSelectedFile(null);
            }, 3000)
        })
        .send((err) => {
        if (err) console.log(err)
        })
        
    }
    return(
        <div className = "input-Board">
            <div >
                <h1>Title</h1>
                <input name="title" type="text" className="search-input" onChange={onchange} />
            </div>
            
            <div className = 'bar2'>
                <h1>content</h1>
                <textarea name="contents" className='content' id="content" onChange={onchange}></textarea>
            </div>
                          
            <select name="boardType" id="selectBoard" onChange={onchange}>
                <option>카테고리 선택</option>
                <option value = "F">자유게시판</option>
                <option value = "A">술 관련 게시판</option>
                <option value = "R">레시피 게시판</option>
            </select>
            <div>
                <input className='file' type='file' onChange={handleFileInput}/>
            </div>
            
            <button onClick={onclick}>등록</button>

        </div>
    )
}

export default FreeWrite;