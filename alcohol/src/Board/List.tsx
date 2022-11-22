import React, { useEffect, useState } from 'react';
import { boardList } from '../interface/BoardList';
import BoardTable from './BoardTable';

function List(props:any){
    
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>seq</th>
                        <th>title</th>
                        <th>dateTime</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {props.datas&&props.datas.map((data:any)=>(
                        <BoardTable
                            data={data}
                            key={data.id}
                        />
                    )
                        
                    )}
                </tbody>
            </table>
            
        </div>
    )

}

export default List;