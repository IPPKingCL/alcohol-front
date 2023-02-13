import { Avatar, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardHeader } from 'reactstrap';
import { getCookie, removeCookie, setCookie } from '../Common/Cookies';
import { addr } from '../Common/serverAddr';
import '../css/MyPage.css';
import { User } from '../interface/user';
import MyFavorite from './MyFavorite';
import { Table } from '@mui/material';


function MyPageInfo() {
    const [userData, setUserData] = useState<User>();
    const [loading, setLoading] = useState<boolean>(true);
    const [favoirtes, setFavorite] = useState<string[]>([]);
    const [img, setImg] = useState<string>();
    const navigate = useNavigate();
    let copy;
    const user = () => {

        fetch(addr + '/user/selectUser', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie('myToken')}`,
            },
        }).then((res) => res.json())
            .then((res) => {

                if (res.success === false) {
                    alert('회원 조회 중 에러 발생');
                    window.history.go(-1);
                }
                if (res.message == 'Unauthorized') {
                    alert('로그인 후 이용 가능합니다')
                    navigate('/Login');
                }
                setUserData(res);
                favoriteList();

                if (res.img === "") {
                    let copy = { ...userData };

                    setImg('https://ifh.cc/g/QCO7Gm.png');



                } else {
                    setImg(res.img);
                }

            })
    }

    const favoriteList = () => {
        setFavorite([])
        fetch(addr + '/user/selectFavorite', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie('myToken')}`,
            }
        }).then((res) => res.json())
            .then((res) => {

                for (let i = 0; i < res.length; i++) {
                    setFavorite(favoirtes => [...favoirtes, res[i].alcho.category])
                }
                setLoading(false);
            })
    }

    useEffect(() => {
        user()
    }, []);

    const logOut = () => {
        const res = removeCookie('myToken');

        if (res.success) {
            alert('로그아웃 되었습니다');
            navigate('/Main');
        } else {
            alert('로그아웃 도중 에러 발생');
            return;
        }

        //일단 현재 프로젝트 상황 상 클라이언트에서 쿠키 삭제로 로그인 구현해놓았습니다
        //추후 좀 더 서치하고 보강할 예정입니다
    }

    function createData(
        name: string,
        info : string|undefined,
    ) {
        return { name, info};
    }

    const rows = [
        createData('이름', userData?.name),
        createData('닉네임', userData?.nickname),
        createData('직업군', userData?.job),
        createData('가격', userData?.price.toString()),
        createData('이메일', userData?.email),
    ];

    return (
        <Card style={{ backgroundColor: '#FFFFB6', color: 'maroon', position: 'relative' }}>
            <div>
                {loading ? <strong>loading....</strong> :
                    <div>
                        <div className='mypage'>
                            <h3>{userData?.nickname}님의 마이페이지</h3>
                        </div>
                        <div >
                            <img className="myImg" src={img} style={{marginBottom : '1rem'}}/>                            
                        </div>
                        <TableContainer component={Paper}>
                            <Table sx={{backgroundColor: '#FFFFB6'}} aria-label="simple table">
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.info}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <MyFavorite
                            datas={favoirtes} />
                    </div>
                }
                <button onClick={logOut}>로그아웃</button>
                <button onClick={() => { navigate('/myPage/modify') }} >수정</button>
            </div>
        </Card>
    )
}


export default MyPageInfo;