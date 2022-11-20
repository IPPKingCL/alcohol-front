import React, { useEffect } from "react";

function BoardTable(props:any){
   
    return(
        
        <tr>
            <td>{props.data.id}</td>
            <td>{props.data.title}</td>
            <td>{props.data.dateTime}</td>
        </tr>  
    );

}

export default BoardTable;