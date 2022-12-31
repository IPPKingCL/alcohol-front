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
            <img src="https://myhsproject.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20221231_173124605.jpg"/>
            <img src="https://myhsproject.s3.ap-northeast-2.amazonaws.com/istockphoto-1302161390-612x612.jpg"/>
            <button onClick={recipe}>레시피</button>
        </div>
    )
}

export default AlchoIndex;