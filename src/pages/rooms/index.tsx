import { Container } from '@mui/material';
import PhotoGallery from './components/PhotoGallery';
import RoomDetails from './components/RoomDetails';
import Ratings from './components/Ratings';
import GuestReviews from './components/GuestReviews';
import ThingsToKnow from './components/ThingsToKnow';
import {
  ChatBubbleOutlineRounded,
  CheckCircleOutline,
  CleaningServicesOutlined,
  LocalOfferOutlined,
  MapOutlined,
  VpnKeyOutlined,
} from '@mui/icons-material';

const imageData = [
  {
    src: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1080728363869690124/original/3263146e-6189-465a-95ac-1ec882fa3e8b.jpeg?im_w=1200&im_format=avif',
    alt: 'Image 1',
    featured: true,
  },
  {
    src: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1080728363869690124/original/0f38a827-8d1d-4bf1-a2eb-978fafb84492.jpeg?im_w=720&im_format=avif',
    alt: 'Image 2',
  },
  {
    src: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1080728363869690124/original/1dc1f040-af48-4149-b297-4dca1c72e256.jpeg?im_w=720&im_format=avif',
    alt: 'Image 3',
  },
  {
    src: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1080728363869690124/original/8de3fc0c-174e-47a8-82e4-37458c85b273.jpeg?im_w=720&im_format=avif',
    alt: 'Image 4',
  },
  {
    src: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1080728363869690124/original/becd79b0-bc25-49af-90f0-dfa6edec90f8.jpeg?im_w=720&im_format=avif',
    alt: 'Image 5',
  },
];

const Rooms = () => {
  const detailedRatings = [
    { label: 'Cleanliness', value: 4.8, icon: CleaningServicesOutlined },
    { label: 'Accuracy', value: 4.9, icon: CheckCircleOutline },
    { label: 'Check-in', value: 4.7, icon: VpnKeyOutlined },
    { label: 'Communication', value: 5.0, icon: ChatBubbleOutlineRounded },
    { label: 'Location', value: 4.6, icon: MapOutlined },
    { label: 'Value', value: 4.9, icon: LocalOfferOutlined },
  ];
  const averageRating = 4.82;

  const totalReviews = 134;

  const overallRatings = [
    { label: '5', value: 4.9 },
    { label: '4', value: 4.5 },
    { label: '3', value: 3.2 },
    { label: '2', value: 2.1 },
    { label: '1', value: 1.5 },
  ];

  return (
    <Container>
      <PhotoGallery images={imageData} />
      <RoomDetails />
      <Ratings detailedRatings={detailedRatings} />
      <GuestReviews
        detailedRatings={detailedRatings}
        averageRating={averageRating}
        totalReviews={totalReviews}
        overallRatings={overallRatings}
      />
      <ThingsToKnow />
    </Container>
  );
};

export default Rooms;
