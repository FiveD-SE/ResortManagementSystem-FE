import { amenities } from '../constants/amenities';

type AmenityKey = keyof typeof amenities;

export const mappingAmenities = (amenityNames: AmenityKey[]) => {
  return amenityNames
    .map((name: AmenityKey) => {
      const amenity = amenities[name];
      return amenity
        ? {
            title: amenity.title,
            icon: amenity.icon,
          }
        : null;
    })
    .filter(Boolean);
};
