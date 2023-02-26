import { Avatar, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardHeader } from '@mui/material';
import { getCookie, removeCookie, setCookie } from '../Common/Cookies';
import { addr } from '../Common/serverAddr';
import '../css/MyPage.css';
import { User } from '../interface/user';
import MyFavorite from './MyFavorite';
import { Table } from '@mui/material';


function MyPage() {
    const navigate = useNavigate();

    return (
        <Card style={{ backgroundColor: '#FFFFB6', color: 'maroon', position: 'relative' }}>
            <CardHeader
                    avatar={
                        <Avatar src="" aria-label="recipe" />
                    }
                    title={<Typography>
                        <span style={{ fontSize: "18px" }}>마이 페이지</span>
                    </Typography>}
                    subheader={<Typography><span onClick={() => {navigate('/mypageInfo')}}>나의 정보 보러가기</span></Typography>}
                />
        </Card>
    )
}


export default MyPage;