import AlchoCoOne from "./AlchoCoOne";

const AlchoCoList = (props:any) =>{
    return(
        <div>
            {props.datas.map((data:any)=>{
                <AlchoCoOne
                    data={data}
                    key={data.id}
                    onRemove={props.onRemove}
                />
            })}
        </div>
    )
}

export default AlchoCoList;