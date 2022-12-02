function MyPage(){
    return(
        <div>
            <div>
                <h3>(세션)님의 마이페이지</h3>
            </div>
            
            <hr></hr>
            <div>
                <img src="https://ifh.cc/g/QCO7Gm.png"/>
                <p>이름</p>
                <span>안녕하세요 등 소개글 작성</span>
            </div>

            <div>
                <p>좋아하는 술 목록</p>{/*이 부분 컴포넌트 분리해서 map으로 뿌릴 예정입니다*/}
                <span>1 </span>
                <input type="text" value={"잭 다니엘"}/>

                <span>2 </span>
                <input type="text" value={"스미노프 레드"}/>

                <span>3 </span>
                <input type="text" value={"메이커스 마커스"}/>
            </div>


        </div>
    )
}

export default MyPage;