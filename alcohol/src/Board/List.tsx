import React, { useEffect, useState } from 'react';
import { boardList } from '../interface/BoardList';
import BoardTable from './BoardTable';
import Pagination from './Paginattion';

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