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
    login(state, action: PayloadAction<Role>) {
      state.isAuthenticated = true;
      state.role = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.role = '';
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
