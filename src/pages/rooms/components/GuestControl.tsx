import { AddRounded, RemoveRounded } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

interface GuestControlProps {
  label: string;
  description: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  disabledIncrement?: boolean;
}

const GuestControl: React.FC<GuestControlProps> = ({
  label,
  description,
  value,
  onIncrement,
  onDecrement,
  disabledIncrement = false,
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
    <Box sx={{ flex: 1 }}>
      <Typography variant="body1" sx={{ fontWeight: 600, color: 'black.500' }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: 'black.400' }}>
        {description}
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'flex-end' }}>
      <IconButton
        disabled={value <= (label === 'Adults' ? 1 : 0)}
        size="small"
        sx={{ border: 1, borderColor: 'black.100' }}
        onClick={onDecrement}
      >
        <RemoveRounded sx={{ color: 'black.500' }} />
      </IconButton>
      <Typography variant="body1" sx={{ fontWeight: 600, color: 'black.500' }}>
        {value}
      </Typography>
      <IconButton
        disabled={disabledIncrement}
        size="small"
        sx={{ border: 1, borderColor: 'black.100' }}
        onClick={onIncrement}
      >
        <AddRounded sx={{ color: 'black.500' }} />
      </IconButton>
    </Box>
  </Box>
);

export default GuestControl;
