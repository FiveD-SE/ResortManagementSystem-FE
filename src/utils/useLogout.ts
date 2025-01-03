import Cookies from 'js-cookie';
import { useAppDispatch } from '../stores/store';
import { logoutSuccess } from '../stores/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { clearTokens } from './tokenUtils';

const useLogout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        clearTokens();
        Cookies.remove('user');

        dispatch(logoutSuccess());

        navigate('/login');
    };

    return handleLogout;
};

export default useLogout;
