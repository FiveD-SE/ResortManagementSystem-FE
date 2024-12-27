import { Grid, Typography } from '@mui/material';
import Icon from '@mui/icons-material/Category';
import React from 'react';

interface KeyFeaturesProps {
  icon?: React.ElementType;
  title: string;
  description: string;
}

const KeyFeatureItem = ({ icon: IconComponent = Icon, title, description }: KeyFeaturesProps) => {
  return (
    <Grid container sx={{ alignItems: 'center' }} spacing={2}>
      <Grid item>
        <IconComponent sx={{ fontSize: 24 }} />
      </Grid>
      <Grid item xs>
        <Typography variant="body1" sx={{ fontWeight: 500, color: 'black.500' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'black.400' }}>
          {description}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default KeyFeatureItem;
