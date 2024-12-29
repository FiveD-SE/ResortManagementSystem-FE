import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import userSlice from './slices/userSlice';
import { authApi } from '../apis/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userApi } from '../apis/userApi';
import { roomApi } from '../apis/roomApi';
import { roomTypeApi } from '../apis/roomTypeApi';
import { serviceApi } from '../apis/serviceApi';
import { serviceTypeApi } from '../apis/serviceTypeApi';
import { promotionApi } from '../apis/promotionApi';

const store = configureStore({
  reducer: {
    user: userSlice,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [roomTypeApi.reducerPath]: roomTypeApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [serviceTypeApi.reducerPath]: serviceTypeApi.reducer,
    [promotionApi.reducerPath]: promotionApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      roomApi.middleware,
      roomTypeApi.middleware,
      serviceApi.middleware,
      serviceTypeApi.middleware,
      promotionApi.middleware,
    );
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
