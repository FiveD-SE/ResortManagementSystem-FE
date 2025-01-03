import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp?: number;
  [key: string]: unknown;
}

interface Token {
  exp?: number;
  [key: string]: unknown;
}

export const getAccessToken = () => {
  return Cookies.get('accessToken') || null;
};

export const getRefreshToken = () => {
  return Cookies.get('refreshToken') || null;
};

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    if (!token) return null;
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

export const getUserIdFromToken = () => {
  const token = getAccessToken();
  if (!token) return null;
  const decoded = decodeToken(token);
  return decoded ? decoded.userID || null : null;
};

export const isTokenExpired = (token: string): boolean => {
  const decoded: Token | null = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  return decoded.exp * 1000 < Date.now();
};

export const clearTokens = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

export const getResetPasswordTokenFromUrl = (url: string) => {
  const urlParams = new URLSearchParams(url);
  const resetPasswordToken = urlParams.get('token');

  return resetPasswordToken;
}