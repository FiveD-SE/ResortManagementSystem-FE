import Cookies from 'js-cookie';
import { useAppDispatch } from '../stores/store';
import { logoutSuccess } from '../stores/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        Cookies.remove('user');

        dispatch(logoutSuccess());

        navigate('/login');
    };

    return handleLogout;
};

export default useLogout;
