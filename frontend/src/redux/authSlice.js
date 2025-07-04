import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.tokens = action.payload;
      state.user = { 
        email: action.payload.email,
        username: action.payload.username 
      };
      state.isAuthenticated = true;
      localStorage.setItem('authTokens', JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      state.tokens = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authTokens');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;