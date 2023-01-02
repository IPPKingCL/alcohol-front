import { useEffect, useState } from "react";
import { CockAlcho } from "../../../interface/cocktail/CockAlcho";

const CockAlchoOne = (prop:any) => {
    console.log(prop.data);
    const [alcho,setAlcho] = useState<CockAlcho>()
    
    
    
    useEffect(() => {
        setAlcho(prop.data)
    },[]);

    return (
        <div>
            <img src={alcho?.imgUrl}/>
            {alcho?.name}을(를) {alcho?.amount}ml 만큼 따라주세요
        </div>
    )
}

export default CockAlchoOne;