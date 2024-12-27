import { SvgIconComponent } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import ThingsToKnowDetails from './ThingsToKnowDetails';

interface ThingsToKnowSectionProps {
  label: string;
  data: { icon: SvgIconComponent | null; detail: string }[];
}

const ThingsToKnowSection = ({ label, data }: ThingsToKnowSectionProps) => {
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 600, py: 2 }}>
        {label}
      </Typography>
      {data.map((item, index) => (
        <Box key={index}>
          <ThingsToKnowDetails icon={item.icon} detail={item.detail} />
          {index < data.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );
};

export default ThingsToKnowSection;
