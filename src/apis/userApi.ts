import { createApi } from '@reduxjs/toolkit/query/react';
import { USER_ENDPOINT, ADMIN_USER_ENDPOINT } from '../constants/endpoints';
import { IUser, IUserApiRequest, IUserApiResponse } from '../types/user';
import { axiosBaseQuery } from './axiosInstance';
import { Role } from '../types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery({
    baseUrl: USER_ENDPOINT,
  }),
  endpoints: (builder) => ({
    getUserById: builder.query<any, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
    }),
    createUser: builder.mutation<any, { firstName: string; lastName: string; email: string; password: string; role: Role; serviceTypeId: string }>({
      query: (body) => ({
        url: '/',
        method: 'POST',
        data: body,
      }),
    }),
  }),
});


export const adminUserApi = createApi({
  reducerPath: 'adminUserApi',
  baseQuery: axiosBaseQuery({
    baseUrl: ADMIN_USER_ENDPOINT,
  }),
  endpoints: (builder) => ({
    adminGetUsersByRole: builder.query<IUserApiResponse, IUserApiRequest>({
      query: (params: IUserApiRequest) => ({
        url: `/${params.role}`,
        method: 'GET',
        params: {
          sortOrder: params.sortOrder,
          sortBy: params.sortBy,
          page: params.page,
          limit: params.limit,
        },
      }),
    }),
    deleteUser: builder.mutation<any, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
    updateUser: builder.mutation<any, Omit<IUser, 'avatar' | 'dob' | 'gender' | 'isVerified' | 'isActive' | 'email'>>({
      query: (data) => ({
        url: `/${data.id}`,
        method: 'PATCH',
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          role: data.role,
          serviceTypeId: data.serviceTypeId,
        },
      }),
    }),
    getStaffStatistic: builder.query<{ total: number, receptionist: number, service_staff: number }, void>({
      query: () => ({
        url: '/staff-count',
        method: 'GET',
      }),
    })
  }),
});

export const { useGetUserByIdQuery, useCreateUserMutation } = userApi;
export const { useAdminGetUsersByRoleQuery, useDeleteUserMutation, useUpdateUserMutation, useGetStaffStatisticQuery } = adminUserApi;