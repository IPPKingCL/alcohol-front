import { PresignedPost } from "aws-sdk/clients/s3";

function AlcoholTable(prop:any){
    return (
        <div className="alchoWrapper"> 
            <h2 className="board-title">{prop.data.name}</h2>
            <span className="board-title"> {prop.data.category}</span>
            <img className="alcoholImg" src={prop.data.imgUrl}/>
            <hr></hr>
        </div>
    )
}

export default AlcoholTable;