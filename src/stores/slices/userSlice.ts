import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '../../types';

interface UserState {
  isAuthenticated: boolean;
  role: string;
}

const initialState: UserState = {
  isAuthenticated: false,
  role: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<Role>) {
      state.isAuthenticated = true;
      state.role = action.payload;
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.role = '';
    },
  },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
