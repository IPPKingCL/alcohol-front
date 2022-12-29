import { useNavigate } from "react-router"

const AlchoIndex = () =>{
    const navigate = useNavigate();
    const info = () => {
        navigate('/alcohol/info');
    }

    const recipe = () =>{
        navigate('/cocktail/recipe/all')
    }
    return (
        <div>
            <button onClick={info}>술정보</button>
            <button onClick={recipe}>레시피</button>
        </div>
    )
}

export default AlchoIndex;