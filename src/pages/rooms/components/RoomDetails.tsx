import { Grid } from '@mui/material';
import RoomOverview from './RoomOverview';
import KeyFeatures from './KeyFeatures';
import Amenities from './Amenities';
import ReservationCard from './ReservationCard';
import { faker } from '@faker-js/faker';
import { CalendarTodayRounded, VpnKeyRounded, WorkRounded } from '@mui/icons-material';
import { mappingAmenities } from '../../../utils/amenitiesUtils';

const generateFakeReviews = (count = 10) => {
  return Array.from({ length: count }, () => ({
    reviewId: faker.string.uuid(),
    customerId: faker.string.uuid(),
    roomId: faker.datatype.boolean() ? faker.string.uuid() : undefined,
    serviceId: faker.datatype.boolean() ? faker.string.uuid() : undefined,
    rating: faker.number.int({ min: 1, max: 5 }),
    comment: faker.datatype.boolean() ? faker.lorem.sentence() : undefined,
    createdAt: faker.date.past(),
  }));
};

const generateFakeRoomType = () => ({
  typeName: faker.commerce.productName(),
  basePrice: faker.number.float({ min: 50, max: 500, fractionDigits: 2 }),
  guestAmount: faker.number.int({ min: 1, max: 8 }),
  bedAmount: faker.number.int({ min: 1, max: 4 }),
  bedroomAmount: faker.number.int({ min: 1, max: 3 }),
  sharedBathAmount: faker.number.int({ min: 0, max: 2 }),
});

const generateFakeKeyFeatures = (count = 3) => {
  const icons = [WorkRounded, CalendarTodayRounded, VpnKeyRounded];
  return Array.from({ length: count }, () => ({
    icon: icons[Math.floor(Math.random() * icons.length)],
    title: faker.lorem.words(2),
    description: faker.lorem.sentence(),
  }));
};

const RoomDetails = () => {
  const reviews = generateFakeReviews(10);
  const roomType = generateFakeRoomType();
  const keyFeatures = generateFakeKeyFeatures(3);
  const amenitiesFromBackend = [
    'wifi',
    'parking',
    'kitchen',
    'breakfast',
    'pool',
    'gym',
    'balcony',
    'beach',
    'dryer',
    'waterfront',
  ];
  const amenities = mappingAmenities(amenitiesFromBackend);

  return (
    <Grid container spacing={6} sx={{ position: 'relative' }}>
      <Grid item xs={8}>
        <RoomOverview roomType={roomType} reviews={reviews} />
        <KeyFeatures keyFeatures={keyFeatures} />
        <Amenities amenities={amenities} />
      </Grid>
      <Grid item xs={4}>
        <ReservationCard />
      </Grid>
    </Grid>
  );
};

export default RoomDetails;
