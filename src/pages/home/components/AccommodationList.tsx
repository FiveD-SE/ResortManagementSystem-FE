import { Box, Grid2 as Grid } from '@mui/material';
import AccommodationCard from './AccommodationCard';
import AccommodationCardSkeleton from './AccommodationCardSkeleton';
import { faker } from '@faker-js/faker';

interface AccommodationData {
  images: string[];
  location: string;
  rating: number;
  startDate: string;
  endDate: string;
  price: number;
  isSuperhost: boolean;
}

const generateFakeData = (count: number): AccommodationData[] => {
  return Array.from({ length: count }).map(() => ({
    images: Array.from({ length: faker.number.int({ min: 3, max: 10 }) }, () => faker.image.avatarGitHub()),
    location: faker.location.city() + ', ' + faker.location.country(),
    rating: faker.number.float({ min: 3, max: 5, fractionDigits: 1 }),
    startDate: faker.date.future().toISOString(),
    endDate: faker.date.future({ years: 1 }).toISOString(),
    price: faker.number.float({ min: 50, max: 500, fractionDigits: 2 }),
    isSuperhost: faker.datatype.boolean(),
  }));
};

const fakeData = generateFakeData(12);

const AccommodationList = () => {
  const handleCardClick = () => {
    window.open('/rooms', '_blank');
  };
  return (
    <Box sx={{ pt: 2, px: 5 }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 1, md: 2 }}>
        {fakeData.map((data, index) => (
          <Grid key={index} size={{ xs: 12, sm: 12, md: 2 }}>
            <AccommodationCard
              images={data.images}
              location={data.location}
              rating={data.rating}
              startDate={data.startDate}
              endDate={data.endDate}
              price={data.price}
              isSuperhost={data.isSuperhost}
              onCardClick={handleCardClick}
            />
          </Grid>
        ))}
        {Array.from({ length: 12 }).map((_, index) => (
          <Grid key={`skeleton-${index}`} size={{ xs: 12, sm: 12, md: 2 }}>
            <AccommodationCardSkeleton />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AccommodationList;
