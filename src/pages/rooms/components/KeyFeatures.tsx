import { Box } from '@mui/material';
import KeyFeatureItem from './KeyFeatureItem';

interface KeyFeaturesProps {
  keyFeatures: { icon: React.ElementType; title: string; description: string }[];
}

const KeyFeatures = ({ keyFeatures }: KeyFeaturesProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 2,
        py: 3,
        borderTop: 1,
        borderColor: 'black.50',
      }}
    >
      {keyFeatures.map((feature, index) => (
        <KeyFeatureItem key={index} icon={feature.icon} title={feature.title} description={feature.description} />
      ))}
    </Box>
  );
};

export default KeyFeatures;
