import { Box, Checkbox, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Switch, TextField, Typography } from '@mui/material';
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


    const [checked, setChecked] = useState<boolean>(true);
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
        <>
            <Grid container spacing={0}>
                <Grid item xs={5}>
                    <div style={{ textAlign: "center" }}>
                        <h2 style={{ display: "inline-block" }}>Email : </h2>
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <TextField id="outlined-basic" name="email" label="Email" variant="outlined" onChange={changeEmail} />
                </Grid>
            </Grid>
            <Grid container spacing={0}>
                <Grid item xs={5}>
                    <div style={{ textAlign: "center" }}>
                        <h2 style={{ display: "inline-block" }}>PW : </h2>
                    </div>
                </Grid>
                <Grid item xs={4.33}>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
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
                </Grid>
            </Grid>
            <div style={{ textAlign: "center" }}>


            </div>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checked}
                            onChange={(event) => setChecked(event.target.checked)}
                            name="checked"
                            color="primary"
                        />
                    }
                    label="Remember me"
                />
                <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                    Forgot Password?
                </Typography>
            </Stack>

            <Box sx={{ mt: 2 }}>
                <LoadingButton
                    size="small"
                    onClick={handleClick}
                    endIcon={<SendIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    fullWidth
                >
                    Login
                </LoadingButton>
            </Box>
        </>
    );
}

export default EmailLogin;