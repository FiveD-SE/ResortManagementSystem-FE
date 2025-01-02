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
    HOME: '/admin/dashboard',
    STAFF_MANAGEMENT: '/admin/staff-management',
    CUSTOMER_MANAGEMENT: '/admin/customer-management',
    ROOM_MANAGEMENT: '/admin/room-management',
    SERVICE_MANAGEMENT: '/admin/service-management',
    PROMOTION_MANAGEMENT: '/admin/promotion-management',
    BOOKING_MANAGEMENT: '/admin/booking-management',
    PROFILE: '/admin/profile',
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
  ROOMS: '/rooms/:id/detail',
  THIRD_PARTY: '/third-party',
  BOOKINGS: '/bookings/:roomId',
};
