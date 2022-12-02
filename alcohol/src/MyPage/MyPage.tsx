import '../css/MyPage.css';

function MyPage(){
    return(
        <div>
            <div className='mypage'>
                <h3>(세션)님의 마이페이지</h3>
            </div>
            
            <hr></hr>
            <div>
                <img className="myImg" src="https://ifh.cc/g/QCO7Gm.png"/>
                <div >
                    <p className='myName'>이름</p>
                    <span className='myHi'>안녕하세요 등 소개글 작성</span>{/*css 변경 예정*/}
                </div>
                
            </div>

            <div className='myDrink'>
                <p>좋아하는 술 목록</p>{/*이 부분 컴포넌트 분리해서 map으로 뿌릴 예정입니다*/}
                <div>
                    <span>1 </span>
                    <input type="text" value={"잭 다니엘"}/>
                </div>
                
                <div>
                    <span>2 </span>
                    <input type="text" value={"스미노프 레드"}/>
                </div>
                
                <div>
                    <span>3 </span>
                    <input type="text" value={"메이커스 마커스"}/>
                </div>
               
            </div>


        </div>
    )
}

export default MyPage;