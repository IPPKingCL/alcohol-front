import CockJuiceOne from "./CockJuiceOne";

const CockJuice = (props:any) => {
    console.log(props)
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