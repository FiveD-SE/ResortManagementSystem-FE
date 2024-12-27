import { Container } from '@mui/material';
import React from 'react';
import Header from './components/Header';
import ProfileList from './components/ProfileList';

const Profile = () => {
  return (
    <Container>
      <Header />
      <ProfileList />
    </Container>
  );
};

export default Profile;
