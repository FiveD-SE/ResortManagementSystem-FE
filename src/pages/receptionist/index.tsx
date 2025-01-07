import { Box } from '@mui/material';
import StatisticBox from './components/StatisticBox';
import ReceptionistTable from './components/ReceptionistTable';
import { useGetBookingsQuery, useGetBookingsStatusCountQuery } from '../../apis/bookingApi';
import StatisticBoxSkeleton from './components/StatisticBoxSkeleton';
import ReceptionistTableSkeleton from './components/ReceptionistTableSkeleton';

const Receptionist = () => {
  const {
    data: pendingBookingData,
    isLoading: pendingBookingLoading,
    refetch: refetchPending,
  } = useGetBookingsQuery({ page: 1, limit: 100, sortBy: 'createdAt', sortOrder: 'desc', filter: 'pending' });
  const {
    data: checkedInBookingData,
    isLoading: checkedInBookingLoading,
    refetch: refetchCheckedIn,
  } = useGetBookingsQuery({ page: 1, limit: 100, sortBy: 'createdAt', sortOrder: 'desc', filter: 'checked in' });
  const {
    data: checkedOutBookingData,
    isLoading: checkedOutBookingLoading,
    refetch: refetchCheckedOut,
  } = useGetBookingsQuery({ page: 1, limit: 100, sortBy: 'createdAt', sortOrder: 'desc', filter: 'checked out' });

  const { data, isLoading, refetch: refetchCount } = useGetBookingsStatusCountQuery();

  const handleRefetch = () => {
    refetchPending();
    refetchCheckedIn();
    refetchCheckedOut();
    refetchCount();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 4 }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
        {isLoading ? (
          <>
            <StatisticBoxSkeleton />
            <StatisticBoxSkeleton />
            <StatisticBoxSkeleton />
          </>
        ) : (
          <>
            <StatisticBox title="Pending" value={data?.pending ?? 0} />
            <StatisticBox title="Check-in" value={data?.checkedIn ?? 0} />
            <StatisticBox title="Check-out" value={data?.checkedOut ?? 0} />
          </>
        )}
      </Box>

      {pendingBookingLoading || checkedInBookingLoading || checkedOutBookingLoading ? (
        <ReceptionistTableSkeleton />
      ) : (
        <ReceptionistTable
          pendingBookingData={pendingBookingData}
          checkedInBookingData={checkedInBookingData}
          checkedOutBookingData={checkedOutBookingData}
          onBookingUpdate={handleRefetch}
        />
      )}
    </Box>
  );
};

export default Receptionist;
