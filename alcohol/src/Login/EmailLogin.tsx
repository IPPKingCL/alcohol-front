import { Box, FormControlLabel, Switch, TextField } from '@mui/material';
import React, { useState, forwardRef } from 'react';
import '../css/App.css';
import '../css/Login.css';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';

function EmailLogin() {

    const [loading, setLoading] = React.useState(true);
    function handleClick() {
        setLoading(true);
    }

    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <h2 style={{ display: "inline-block" }}>Email : &nbsp;</h2><TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </div>
            <div style={{ textAlign: "center" }}>
                <h2 style={{ display: "inline-block" }}>Password : &nbsp;</h2><TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </div>
            <div style={{textAlign : 'center'}}>
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