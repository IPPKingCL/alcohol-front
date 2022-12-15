import { TextField } from '@mui/material';
import React, { useState, forwardRef } from 'react';
import '../css/App.css';
import '../css/Login.css';

function EmailLogin() {

    return (
        <div>
            <div style={{textAlign : "center"}}>
                <h2 style={{ display: "inline-block" }}>Email : &nbsp;</h2><TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </div>
            <div style={{textAlign : "center"}}>
                <h2 style={{ display: "inline-block" }}>Password : &nbsp;</h2><TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </div>
        </div>
    );
}

export default EmailLogin;