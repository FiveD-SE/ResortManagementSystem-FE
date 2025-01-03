import { Avatar, Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import CustomInputForm from '../../../components/CustomInputForm';
import React from 'react';
import { useChangeAvatarMutation, useChangeProfileMutation } from '../../../apis/userApi';
import toast from 'react-hot-toast';
import { useMeQuery } from '../../../apis/authApi';
import { useLocation } from 'react-router-dom';
import ProfileBackground from '../../../components/ProfileBackGround';

const ProfileList = () => {
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [avatar, setAvatar] = React.useState<File>();
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');

  const location = useLocation();
  const { data: user, refetch } = useMeQuery({});
  const [changeProfileMutation, { isLoading }] = useChangeProfileMutation();
  const [changeAvatarMutation] = useChangeAvatarMutation();

  React.useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);

      fetch(user.avatar)
        .then((response) => response.blob())
        .then((blob) => {
          const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
          setAvatar(file);
        });
    }
  }, [user]);

  // Refetch user data whenever the screen is navigated to
  React.useEffect(() => {
    refetch();
  }, [location.pathname, refetch]);

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatar(e.target.files[0]);
    }

    const formData = new FormData();
    formData.append('avatarFile', e.target.files![0]);

    changeAvatarMutation(formData);
    toast.success('Change avatar successfully');
  };

  const validateProfile = () => {
    if (!firstName) {
      toast.error('First name and last name are required');
      return false;
    }
    if (!lastName) {
      toast.error('First name and last name are required');
      return false;
    }
    if (!phoneNumber) {
      toast.error('Phone number is required');
      return false;
    }
    return true;
  };

  const handleUpdateProfile = async () => {
    if (!validateProfile()) return;

    try {
      await changeProfileMutation({ firstName: firstName, lastName: lastName, phoneNumber: phoneNumber });
      toast.success('Update profile successfully');
    } catch (error) {
      toast.error('Update profile failed');
    }
  };

  const handleCancel = () => {
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
    setPhoneNumber(user?.phoneNumber || '');
  };

  const disabled =
    !firstName ||
    !lastName ||
    !phoneNumber ||
    isLoading ||
    (firstName === user?.firstName && lastName === user?.lastName && phoneNumber === user?.phoneNumber);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', paddingBottom: 4 }}>
      <ProfileBackground />
      <Container>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginX: 4, gap: 1 }}>
            <label htmlFor="avatar">
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  marginTop: -10,
                  color: 'white.50',
                  bgcolor: 'primary.500',
                  cursor: 'pointer',
                  ':hover': { scale: 1.01 },
                }}
                src={avatar ? URL.createObjectURL(avatar) : ''}
              />
            </label>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginTop: 2,
                gap: 2,
              }}
            >
              <Typography sx={{ fontSize: 24, fontWeight: 600, color: 'black.900' }}>
                {user?.firstName} {user?.lastName}
              </Typography>
            </Box>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleChangeAvatar(e)}
              style={{ display: 'none' }}
              id="avatar"
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, marginX: 4, marginTop: 4 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <CustomInputForm
                label="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                type="text"
              />
              <CustomInputForm
                label="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                type="text"
              />
            </Box>
            <CustomInputForm
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              type="tel"
            />
            <CustomInputForm
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              type="email"
              error={!!email && !/^\S+@\S+\.\S+$/.test(email)}
              helperText={email && !/^\S+@\S+\.\S+$/.test(email) ? 'Invalid email address' : ''}
              disabled={true}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
              <Button
                sx={{
                  width: 100,
                  fontSize: 14,
                  fontWeight: 600,
                  textTransform: 'none',
                  padding: '8px 24px',
                  bgcolor: 'white.50',
                  color: '#5C5C5C',
                  border: '1px solid #E0E0E0',
                  ':hover': { borderColor: 'black.900' },
                  borderRadius: 2,
                  ':disabled': { color: 'gray.200', bgcolor: 'gray.100' },
                }}
                onClick={handleCancel}
                disabled={disabled}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  minWidth: 100,
                  fontSize: 14,
                  fontWeight: 600,
                  textTransform: 'none',
                  padding: '8px 24px',
                  bgcolor: 'primary.500',
                  color: 'white.50',
                  border: '1px solid #FF385C',
                  ':hover': { bgcolor: 'primary.600' },
                  borderRadius: 2,
                  ':disabled': { color: 'gray.200', bgcolor: 'gray.100', borderColor: 'gray.100' },
                }}
                onClick={handleUpdateProfile}
                disabled={disabled}
              >
                {isLoading ? <CircularProgress size={24} sx={{ color: 'white.50' }} /> : 'Save changes'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProfileList;
