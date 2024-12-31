import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

interface IProps {
  amount: number;
  type: string;
  isLoading?: boolean;
}

const TotalCard = (props: IProps) => {
  return (
    <Box sx={{ padding: 2, borderColor: '#B0B0B0', borderRadius: 3, borderWidth: 1, borderStyle: 'solid' }}>
      <Stack spacing={2}>
        {props.type === 'Served' ? (
          <PauseCircleIcon sx={{ color: '#FF9800' }} />
        ) : (
          <CheckCircleIcon sx={{ color: '#4CAF50' }} />
        )}
        {props.isLoading ? (
          <CircularProgress sx={{ borderColor: 'gray' }} size={20} />
        ) : (
          <Typography variant="h4" sx={{ fontFamily: 'Be Vietnam Pro', fontWeight: 600 }}>
            {props.amount}
          </Typography>
        )}
        <Typography variant="h4" sx={{ fontFamily: 'Be Vietnam Pro', fontWeight: 600 }}>
          {props.type}
        </Typography>
      </Stack>
    </Box>
  );
};

export default TotalCard;
