import CocktailCoOne from "./CocktailCoOne";

const CocktailCoList = (props:any) => {
    return (
        <div>
            {props.datas.map((data:any)=>(
                <CocktailCoOne
                    data={data}
                    key={data.id}
                    onRemove={props.onRemove}
                    url={data.url}
                />
            )
            )}
        </div>
    )
}

export default CocktailCoList;