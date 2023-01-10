const SearchOption = (prop:any) => {
    return(
        <>
        <option value={prop.prop.id}>{prop.prop.name}</option>
        </>
    )
}

export default SearchOption;