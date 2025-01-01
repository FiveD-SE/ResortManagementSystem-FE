import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAccount } from '../../types';
import Cookies from 'js-cookie';
interface UserState {
  isAuthenticated: boolean;
  user: IAccount | null;
}
const accessToken = Cookies.get('accessToken');
const user: IAccount | null = Cookies.get('user') ? (JSON.parse(Cookies.get('user') as string) as IAccount) : null;

const initialState: UserState = {
  isAuthenticated: !!accessToken,
  user: user || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<IAccount>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
