import { Grid, useMediaQuery } from '@mui/material';
import RoomOverview from './RoomOverview';
import KeyFeatures from './KeyFeatures';
import Amenities from './Amenities';
import ReservationCard from './ReservationCard';
import { IRating } from '../../../types/rating';
import { IRoom, IRoomType } from '../../../types';
import { Dayjs } from 'dayjs';

interface IRoomDetailsProps {
  ratings: IRating[];
  roomType: IRoomType;
  room?: IRoom;
  occupiedDates: { checkinDate: Dayjs; checkoutDate: Dayjs }[];
  ratingsRef?: React.RefObject<HTMLDivElement>;
}

const RoomDetails = ({ ratings, roomType, room, occupiedDates, ratingsRef }: IRoomDetailsProps) => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  return (
    <Grid container spacing={6} sx={{ position: 'relative' }}>
      <Grid item xs={12} md={8}>
        <RoomOverview roomType={roomType} ratings={ratings} ratingsRef={ratingsRef} />
        <KeyFeatures keyFeatures={roomType.keyFeatures} />
        <Amenities amenities={roomType.amenities} />
      </Grid>
      {!isSmallScreen && (
        <Grid item xs={12} md={4}>
          <ReservationCard roomType={roomType} room={room} occupiedDates={occupiedDates} />
        </Grid>
      )}
    </Grid>
  );
};

export default RoomDetails;
