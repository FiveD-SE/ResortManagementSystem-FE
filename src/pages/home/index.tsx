import { Box, Button, Typography } from '@mui/material';
import Categories from './components/Categories';
import AccommodationList from './components/AccommodationList';
import { useMeQuery, useSendVerifyEmailMutation } from '../../apis/authApi';
import CustomDialog from '../../components/CustomDialog';
import Cookies from 'js-cookie';
import { IUser } from '../../types/user';
import { useState, useEffect } from 'react';

const Home = () => {
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const userCookie: IUser | undefined = Cookies.get('user') ? (JSON.parse(Cookies.get('user')!) as IUser) : undefined;

  const { data } = useMeQuery(undefined, {
    pollingInterval: 10000,
    skipPollingIfUnfocused: true,
    skip: userCookie?.isVerified === undefined || userCookie?.isVerified,
  });

  const [sendVerifyEmail] = useSendVerifyEmailMutation();

  useEffect(() => {
    if (userCookie && userCookie.isVerified === false) {
      setShowVerifyModal(true);
    }
  }, [userCookie]);

  useEffect(() => {
    if (data && data.isVerified && userCookie) {
      const updatedUser = { ...userCookie, isVerified: true };
      Cookies.set('user', JSON.stringify(updatedUser));
      setShowVerifyModal(false);
    }
  }, [data, userCookie]);

  const handleSendVerifyEmail = () => {
    console.log('Sending verification email...');
    if (userCookie) {
      sendVerifyEmail({ email: userCookie.email });
    }
    setShowVerifyModal(false);
  };

  return (
    <Box sx={{ backgroundColor: 'white.50' }}>
      <Categories />
      <AccommodationList />
      <CustomDialog open={showVerifyModal} onClose={() => setShowVerifyModal(false)}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Verify Your Email
          </Typography>
          <Typography variant="body1">
            Please verify your email address to access all features of the application.
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSendVerifyEmail}>
              Send Verification Email
            </Button>
            <Button variant="outlined" onClick={() => setShowVerifyModal(false)}>
              Close
            </Button>
          </Box>
        </Box>
      </CustomDialog>
    </Box>
  );
};

export default Home;
