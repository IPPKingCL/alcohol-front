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

1. 술 정보 모으기(진행 중)

3. 로그아웃 기능 구현

5. 홈 화면에서는 제공하는 어플리케이션의 기능들을 한눈에 볼 수 있게 설계 (우선순위 1) )(진행중)

6. 현재 외부정보 + 내부정보의 따른 오늘의 술 추천 (우선순위 2)

8. 트랜잭션 작업 (나중에)

9. 술 정보 검색 기능 리팩토링

10. 스크롤 상단 버튼 + (+)플러스 메뉴 만들기

11. https://namu.wiki/w/%EC%B9%B5%ED%85%8C%EC%9D%BC

-> 칵테일 정보 받아서 db 저장하기

12. 데이터 넣기 너무 귀찮군.. -> 01-06 ~ 01-07 럼 데이터 나머지 작업... ㅠㅠ

*/