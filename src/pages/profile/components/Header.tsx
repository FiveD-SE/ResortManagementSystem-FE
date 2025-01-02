import { Box, Button, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import ChangePassword from './ProfileModal/ChangePassword';
import React from 'react';
import EditProfile from './ProfileModal/EditProfile';

interface IProps {
  user: any | null;
}

const Header = (props: IProps) => {
  const { user } = props;
  const [openChangePassword, setOpenChangePassword] = React.useState(false);
  const [openEditProfile, setOpenEditProfile] = React.useState(false);
  console.log(user);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', pb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          pt: 6,
          pb: 6,
          width: '100%',
          alignItems: 'center',
          position: 'relative',
          gap: 2,
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center' }}>
          <img
            src={user?.avatar || 'https://placehold.co/400x400.png'}
            style={{ width: 200, height: 200, borderRadius: 100 }}
          />
          <Box sx={{ flexDirection: 'column', justifyContent: 'space-between', height: 200 }}>
            <Typography sx={{ fontWeight: 'bold', fontFamily: 'Be Vietnam Pro', fontSize: 32, mb: 2 }}>
              {user?.firstName + ' ' + user?.lastName || 'Anonymous'}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, mb: 2 }}>
              <Typography sx={{ fontFamily: 'Be Vietnam Pro', fontSize: 28 }}>{user?.email || 'Anonymous'}</Typography>
              {user?.isVerified ? (
                <DoneIcon sx={{ color: '#00FF00', width: 28, heigth: 28 }} />
              ) : (
                <ClearIcon sx={{ color: '#f94449', width: 28, heigth: 28 }} />
              )}
              {user?.isVerified ? (
                <Typography sx={{ color: '#00FF00', fontFamily: 'Be Vietnam Pro', fontSize: 24 }}>Verified</Typography>
              ) : (
                <Typography sx={{ color: '#f94449', fontFamily: 'Be Vietnam Pro', fontSize: 24 }}>Not Verified</Typography>
              )}
            </Box>
            <Typography sx={{ fontFamily: 'Be Vietnam Pro', fontSize: 24 }}>{user?.role || 'Anonymous'}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: 200 }}>
          <Button
            variant="contained"
            sx={{ width: 200, height: 50, borderRadius: 3, backgroundColor: '#808080', mb: 2 }}
            onClick={() => setOpenEditProfile(true)}
          >
            Edit Profile
          </Button>
          <Button
            variant="contained"
            sx={{ width: 200, height: 50, borderRadius: 3, backgroundColor: '#808080' }}
            onClick={() => setOpenChangePassword(true)}
          >
            Change Password
          </Button>
        </Box>
      </Box>
      <ChangePassword open={openChangePassword} onClose={() => setOpenChangePassword(false)} />
      <EditProfile open={openEditProfile} onClose={() => setOpenEditProfile(false)} />
    </Box>
  );
};

export default Header;
