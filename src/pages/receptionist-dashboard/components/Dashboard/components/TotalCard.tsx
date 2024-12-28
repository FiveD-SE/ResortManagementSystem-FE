import { Box, Stack, Typography } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import NoCrashIcon from '@mui/icons-material/NoCrash';

interface IProps {
  amount: number;
  type: string;
}

const TotalCard = (props: IProps) => {
  return (
    <Box sx={{ padding: 2, borderColor: '#B0B0B0', borderRadius: 3, borderWidth: 1, borderStyle: 'solid' }}>
      <Stack spacing={2}>
        {props.type === 'Check-in' && <DirectionsCarIcon sx={{ color: '#FFA500' }} />}
        {props.type === 'Check-out' && <NoCrashIcon sx={{ color: '#FF0000' }} />}
        {props.type === 'Staying' && <HomeIcon sx={{ color: '#32CD32' }} />}
        <Typography variant="h4" sx={{ fontFamily: 'Be Vietnam Pro', fontWeight: 600 }}>
          {props.amount}
        </Typography>
        <Typography variant="h4" sx={{ fontFamily: 'Be Vietnam Pro', fontWeight: 600 }}>
          {props.type}
        </Typography>
      </Stack>
    </Box>
  );
};

export default TotalCard;
