import { useEffect } from "react";
import { useParams } from "react-router";
import { addr } from "../../Common/serverAddr";

const RecipeRead = () =>{
    const {id} = useParams();
    const recipe = async () => {
        fetch(addr+'/cocktail/'+id,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res)=>res.json())
        .then((res)=>{
            console.log(res);
        })
    }

    useEffect(()=>{
        recipe()
    },[])
    return (
        <div>
            dsfadsjfkdasf
        </div>
    )
}

export default RecipeRead;