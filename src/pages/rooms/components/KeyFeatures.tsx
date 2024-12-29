import { Box } from '@mui/material';
import KeyFeatureItem from './KeyFeatureItem';
import { getRandomIcon, keyFeatures } from '../../../constants/keyFeatures';

interface KeyFeaturesProps {
  keyFeatures: string[];
}

const KeyFeatures = ({ keyFeatures: selectedFeatures }: KeyFeaturesProps) => {
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
      {selectedFeatures.map((featureKey, index) => {
        const feature = keyFeatures[featureKey];
        const displayIcon = feature ? feature.icon : getRandomIcon();
        const displayTitle = feature ? feature.title : featureKey;
        const displayDescription = feature ? feature.description : '';

        return <KeyFeatureItem key={index} icon={displayIcon} title={displayTitle} description={displayDescription} />;
      })}
    </Box>
  );
};

export default KeyFeatures;
