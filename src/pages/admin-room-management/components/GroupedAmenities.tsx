import React from 'react';
import { Box, Button, Collapse } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import AmenityItem from './AmenityItem';
import { amenities } from '../../../constants/amenities';

interface GroupedAmenitiesProps {
  selectedAmenities: string[];
  onSelectedAmenity: (selected: string[]) => void;
}

const GroupedAmenities = ({ selectedAmenities, onSelectedAmenity }: GroupedAmenitiesProps) => {
  const groupedAmenities = React.useMemo(() => {
    return Object.values(amenities).reduce((acc, amenity) => {
      if (!acc[amenity.category]) acc[amenity.category] = [];
      acc[amenity.category].push(amenity);
      return acc;
    }, {} as Record<string, typeof amenities[keyof typeof amenities][]>);
  }, []);

  const [collapsedCategories, setCollapsedCategories] = React.useState<Record<string, boolean>>(
    Object.keys(groupedAmenities).reduce((acc, category) => {
      acc[category] = false;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleCategory = (category: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSelectAmenity = (key: string) => {
    const newSelected = selectedAmenities.includes(key)
      ? selectedAmenities.filter((item) => item !== key)
      : [...selectedAmenities, key];
    onSelectedAmenity(newSelected);
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {Object.entries(groupedAmenities).map(([category, items]) => (
        <Box key={category}>
          <Button
            fullWidth
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              textTransform: 'none',
              fontSize: 16,
              fontWeight: 500,
              color: 'black.900',
              padding: '8px 16px',
              bgcolor: 'white.50',
              borderRadius: 2,
              transition: 'all 0.3s',
              ":hover": {
                scale: 1.01,
              },
            }}
            onClick={() => toggleCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
            {collapsedCategories[category] ? <ExpandLess /> : <ExpandMore />}
          </Button>

          <Collapse in={collapsedCategories[category]} timeout="auto" unmountOnExit>
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 2,
              padding: 2,
            }}>
              {items.map((amenity, index) => (
                <AmenityItem
                  key={index}
                  title={amenity.title}
                  icon={amenity.icon}
                  selected={selectedAmenities.includes(Object.keys(amenities).find(key => amenities[key] === amenity) ?? '')}
                  onSelected={() => handleSelectAmenity(Object.keys(amenities).find(key => amenities[key] === amenity)!)}
                />
              ))}
            </Box>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
};

export default GroupedAmenities;
