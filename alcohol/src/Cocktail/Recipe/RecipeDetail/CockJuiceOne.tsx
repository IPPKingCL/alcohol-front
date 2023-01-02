import { useEffect, useState } from "react";
import { CockJuice } from "../../../interface/cocktail/CockJuice";

const CockJuiceOne = (prop:any) => {
    console.log(prop.data);
    const [juice,setJuice] = useState<CockJuice>()
    
    
    
    useEffect(() => {
        setJuice(prop.data)
    },[]);

    return (
        <div>
            <img src={juice?.imgUrl}/>
            {juice?.name}을(를) {juice?.amount}만큼 따라주세요
        </div>
    )
}

export default CockJuiceOne;