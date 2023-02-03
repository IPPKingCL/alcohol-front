// material-ui
import { styled, Box, Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import MainCard from '../../cards/MainCard';

// ==============================|| SKELETON - EARNING CARD ||============================== //

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

const EarningCard = () => (
    

    <CardWrapper border={false} content={false}>
        <Box sx={{ p: 2.25 }}>
            <Skeleton variant="rectangular" width={44} height={44} />
        </Box>

    </CardWrapper>

);
export default EarningCard;
