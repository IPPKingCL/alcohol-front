import { useNavigate } from 'react-router-dom';
import '../css/footer.css';

function Footer(){
    const navigate = useNavigate();
    const recommend = () => {};//술 추천
    const mbti = () => {};//오늘의 술
    const home = () => {navigate('/Main')};
    const free = () => {navigate('/free')};
    const myPage = () => {};

    return(
        <>
           
            <div id="footer">
                <div className='menu'>
                    <li onClick={recommend} className="bar_menu">오늘의 술</li>
                    <li onClick={mbti} className="bar_menu">술 MBTI</li>
                    <li onClick={home} className="bar_menu">홈</li>
                    <li onClick={free} className="bar_menu">게시판</li>
                    <li onClick={myPage} className="bar_menu">마이페이지</li>
                </div>
                
            </div>

        </>
    )
}

export default Footer;