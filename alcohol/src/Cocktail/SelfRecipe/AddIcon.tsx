import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';

import EditIcon from '@mui/icons-material/Edit';
//import AddIcon from '@mui/icons-material/Add';
//import AddIcon from '@mui/icons-material/Add';
import { Add } from '@mui/icons-material/';
import { SpeedDialIcon } from '@mui/material';

export default function AddIcon(props :{click : any}) {
    console.log(props.click);
    return (
      <Box>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          onClick={props.click}
          sx={{ position: 'fixed', top : '80%' , right : '16px'}}
          icon={<SpeedDialIcon/>}
        >
        </SpeedDial>
      </Box>
    );
  }