import { loginSuccess, logoutSuccess } from "../stores/slices/userSlice";
import axios from "axios";
import { VITE_API_URL } from "./config";
import { AppDispatch } from "../stores/store";

const AUTH_ENDPOINT = `${VITE_API_URL}/auth`;

const register = async (name: string, email: string, password: string) => {
    try {
        const response = await axios.post(`${AUTH_ENDPOINT}/register`, {
            name,
            email,
            password,
        });

        return response;
    } catch (error) {
        console.error(error);
    }
}

const login = async (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.post(`${AUTH_ENDPOINT}/login`, {
            email,
            password,
        });
        dispatch(loginSuccess(response.data.user.role));
        return response;
    } catch (error) {
        console.error(error);
    }
}

const logout = async () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.post(`${AUTH_ENDPOINT}/logout`);
        dispatch(logoutSuccess());
        return response;
    } catch (error) {
        console.error(error);
    }
}

const authApi = {
    register,
    login,
    logout,
}

export default authApi;