import { Box, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Switch, TextField } from '@mui/material';
import React, { useState, forwardRef, useEffect } from 'react';
import '../css/App.css';
import '../css/Login.css';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
import { addr } from '../Common/serverAddr';
import { UserEmailLogin } from '../interface/UserEmailLogin';
import { VisibilityOff, Visibility } from '@mui/icons-material';

function EmailLogin() {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [loading, setLoading] = React.useState<boolean>(false);
    const [userEmailPassword, setUserEmailPassword] = React.useState<UserEmailLogin>({
        email: '',
        password: ''
    })

    useEffect(() => {
        console.log(userEmailPassword);
    }, [userEmailPassword])

    const changeEmail = (e: any) => {
        const { name, value } = e.target;


        const ch_email: UserEmailLogin = {
            ...userEmailPassword,
            [name]: value,
        }

        setUserEmailPassword(ch_email);
    }

    const changePassword = (e: any) => {
        const { name, value } = e.target;


        const ch_password: UserEmailLogin = {
            ...userEmailPassword,
            [name]: value,
        }

        setUserEmailPassword(ch_password);
    }

    const handleClick = () => {

        if (userEmailPassword.email !== '' && userEmailPassword.password !== '') {
            setLoading(true);
            fetch(addr + '/user/EmailLogin', {
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": addr,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userEmailPassword.email,
                    password: userEmailPassword.password,
                }),
            }).then((res) => res.json())
                .then((res) => {
                    if (!res.success) {
                        console.log("통신 다녀옴?");
                        console.log(res.msg);
                        console.log(res.token);
                        setLoading(false);
                    }
                    alert("존재하지 않는 사용자입니다.");
                    setLoading(false);
                })
        } else {
            alert('이메일 또는 패스워드를 입력하세요.');
        }

    }

    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <h2 style={{ display: "inline-block" }}>Email : &nbsp;</h2><TextField id="outlined-basic" name="email" label="Email" variant="outlined" onChange={changeEmail} />
            </div>
            <div style={{ textAlign: "center" }}>
                <h2 style={{ display: "inline-block" }}>Password : &nbsp;</h2>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        onChange={changePassword}
                    />
                </FormControl>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Box>
                    <Box sx={{ '& > button': { m: 1 } }}>
                        <LoadingButton
                            size="small"
                            onClick={handleClick}
                            endIcon={<SendIcon />}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                        >
                            Login
                        </LoadingButton>
                    </Box>
                </Box>
            </div>
        </div>
    );
}

export default EmailLogin;