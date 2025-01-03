import { createApi } from '@reduxjs/toolkit/query/react';
import { ADMIN_DASHBOARD_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQuery } from './axiosInstance';
import { ICustomerGrowth, IRevenue, IRoomAvailability, IRoomTypeRevenue, IRoomTypeStatistic, IServiceRevenue, IServiceTypeStatistic, IYearlyRevenue } from '../types/statistic';

export const adminDashboardApi = createApi({
    reducerPath: 'adminDashboardApi',
    baseQuery: axiosBaseQuery({
        baseUrl: ADMIN_DASHBOARD_ENDPOINT,
    }),
    endpoints: (builder) => ({
        getDailyRevenue: builder.query<IRevenue, void>({
            query: () => ({
                url: '/daily-revenue',
                method: 'GET',
            })
        }),
        getCustomerGrowth: builder.query<ICustomerGrowth, void>({
            query: () => ({
                url: '/daily-customer-growth',
                method: 'GET',
            })
        }),
        getRoomAvailabilityToday: builder.query<IRoomAvailability, void>({
            query: () => ({
                url: '/room-availability-today',
                method: 'GET',
            })
        }),
        getServiceRevenue: builder.query<IServiceRevenue[], void>({
            query: () => ({
                url: '/revenue-by-service',
                method: 'GET',
            })
        }),
        getRoomTypeRevenue: builder.query<IRoomTypeRevenue[], void>({
            query: () => ({
                url: '/revenue-by-room-type',
                method: 'GET',
            })
        }),
        getYearlyRevenue: builder.query<IYearlyRevenue, void>({
            query: () => ({
                url: '/yearly-revenue',
                method: 'GET',
            })
        }),
        getRoomCountByRoomType: builder.query<IRoomTypeStatistic[], void>({
            query: () => ({
                url: '/room-count-by-room-type',
                method: 'GET',
            })
        }),
        getServiceCountByServiceType: builder.query<IServiceTypeStatistic[], void>({
            query: () => ({
                url: '/service-count-by-service-type',
                method: 'GET',
            })
        })
    }),
});

export const { useGetCustomerGrowthQuery, useGetDailyRevenueQuery, useGetRoomAvailabilityTodayQuery, useGetServiceRevenueQuery, useGetRoomTypeRevenueQuery, useGetYearlyRevenueQuery, useGetRoomCountByRoomTypeQuery, useGetServiceCountByServiceTypeQuery } = adminDashboardApi;