import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';

import EditIcon from '@mui/icons-material/Edit';
import { Button } from 'reactstrap';


export default function BasicSpeedDial(props :{click : any}) {
  console.log(props.click);
  return (
    <Box>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        onClick={props.click}
        sx={{ position: 'fixed', top : '80%' , right : '16px'}}
        icon={<EditIcon  />}
      >
      </SpeedDial>
    </Box>
  );
}