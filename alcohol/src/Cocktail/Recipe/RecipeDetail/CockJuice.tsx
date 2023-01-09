import CockJuiceOne from "./CockJuiceOne";

const CockJuice = (props:any) => {
    
    return (
        <div>
            음료레시피
             {props.datas&&props.datas.map((data:any)=>(
                <CockJuiceOne
                    data={data}
                    
                />
               
            ))}
             <hr></hr>
        </div>
    )
}

export default CockJuice;