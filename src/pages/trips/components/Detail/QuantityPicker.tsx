import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface QuantityPickerProps {
  initialQuantity: number;
  onChange: (newQuantity: number) => void;
  width?: string | number;
}

const QuantityPicker: React.FC<QuantityPickerProps> = ({ initialQuantity, onChange, width = 80 }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(1, quantity - 1);
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width }}>
      <IconButton
        onClick={handleDecrement}
        size="small"
        sx={{
          backgroundColor: 'black.50',
          '&:hover': {
            backgroundColor: 'black.100',
          },
        }}
      >
        <RemoveIcon sx={{ fontSize: 16, color: 'black.500' }} />
      </IconButton>
      <Typography variant="body2" sx={{ color: 'black.500', width: 20, textAlign: 'center' }}>
        {quantity}
      </Typography>
      <IconButton
        onClick={handleIncrement}
        size="small"
        sx={{
          backgroundColor: 'black.50',
          '&:hover': {
            backgroundColor: 'black.100',
          },
        }}
      >
        <AddIcon sx={{ fontSize: 16, color: 'black.500' }} />
      </IconButton>
    </Box>
  );
};

export default QuantityPicker;
