import React, { useEffect, useState } from 'react';
import { boardList } from '../interface/BoardList';
import Table from './Table';

function List(props:any){
    console.log("props : " +{props})
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
                    {props.datas&&props.datas.map((data:any)=>{
                        <Table
                            data={data}
                        />
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default List;