import { ReactNode } from "react";


function MyFavorite(props:any){
    
    return (
        <div className='myDrink'>
            <p>좋아하는 술 목록</p>
            {props.datas&&props.datas.map((data:any)=>(
                <div key={data}>
                 <input type="text" defaultValue={data||''}/>
                 </div>
            ))}
        </div>
    )
}
type MyFavoriteProps={
    children:ReactNode,
    data:string
}
export default MyFavorite;