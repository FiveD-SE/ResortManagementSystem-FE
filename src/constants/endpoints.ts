export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const AUTH_ENDPOINT = `${API_BASE_URL}/auth`;
export const USER_ENDPOINT = `${API_BASE_URL}/users`;
export const ROOM_ENDPOINT = `${API_BASE_URL}/rooms`;
export const ROOM_TYPE_ENDPOINT = `${API_BASE_URL}/room-types`;
export const BOOKING_ENDPOINT = `${API_BASE_URL}/bookings`;
export const SERVICE_ENDPOINT = `${API_BASE_URL}/services`;
export const SERVICE_TYPE_ENDPOINT = `${API_BASE_URL}/service-types`;
export const PROMOTION_ENDPOINT = `${API_BASE_URL}/promotions`;
export const ADMIN_USER_ENDPOINT = `${API_BASE_URL}/admin/users`;
export const ADMIN_DASHBOARD_ENDPOINT = `${API_BASE_URL}/admin-dashboard`;