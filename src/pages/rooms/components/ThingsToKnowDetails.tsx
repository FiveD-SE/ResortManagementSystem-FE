import { SvgIconComponent } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

interface ThingsToKnowDetailsProps {
  icon: SvgIconComponent | null;
  detail: string;
}

const ThingsToKnowDetails = ({ icon: Icon, detail }: ThingsToKnowDetailsProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 3 }}>
      {Icon ? <Icon /> : <Box sx={{ width: 24, height: 24 }}></Box>}
      <Typography variant="body1">{detail}</Typography>
    </Box>
  );
};

export default ThingsToKnowDetails;
