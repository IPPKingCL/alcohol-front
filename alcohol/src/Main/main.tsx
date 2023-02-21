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

12. 프론트 다듬기 + 오늘의 술 페이지 만들기(추천 페이지는 완)

13. db 분리작업 (운영, 개발)

14. 주소창 수정 작업 해야댐

16. 댓글 잘림 현상

18. 마이페이지 UI 설계 작업

20. 배포 준비하기

20. 마이페이지 메뉴 컴포넌트 찾기

21. 자소서 플랫폼

*/