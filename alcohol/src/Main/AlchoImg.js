import { useNavigate } from 'react-router-dom';

const AlchoImg = (prop) =>{
    const navigate = useNavigate();
    const recipe = () => {
        navigate('/cocktail/recipeRead/'+prop.i);
    }
    
    return(
        <>
            <img onClick = {recipe} className="todayAlcho" src={prop.img}></img>
        </>
    )
}

export default AlchoImg;