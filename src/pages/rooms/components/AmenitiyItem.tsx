import { Box, Grid, Typography } from '@mui/material';
import Icon from '@mui/icons-material/Category';
import React from 'react';

interface AmenityItemProps {
  icon?: React.ElementType;
  title: string;
  lineThrough?: boolean;
}

const AmenityItem = ({ icon: IconComponent = Icon, title, lineThrough }: AmenityItemProps) => {
  return (
    <Grid item xs={12} sm={6}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconComponent sx={{ fontSize: 24 }} />
        <Typography variant="body2" sx={{ textDecoration: lineThrough ? 'line-through' : 'none' }}>
          {title}
        </Typography>
      </Box>
    </Grid>
  );
};

export default AmenityItem;
