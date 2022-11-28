import BoardTable from './BoardTable';


function List(props:any){
    console.log(props.datas)
    return(
        <div>
            
               
            {props.datas&&props.datas.map((data:any)=>(
                <BoardTable
                    data={data}
                    key={data.id}
                />
            ))}
           
            
        </div>
    )

}

export default List;