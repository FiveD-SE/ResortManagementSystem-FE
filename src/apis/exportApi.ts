import { createApi } from '@reduxjs/toolkit/query/react';
import { ADMIN_DASHBOARD_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQueryExportExcel } from './axiosInstance';
import { IExportRequest } from '../types/export';

export const exportApi = createApi({
    reducerPath: 'exportApi',
    baseQuery: axiosBaseQueryExportExcel({
        baseUrl: ADMIN_DASHBOARD_ENDPOINT,
    }),
    endpoints: (builder) => ({
        exportExcel: builder.mutation<Blob, IExportRequest>({
            query: (data) => ({
                url: '/export-excel',
                method: 'GET',
                responseType: 'blob',
                params: {
                    startDate: data.startDate,
                    endDate: data.endDate,
                }
            })
        }),

        exportCustomerExcel: builder.mutation<Blob, void>({
            query: () => ({
                url: '/export-customer-excel',
                method: 'GET',
                responseType: 'blob',
            })
        }),

        exportStaffExcel: builder.mutation<Blob, void>({
            query: () => ({
                url: '/export-staff-excel',
                method: 'GET',
                responseType: 'blob',
            })
        }),

        exportRoomExcel: builder.mutation<Blob, void>({
            query: () => ({
                url: '/export-room-excel',
                method: 'GET',
                responseType: 'blob',
            })
        }),

        exportServiceExcel: builder.mutation<Blob, void>({
            query: () => ({
                url: '/export-service-excel',
                method: 'GET',
                responseType: 'blob',
            })
        }),

        exportPromotionExcel: builder.mutation<Blob, void>({
            query: () => ({
                url: '/export-promotion-excel',
                method: 'GET',
                responseType: 'blob',
            })
        }),

        exportBookingExcel: builder.mutation<Blob, void>({
            query: () => ({
                url: '/export-booking-excel',
                method: 'GET',
                responseType: 'blob',
            })
        }),
    }),
});

export const {
    useExportExcelMutation,
    useExportCustomerExcelMutation,
    useExportStaffExcelMutation,
    useExportRoomExcelMutation,
    useExportServiceExcelMutation,
    useExportPromotionExcelMutation,
    useExportBookingExcelMutation,
} = exportApi;