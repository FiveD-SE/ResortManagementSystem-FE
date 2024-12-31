import { Grid } from '@mui/material';
import RoomOverview from './RoomOverview';
import KeyFeatures from './KeyFeatures';
import Amenities from './Amenities';
import ReservationCard from './ReservationCard';
import { IRating } from '../../../types/rating';
import { IRoomType } from '../../../types';

interface IRoomDetailsProps {
  ratings: IRating[];
  roomType: IRoomType;
  roomId: string;
}

const RoomDetails = ({ ratings, roomType, roomId }: IRoomDetailsProps) => {
  return (
    <Grid container spacing={6} sx={{ position: 'relative' }}>
      <Grid item xs={8}>
        <RoomOverview roomType={roomType} ratings={ratings} />
        <KeyFeatures keyFeatures={roomType.keyFeatures} />
        <Amenities amenities={roomType.amenities} />
      </Grid>
      <Grid item xs={4}>
        <ReservationCard roomType={roomType} roomId={roomId} />
      </Grid>
    </Grid>
  );
};

export default RoomDetails;
