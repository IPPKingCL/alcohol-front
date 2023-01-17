import { CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CockAlcho } from "../../../interface/cocktail/CockAlcho";

const CockAlchoOne = (prop:any) => {
    const [alcho,setAlcho] = useState<CockAlcho>()
    const navigater = useNavigate();
    
    
    useEffect(() => {
        setAlcho(prop.data)
    },[]);

    const onclick = () => {
        navigater('/alcohol/detail/'+prop.data.id);
    }

    return (
        <div>
            <CardMedia onClick={onclick}
                        component="img"
                        height="400vh"
                        width="400vh"
                        image={alcho?.imgUrl}
                        alt="Paella dish"
                        sx={{
                            objectFit: "fill"
                        }}
                    />
            {alcho?.name}을(를) {alcho?.amount}ml 만큼 따라주세요
        </div>
    )
}

export default CockAlchoOne;