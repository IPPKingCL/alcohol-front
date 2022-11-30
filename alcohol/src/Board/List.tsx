import BoardTable from './BoardTable';


function List(props:any){
    
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