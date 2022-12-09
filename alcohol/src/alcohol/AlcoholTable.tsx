import { PresignedPost } from "aws-sdk/clients/s3";

function AlcoholTable(prop:any){
    return (
        <div>
            <p>{prop.data.name}</p>
            <hr></hr>
        </div>
    )
}

export default AlcoholTable;