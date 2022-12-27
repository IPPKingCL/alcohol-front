import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { addr } from "../Common/serverAddr";

const Recipe = () => {
    const {id} = useParams();

    const list = () => {
        fetch(addr+'/cocktail/alchoCock/'+id,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            }
        }).then((res)=>res.json())
        .then(res => {
            console.log(res);
        })
    }

    useEffect(() => {
        list();
    },[])

    return (
        <div>
            gd
        </div>
    )
}

export default Recipe;