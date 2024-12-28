import { useState } from 'react';
import { Box, Button, Divider, Link, Typography } from '@mui/material';
import CustomTextField from '../../../components/TextFieldCustom';
import { Google } from '@mui/icons-material';
import ForgotPasswordModal from './ForgotPasswordModal';
import { useLoginMutation } from '../../../apis/authApi';
import toast from 'react-hot-toast';
import { LOGIN_ERROR_MESSAGE } from '../../../constants/messages';
import { API_BASE_URL } from '../../../constants/endpoints';
import { useNavigate } from 'react-router-dom';
const SignInCard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    if (email === '' || password === '') {
      toast.error(LOGIN_ERROR_MESSAGE.INVALID_CREDENTIALS);
      return;
    }
    const response = await login({ email, password });
    if (response.error) {
      toast.error(LOGIN_ERROR_MESSAGE.INVALID_CREDENTIALS);
      return;
    }
  };

  const handleGoogleLogin = () => {
    window.open(`${API_BASE_URL}/auth/google`, '_self');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: { xs: '90vw', sm: '50vw', md: '40vw' },
        boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.2)',
        borderRadius: 6,
        padding: 4,
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Typography
          sx={{
            fontSize: 32,
            fontWeight: 600,
            color: 'black.900',
          }}
        >
          Sign in
        </Typography>
        <Typography
          sx={{
            fontSize: 40,
            fontWeight: 600,
            color: 'red.500',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          Brand
          <Typography
            component={'span'}
            sx={{
              fontSize: 40,
              fontWeight: 600,
              color: 'black.900',
            }}
          >
            name
          </Typography>
        </Typography>
      </Box>

      <CustomTextField
        title={'Email'}
        placeholder={'Enter your email'}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type={'email'}
      />

      <CustomTextField
        title={'Password'}
        placeholder={'Enter your password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={'password'}
      />

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Link
          sx={{
            fontSize: 14,
            fontWeight: 400,
            color: 'gray.300',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
              color: 'black.900',
            },
          }}
          onClick={() => setOpen(true)}
        >
          Forgot your password?
        </Link>
      </Box>

      {/* Button */}
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 2,
        }}
      >
        <Button
          sx={{
            display: 'flex',
            width: '100%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            textTransform: 'none',
            fontSize: 18,
            fontWeight: 600,
            color: 'white.50',
            bgcolor: 'primary.500',
            '&:hover': {
              bgcolor: 'primary.600',
            },
            '&:disabled': {
              bgcolor: 'gray.100',
              color: 'gray.200',
            },
          }}
          disabled={isLoading}
          onClick={handleLogin}
        >
          Sign in
        </Button>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            gap: 2,
          }}
        >
          <Divider
            sx={{
              flex: 1,
              display: 'flex',
              height: '1px',
              bgcolor: 'gray.200',
            }}
          />
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: 16,
              color: 'black.900',
            }}
          >
            OR
          </Typography>
          <Divider
            sx={{
              flex: 1,
              display: 'flex',
              height: '1px',
              bgcolor: 'gray.200',
            }}
          />
        </Box>
        {/* Google Login Button */}
        <Button
          sx={{
            display: 'flex',
            width: '100%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            textTransform: 'none',
            fontSize: 22,
            fontWeight: 600,
            color: 'black.900',
            bgcolor: 'white.50',
            border: '1px solid',
            borderColor: 'gray.200',
            gap: 1,
            '&:hover': {
              borderColor: 'gray.500',
            },
          }}
          onClick={handleGoogleLogin}
        >
          <Google sx={{ fontSize: 24 }} />
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 400,
              color: 'black.900',
            }}
          >
            Continue with Google
          </Typography>
        </Button>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 400,
              color: 'gray.300',
            }}
          >
            Don’t have an account?{' '}
            <Link
              href={'/register'}
              sx={{
                color: 'black.900',
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
      <ForgotPasswordModal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default SignInCard;
