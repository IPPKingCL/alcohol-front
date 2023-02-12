import { useNavigate } from "react-router-dom"

const Recommend = () => {
    const navigate = useNavigate();
    const onclick = () =>{
        navigate('/recommend/cocktail')
    }
    return (
        <div>
            <p onClick={onclick}>추천받기</p>
        </div>
    )
}

export default Recommend