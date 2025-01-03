import { createApi } from '@reduxjs/toolkit/query/react';
import { ADMIN_DASHBOARD_ENDPOINT } from '../constants/endpoints';
import { axiosBaseQueryExportExcel } from './axiosInstance';

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
        })
    }),
});

export const { useExportExcelMutation } = exportApi;