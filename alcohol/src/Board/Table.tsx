import React, { useEffect } from "react";

function Table(data:any){
   
    return(
        
        <tr>
            <td>{data.id}</td>
            <td>{data.title}</td>
            <td>{data.dateTime}</td>
        </tr>  
    );

}

export default Table;