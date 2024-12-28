export const ROUTES = {
  AUTH: {
    REGISTER: '/register',
    LOGIN: '/login',
    LOGOUT: '/logout',
    REFRESH_TOKENS: '/refresh-tokens',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
  },
  HOME: '/',
  ADMIN: {
    HOME: '/admin',
  },
  RECEPTIONIST: {
    HOME: '/receptionist',
  },
  SERVICE_STAFF: {
    HOME: '/service-staff',
  },
  PROFILE: '/profile',
  NOT_FOUND: '*',
  TRIPS: {
    HOME: '/trips',
    DETAIL: '/trips/detail/:id',
    REVIEW: '/trips/review/:id',
  },
  ROOMS: '/rooms',
};
