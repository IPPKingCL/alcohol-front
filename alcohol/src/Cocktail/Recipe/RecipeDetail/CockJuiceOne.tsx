import { useEffect, useState } from "react";
import { CockJuice } from "../../../interface/cocktail/CockJuice";

const CockJuiceOne = (prop:any) => {
    console.log(prop.data);
    const [juice,setJuice] = useState<CockJuice>()
    const [amount, setAmount] = useState<string>();
    let tempAmount ='';
    
    useEffect(() => {
        setJuice(prop.data)
        if(prop.data.amount>=1000){
            tempAmount = String(prop.data.amount/100);
            setAmount(tempAmount+"% 높이로 따라주세요");
        }else{
            setAmount(prop.data.amount+"ml 따라주세요");
        }
    },[]);

    return (
        <div>
            <img src={juice?.imgUrl}/>
            {juice?.name}을(를) {amount}
        </div>
    )
}

export default CockJuiceOne; 