import { Container } from '@mui/material';
import React from 'react';
import Header from './components/Header';
import ProfileList from './components/ProfileList';
import { useMeQuery } from '../../apis/authApi';

const Profile = () => {
  const { data: user, isSuccess, refetch } = useMeQuery({});
  return (
    <Container>
      <Header user={user} />
      <ProfileList />
    </Container>
  );
};

export default Profile;
