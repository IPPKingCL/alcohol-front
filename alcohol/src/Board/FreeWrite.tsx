import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { board } from '../interface/Board'
import { addr } from '../interface/serverAddr';
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

    const onchange = (e:any) => {
        const {name, value} = e.target;
        setBoard({
            ...board,
            [name]:value
        });
    }

    const onclick = async () => {
        console.log(board);
        if(!board.title||!board.contents){
            alert("제목과 내용을 입력해주세요");
            return;
        } 
        
        if(!board.boardType){
            alert("카테고리를 입력해주세요");
            return;
        }
        
        fetch(addr+'/board/write', {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin" : "http://localhost:5000" ,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title:board.title,
                contents:board.contents,
                userId:1,  //아이디 세션 처리 어떻게 할지 정해지면 수정 예정
                boardType:board.boardType,
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
    return(
        <div>
            <div className = "input-Board">
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
            <button onClick={onclick}>등록</button>

        </div>
    )
}

export default FreeWrite;