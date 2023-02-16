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


function MyPage() {
    const navigate = useNavigate();

    return (
        <Card style={{ backgroundColor: '#FFFFB6', color: 'maroon', position: 'relative' }}>
            <div>
                <p>mypage List</p>

                <p onClick={() => {navigate('/mypageInfo')}}>info</p>
            </div>
        </Card>
    )
}


export default MyPage;