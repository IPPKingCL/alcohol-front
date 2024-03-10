import { useEffect, useState } from 'react';
import { setCookie, getCookie } from '../Common/Cookies';
import '../css/App.css';
import '../css/Login.css';
import { recommand } from '../interface/recommand';
import { addr } from '../Common/serverAddr';
import { Grid } from '@mui/material';
import { gridSpacing } from '../store/constant';
import TodayAlchoCard from './TodayAlchoCard';
import InfoCard from './InfoCard';
import RecommandCard from './RecommandCard';
import PopularCard from './PopularCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';

function Main() {

    const [isLoading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        console.log(getCookie('myToken'));
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TodayAlchoCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={6} md={6} lg={12}>
                                <InfoCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={6} md={6} lg={12}>
                                <RecommandCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        {/* <TotalGrowthBarChart isLoading={isLoading} /> */}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

}

export default Main;


/*

해야할 일

3. 로그아웃 기능 구현(미완)

5. 추천 시스템 다듬기

12. 프론트 다듬기 => 카톡으로 각자 테마(?) 

13. db 분리작업 (운영, 개발)

14. 주소창 수정 작업 해야댐

16. 댓글 잘림 현상

18. 마이페이지 UI 설계 작업

20. 배포 준비하기 => 기능 위주로 미비된거를 먼저 찾아서 기능이 돌아가게, 하면서 ui는 고침

20. 마이페이지 메뉴 컴포넌트 찾기(기능 전체도 안되어 있음)

21. 자소서/포폴 플랫폼 (보류)

23. 수정페이지 아직 옛날 페이지임 -> 싹다 뜯어 고칠 예정...  

24. 웹 뷰로 앱 예정

25. 미비된 부분 찾기 -> 협업 기반 추천

26. 파이썬 배포

27. 페이지 이동 시 스크롤 문제

28. 비동기 작업 시 로딩 화면

29. 알람 컴포넌트 추가

30. 게시글 미리 보기 시 하트 기능

기능,테마,추천 -> 배포(ci/cd 없이 인스턴스에 직접 배포) -> 스토어 -> 디자인 및 운영

서로 브랜치를 따서 리뷰를 서로 해주는걸로
*/