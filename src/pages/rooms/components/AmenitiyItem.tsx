import { SvgIconComponent } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';

interface AmenityItemProps {
  icon?: SvgIconComponent;
  title: string;
  lineThrough?: boolean;
}

const AmenityItem = ({ icon: Icon, title, lineThrough }: AmenityItemProps) => {
  return (
    <Grid item xs={12} sm={6}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {Icon && <Icon sx={{ fontSize: 24 }} />}
        <Typography variant="body2" sx={{ textDecoration: lineThrough ? 'line-through' : 'none', whiteSpace: 'nowrap' }}>
          {title}
        </Typography>
      </Box>
    </Grid>
  );
};

export default AmenityItem;
