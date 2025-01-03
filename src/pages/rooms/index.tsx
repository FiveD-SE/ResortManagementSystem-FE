import { Container } from '@mui/material';
import PhotoGallery from './components/PhotoGallery';
import RoomDetails from './components/RoomDetails';
import Ratings from './components/Ratings';
import GuestReviews from './components/GuestReviews';
import ThingsToKnow from './components/ThingsToKnow';
import { useParams } from 'react-router-dom';
import { useGetRoomDetailByIdQuery } from '../../apis/roomApi';
import {
  ChatBubbleOutlineRounded,
  CheckCircleOutline,
  CleaningServicesOutlined,
  LocalOfferOutlined,
  MapOutlined,
  VpnKeyOutlined,
} from '@mui/icons-material';
import RoomDetailSkeleton from './components/RoomDetailSkeleton';
import { useEffect, useRef } from 'react';

const Rooms = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: roomDetail,
    isLoading,
    refetch,
  } = useGetRoomDetailByIdQuery(id ?? '', {
    skip: !id,
  });

  const averageRating = roomDetail?.ratings
    ? roomDetail.ratings.reduce((acc, rating) => acc + rating.average, 0) / (roomDetail.ratings.length || 1)
    : 0;

  const ratingCounts = roomDetail?.ratings
    ? roomDetail.ratings.reduce(
        (counts, rating) => {
          if (rating.average === 5) {
            counts.fiveStars++;
          } else if (rating.average >= 4) {
            counts.fourStars++;
          } else if (rating.average >= 3) {
            counts.threeStars++;
          } else if (rating.average >= 2) {
            counts.twoStars++;
          } else if (rating.average >= 1) {
            counts.oneStar++;
          }
          return counts;
        },
        {
          oneStar: 0,
          twoStars: 0,
          threeStars: 0,
          fourStars: 0,
          fiveStars: 0,
        },
      )
    : {
        oneStar: 0,
        twoStars: 0,
        threeStars: 0,
        fourStars: 0,
        fiveStars: 0,
      };

  const averageScores = roomDetail?.averageScores || {
    cleanliness: 0,
    accuracy: 0,
    checkIn: 0,
    communication: 0,
    location: 0,
    value: 0,
  };

  const totalReviews = roomDetail?.ratings.length || 1;

  const overallRatings = [
    { label: '5', value: (ratingCounts.fiveStars / totalReviews) * 5 || 0 },
    { label: '4', value: (ratingCounts.fourStars / totalReviews) * 5 || 0 },
    { label: '3', value: (ratingCounts.threeStars / totalReviews) * 5 || 0 },
    { label: '2', value: (ratingCounts.twoStars / totalReviews) * 5 || 0 },
    { label: '1', value: (ratingCounts.oneStar / totalReviews) * 5 || 0 },
  ];

  const detailedRatings = [
    { label: 'Cleanliness', value: averageScores.cleanliness, icon: CleaningServicesOutlined },
    { label: 'Accuracy', value: averageScores.accuracy, icon: CheckCircleOutline },
    { label: 'Check-in', value: averageScores.checkIn, icon: VpnKeyOutlined },
    {
      label: 'Communication',
      value: averageScores.communication,
      icon: ChatBubbleOutlineRounded,
    },
    { label: 'Location', value: averageScores.location, icon: MapOutlined },
    { label: 'Value', value: averageScores.value, icon: LocalOfferOutlined },
  ];

  const ratingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      {isLoading ? (
        <RoomDetailSkeleton />
      ) : (
        <Container>
          <PhotoGallery images={roomDetail?.room.images || []} />
          <RoomDetails
            room={roomDetail?.room}
            ratings={roomDetail?.ratings || []}
            roomType={
              roomDetail?.roomType ?? {
                id: '',
                typeName: '',
                description: '',
                basePrice: 0,
                guestAmount: 0,
                bedAmount: 0,
                bedroomAmount: 0,
                sharedBathAmount: 0,
                amenities: [],
                keyFeatures: [],
              }
            }
            occupiedDates={roomDetail?.occupiedDates || []}
            nextAvailableWeek={roomDetail?.nextAvailableWeek ?? { checkinDate: '', checkoutDate: '' }}
            ratingsRef={ratingsRef}
          />
          <div ref={ratingsRef}>
            <Ratings
              detailedRatings={detailedRatings}
              averageScores={
                roomDetail?.averageScores ?? {
                  cleanliness: 0,
                  accuracy: 0,
                  checkIn: 0,
                  communication: 0,
                  location: 0,
                  value: 0,
                }
              }
              ratingCounts={
                roomDetail?.ratingCounts ?? {
                  oneStar: 0,
                  twoStars: 0,
                  threeStars: 0,
                  fourStars: 0,
                  fiveStars: 0,
                }
              }
              averageRating={averageRating}
              ratingCount={roomDetail?.ratingCount || 0}
            />
          </div>
          {roomDetail?.ratings && roomDetail?.ratings.length > 0 && (
            <GuestReviews
              detailedRatings={detailedRatings}
              averageRating={averageRating}
              totalReviews={totalReviews}
              overallRatings={overallRatings}
              ratings={roomDetail?.ratings || []}
            />
          )}
          <ThingsToKnow />
        </Container>
      )}
    </>
  );
};

export default Rooms;
