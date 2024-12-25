import { AddRounded, RemoveRounded } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

interface GuestControlProps {
  label: string;
  description: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const GuestControl: React.FC<GuestControlProps> = ({ label, description, value, onIncrement, onDecrement }) => (
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
      <IconButton size="small" sx={{ border: 1, borderColor: 'black.100', opacity: 0.5 }} onClick={onDecrement}>
        <RemoveRounded />
      </IconButton>
      <Typography variant="body1" sx={{ fontWeight: 600, color: 'black.500' }}>
        {value}
      </Typography>
      <IconButton size="small" sx={{ border: 1, borderColor: 'black.100' }} onClick={onIncrement}>
        <AddRounded />
      </IconButton>
    </Box>
  </Box>
);

export default GuestControl;
