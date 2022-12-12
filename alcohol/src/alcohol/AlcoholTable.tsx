import { PresignedPost } from "aws-sdk/clients/s3";
import { useNavigate } from "react-router-dom";

function AlcoholTable(prop:any){
    const navigate = useNavigate();

    const onclick = () => {
        navigate('/alcohol/detail/'+prop.data.id);
    }

    return (
        <div className="alchoWrapper" onClick={onclick}> 
            <h2 className="board-title" >{prop.data.name}</h2>
            <span className="board-title"> {prop.data.category}</span>
            <img className="alcoholImg" src={prop.data.imgUrl}/>
            <hr></hr>
        </div>
    )
}

export default AlcoholTable;