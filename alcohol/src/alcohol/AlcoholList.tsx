import AlcoholTable from "./AlcoholTable";

function AlcoholList(props:any){
    console.log(props);
    return(
        <div >
            {props.datas&&props.datas.map((data:any)=>(
                <AlcoholTable
                    data={data}
                    key={data.id}
                />
            ))}
        </div>
    )
}

export default AlcoholList;