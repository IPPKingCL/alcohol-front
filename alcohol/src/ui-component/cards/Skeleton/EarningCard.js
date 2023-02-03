// material-ui
import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

// ==============================|| SKELETON - EARNING CARD ||============================== //

const EarningCard = () => (

    <CardWrapper border={false} content={false} onClick={() => { console.log(image) }}>
        <Box sx={{ p: 2.25 }}>
            <Skeleton variant="rectangular" width={44} height={44} />
        </Box>

    </CardWrapper>

);
export default EarningCard;
