const AlcoholSearchOption = (prop:any) => {
    
    return(
        <>
        <option value={prop.prop.id}>{prop.prop.category}</option>
        </>
    )
}

export default AlcoholSearchOption;