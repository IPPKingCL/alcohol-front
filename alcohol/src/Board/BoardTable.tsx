
import { useNavigate } from "react-router-dom";

function BoardTable(props:any){
    const navigate = useNavigate();

    const onclick = () => {
        const id = props.data.id;
        const path = '/free/read/'+id;
        navigate(path);
    }

    return(
        
        <div>
            <p className="board-title" onClick={onclick}>{props.data.title}</p>
            <hr></hr>
        </div>
           
        
    );

}

export default BoardTable;