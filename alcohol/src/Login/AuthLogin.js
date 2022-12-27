import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';

import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery,
    Container
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from './useScriptRef';
import AnimateButton from './AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Google from './social-google.svg';
import { GoogleLogin } from 'react-google-login';

import { useNavigate } from 'react-router-dom';
import { gapi } from 'gapi-script';
import { addr } from '../Common/serverAddr';
import { setCookie } from '../Common/Cookies';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {

    const clientId =
        "722148392125-6qdo1sho8shp117jpfipd8vggfgb1qo9.apps.googleusercontent.com";


    const [type, setType] = useState("g");

    const check = () => {
        const filter = "win16|win32|win64|mac|macintel";

        let device = "";

        if (navigator.platform) {
            if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
                device = "mobile";
            } else {
                device = "pc";
            }

        }

        setCookie('device', device, {
            path: "/",
            sameSite: "Lax"
        });
    }


    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId,
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);

    async function onSuccess(res) {

        check();

        const profile = res.getBasicProfile();

        const userdata = {
            id: profile.getId(),
            email: profile.getEmail(),
            image: profile.getImageUrl(),
            name: profile.getName(),
            loginType: type,
        };
        // 로그인 성공 후 실행하기 원하는 코드 작성.
        alert("구글 로그인에 성공하였습니다.");


        fetch(addr + '/user/checkEmail', {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": addr,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: userdata.email
            }),
        }).then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    redirectAddInfo(userdata);
                } else {
                    console.log(res.token)
                    setCookie('myToken', res.token, {
                        path: "/",
                        secure: true,
                        sameSite: "none"
                    })
                    redirectMain(userdata);
                }
            })

    }

    /*인증할 때 보내는 헤더 예시 참조*/
    /*headers:{
        "Content-Type":"application/json"
        Authorization:"Bearer ${getCookie('myToken')}",
    }
    */

    const onFailure = (res) => {
        alert("구글 로그인에 실패하였습니다");
        console.log("err", res);
    };

    const navigate = useNavigate();

    const redirectAddInfo = (data) => {
        navigate("/AddInfo", { state: data });
    }


    const redirectMain = (data) => {
        navigate("/Main", { state: data });
    }

    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);
    const [checked, setChecked] = useState(true);

    const googleHandler = async () => {
        console.error('Login');
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} justifyContent="center" display="flex">
                    <AnimateButton>
                        <GoogleLogin
                            clientId={clientId}
                            theme="dark"
                            buttonText="구글 로그인 하기"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                        />
                    </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

                        <Button
                            variant="outlined"
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                borderColor: `${theme.palette.grey[100]} !important`,
                                color: `${theme.palette.grey[900]}!important`,
                                fontWeight: 500,
                                borderRadius: `${customization.borderRadius}px`
                            }}
                            disableRipple
                            disabled
                        >
                            또는
                        </Button>

                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">이메일 주소로 로그인 하세요.</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('이메일 형식이 아닙니다.').max(255).required('이메일을 입력하세요!'),
                    password: Yup.string().max(255).required('비밀번호를 입력하세요!')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);

                            fetch(addr + '/user/EmailLogin', {
                                method: "POST",
                                headers: {
                                    "Access-Control-Allow-Origin": addr,
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    email: values.email,
                                    password: values.password,
                                }),
                            }).then((res) => res.json())
                                .then((res) => {
                                    if (!res.success) {
                                        setCookie('myToken', res.token, {
                                            path: "/",
                                            secure: true,
                                            sameSite: "none"
                                        })
                                        alert('로그인 성공!');
                                        navigate('/Main');
                                    }
                                    else {
                                        alert('이메일이 등록되지 않았거나 비밀번호 오류 입니다.');
                                    }
                                })
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }} margin='normal'>
                            <InputLabel htmlFor="outlined-adornment-email-login">이메일 계정</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email Address / Username"
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">비밀번호</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
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
                                label="이메일 저장"
                            />
                            <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                                비밀번호를 잊으셨나요?
                            </Typography>
                        </Stack>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    로그인
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseLogin;
