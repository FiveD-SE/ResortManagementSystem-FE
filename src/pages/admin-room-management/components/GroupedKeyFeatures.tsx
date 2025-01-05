import { Box, Typography } from '@mui/material';
import KeyFeatureItem from './KeyFeatureItem';
import { keyFeatures } from '../../../constants/keyFeatures';
import { useState } from 'react';

interface GroupedKeyFeaturesProps {
    selectedKeyFeatures: string[];
    onSelectedKeyFeature: (selected: string[]) => void;
}

const GroupedKeyFeatures = ({ selectedKeyFeatures, onSelectedKeyFeature }: GroupedKeyFeaturesProps) => {
    const [visibleCount, setVisibleCount] = useState(4);

    const handleSelectKeyFeature = (key: string) => {
        const newSelected = selectedKeyFeatures.includes(key)
            ? selectedKeyFeatures.filter((item) => item !== key)
            : [...selectedKeyFeatures, key];
        onSelectedKeyFeature(newSelected);
    };

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 4);
    };

    const visibleFeatures = Object.entries(keyFeatures).slice(0, visibleCount);

    return (
        <Box sx={{ mt: 2 }}>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 2
            }}>
                {visibleFeatures.map(([key, feature]) => (
                    <KeyFeatureItem
                        key={key}
                        title={feature.title}
                        icon={feature.icon}
                        description={feature.description}
                        selected={selectedKeyFeatures.includes(key)}
                        onSelected={() => handleSelectKeyFeature(key)}
                    />
                ))}
            </Box>
            {visibleCount < Object.keys(keyFeatures).length && (
                <Box sx={{ textAlign: 'end', padding: 2 }}>
                    <Typography sx={{ color: 'black.900', cursor: 'pointer', fontWeight: 600, fontSize: 14, ":hover": { color: 'primary.500' }, transition: 'all 0.3s' }} onClick={handleLoadMore}>
                        Load more
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default GroupedKeyFeatures;
