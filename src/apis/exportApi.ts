import { createApi } from '@reduxjs/toolkit/query/react';
import { ADMIN_DASHBOARD_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQueryExportExcel } from './axiosInstance';

// TODO: EXPORT EXCEL API
export const exportApi = createApi({
    reducerPath: 'exportApi',
    baseQuery: axiosBaseQueryExportExcel({
        baseUrl: ADMIN_DASHBOARD_ENDPOINT,
    }),
    endpoints: (builder) => ({
        exportExcel: builder.mutation<Blob, void>({
            query: () => ({
                url: '/export-excel',
                method: 'GET',
                responseType: 'blob',
            })
        }),

        // TODO: Export Customer Excel
        exportCustomerExcel: builder.mutation<Blob, void>({
            query: () => ({
                url: '/export-customer-excel',
                method: 'GET',
                responseType: 'blob',
            })
        }),

        // TODO: Export Staff Excel
        exportStaffExcel: builder.mutation<Blob, void>({
            query: () => ({
                url: '/export-staff-excel',
                method: 'GET',
                responseType: 'blob',
            })
        }),

        // TODO: Export Room Excel
        exportRoomExcel: builder.mutation<Blob, void>({
            query: () => ({
                url: '/export-room-excel',
                method: 'GET',
                responseType: 'blob',
            })
        }),

        // TODO: Export Servoce Excel
        exportServiceExcel: builder.mutation<Blob, void>({
            query: () => ({
                url: '/export-service-excel',
                method: 'GET',
                responseType: 'blob',
            })
        }),

        // TODO: Export Promotion Excel
        exportPromotionExcel: builder.mutation<Blob, void>({
            query: () => ({
                url: '/export-promotion-excel',
                method: 'GET',
                responseType: 'blob',
            })
        }),

        // TODO: Export Booking Excel
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