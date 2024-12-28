import { Box, Grid2 as Grid } from '@mui/material';
import AccommodationCard from './AccommodationCard';
import AccommodationCardSkeleton from './AccommodationCardSkeleton';
// import { faker } from '@faker-js/faker';
import { useGetRoomsQuery } from '../../../apis/roomApi';

// interface AccommodationData {
//   images: string[];
//   location: string;
//   rating: number;
//   startDate: string;
//   endDate: string;
//   price: number;
//   isSuperhost: boolean;
// }

// const generateFakeData = (count: number): AccommodationData[] => {
//   return Array.from({ length: count }).map(() => ({
//     images: Array.from({ length: faker.number.int({ min: 3, max: 10 }) }, () => faker.image.avatarGitHub()),
//     location: faker.location.city() + ', ' + faker.location.country(),
//     rating: faker.number.float({ min: 3, max: 5, fractionDigits: 1 }),
//     startDate: faker.date.future().toISOString(),
//     endDate: faker.date.future({ years: 1 }).toISOString(),
//     price: faker.number.float({ min: 50, max: 500, fractionDigits: 2 }),
//     isSuperhost: faker.datatype.boolean(),
//   }));
// };

// const fakeData = generateFakeData(12);

const AccommodationList = () => {
  const { data, isLoading } = useGetRoomsQuery({ page: 1, limit: 36 });

  const handleCardClick = (roomId: string) => {
    window.open(`/rooms/${roomId}`, '_blank');
  };

  return (
    <Box sx={{ pt: 2, px: 5 }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 1, md: 2 }}>
        {isLoading &&
          Array.from({ length: 36 }).map((_, index) => (
            <Grid key={`skeleton-${index}`} size={{ xs: 12, sm: 12, md: 2 }}>
              <AccommodationCardSkeleton />
            </Grid>
          ))}
        {!isLoading &&
          data &&
          (Array.isArray(data) ? data : data.docs).map((item: any, index) => (
            <Grid key={item.id} size={{ xs: 12, sm: 12, md: 2 }}>
              <AccommodationCard
                images={item.images}
                location={item.roomNumber}
                startDate={item.startDate}
                endDate={item.endDate}
                pricePerNight={item.pricePerNight}
                onCardClick={() => handleCardClick(item._id)}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default AccommodationList;
