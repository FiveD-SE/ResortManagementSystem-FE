import { Box, keyframes, Typography } from '@mui/material';
import '../../main.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useMeQuery } from '../../apis/authApi';
import { ROUTES } from '../../constants/routes';
import { Role } from '../../types';
import { useAppDispatch } from '../../stores/store';
import { loginSuccess } from '../../stores/slices/userSlice';

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const ThirdParty = () => {
  const [searchParams] = useSearchParams();
  const { data: user, isSuccess, refetch } = useMeQuery({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken) {
      Cookies.set('accessToken', accessToken);
    }

    if (refreshToken) {
      Cookies.set('refreshToken', refreshToken);
    }

    if (accessToken || refreshToken) {
      refetch();
    }
  }, [searchParams, refetch]);

  useEffect(() => {
    if (isSuccess && user) {
      Cookies.set('user', JSON.stringify(user));
      dispatch(loginSuccess(user));
      switch (user.role) {
        case Role.Admin:
          navigate(ROUTES.ADMIN.HOME);
          break;
        case Role.Receptionist:
          navigate(ROUTES.RECEPTIONIST.HOME);
          break;
        case Role.ServiceStaff:
          navigate(ROUTES.SERVICE_STAFF.HOME);
          break;
        default:
          navigate('/');
      }
    }
  }, [isSuccess, user, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: 'white.50',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          textAlign: 'center',
        }}
      >
        <div className="loader">
          <div className="truckWrapper">
            <div className="truckBody">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 198 93" className="trucksvg">
                <path
                  stroke-width="3"
                  stroke="#282828"
                  fill="#FF385C"
                  d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
                ></path>
                <path
                  stroke-width="3"
                  stroke="#282828"
                  fill="#7D7C7C"
                  d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
                ></path>
                <path
                  stroke-width="2"
                  stroke="#282828"
                  fill="#282828"
                  d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
                ></path>
                <rect stroke-width="2" stroke="#282828" fill="#FFFCAB" rx="1" height="7" width="5" y="63" x="187"></rect>
                <rect stroke-width="2" stroke="#282828" fill="#282828" rx="1" height="11" width="4" y="81" x="193"></rect>
                <rect
                  stroke-width="3"
                  stroke="#282828"
                  fill="#DFDFDF"
                  rx="2.5"
                  height="90"
                  width="121"
                  y="1.5"
                  x="6.5"
                ></rect>
                <rect stroke-width="2" stroke="#282828" fill="#DFDFDF" rx="2" height="4" width="6" y="84" x="1"></rect>
              </svg>
            </div>
            <div className="truckTires">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className="tiresvg">
                <circle stroke-width="3" stroke="#282828" fill="#282828" r="13.5" cy="15" cx="15"></circle>
                <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className="tiresvg">
                <circle stroke-width="3" stroke="#282828" fill="#282828" r="13.5" cy="15" cx="15"></circle>
                <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
              </svg>
            </div>
            <div className="road"></div>

            <svg
              viewBox="0 0 453.459 453.459"
              xmlns="http://www.w3.org/2000/svg"
              id="Capa_1"
              version="1.1"
              fill="#000000"
              className="lampPost"
            >
              <path
                d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993
c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514
c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16
c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914
h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75
v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795
V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z
M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017
h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"
              ></path>
            </svg>
          </div>
        </div>
        <Typography variant="h5" sx={{ my: 2 }}>
          Waiting for Google Login
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          sx={{
            animation: `${pulse} 2s ease-in-out infinite`,
            color: 'black.500',
          }}
        >
          Please complete the authentication process in the Google login window.
        </Typography>
      </Box>
    </Box>
  );
};

export default ThirdParty;
