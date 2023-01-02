import CockAlchoOne from "./CockAlchoOne";

const CockAlcho = (props:any) => {
    return (
        <div>
            기주레시피
            {props.datas&&props.datas.map((data:any)=>(
                <CockAlchoOne
                    data={data}
                    
                />
               
            ))}
             <hr></hr>
        </div>
    )
}

export default CockAlcho;