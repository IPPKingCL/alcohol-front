import CockJuiceOne from "./CockJuiceOne";

const CockJuice = (props:any) => {
    return (
        <div>
             {props.datas&&props.datas.map((data:any)=>(
                <CockJuiceOne
                    data={data}
                    
                />
            ))}
        </div>
    )
}

export default CockJuice;