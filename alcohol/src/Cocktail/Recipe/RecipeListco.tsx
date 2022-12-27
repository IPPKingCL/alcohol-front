import RecipeOne from "./RecipeOne";

const RecipeListco = (props:any) => {
    return (
        <div>
            {props.datas&&props.datas.map((data:any)=>(
                <RecipeOne
                    data={data}
                    key={data.id}
                />
            ))}
            <hr></hr>
        </div>
    )
}

export default RecipeListco;