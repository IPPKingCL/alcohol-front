import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BoardTable(props:any){
    const navigate = useNavigate();

    const onclick = () => {
        const id = props.data.id;
        const path = '/free/read/'+id;
        navigate(path);
    }

    return(
        
        <tr>
            <td>{props.data.id}</td>
            <td onClick={onclick}>{props.data.title}</td>
            <td>{props.data.dateTime}</td>
        </tr>  
    );

}

export default BoardTable;