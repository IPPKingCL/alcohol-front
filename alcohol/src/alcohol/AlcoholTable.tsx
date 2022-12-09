import { PresignedPost } from "aws-sdk/clients/s3";

function AlcoholTable(prop:any){
    return (
        <div> 
            <p className="board-title">{prop.data.name}</p>
            <img className="alcoholImg" src={prop.data.imgUrl}/>
            <hr></hr>
        </div>
    )
}

export default AlcoholTable;