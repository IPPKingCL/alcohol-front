import { useNavigate } from "react-router-dom";

const Manager = () => {
    const navigate = useNavigate();
    const onclick = () => {
        navigate('/manager/newCocktail')
    }
    return(
        <div>
            <button onClick={onclick}>칵테일 추가하기</button>
        </div>
    )
}

export default Manager;