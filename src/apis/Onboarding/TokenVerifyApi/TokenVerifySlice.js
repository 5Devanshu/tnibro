import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isTokenVerifySuccess: '',
  isTokenVerifyError: '',
};

const TokenVerifySlice = createSlice({
  name: 'TokenVerifySlice',
  initialState,
  reducers: {
    getTokenVerify(state, action) {
      state.isLoading = true;
      state.isTokenVerifyError = '';
      state.isTokenVerifySuccess = '';
    },
    getTokenVerifySuccess(state, action) {
      state.isLoading = false;
      state.isTokenVerifySuccess = action?.payload?.response;
      state.isTokenVerifyError = '';
    },
    getTokenVerifyFailure(state, action) {
      state.isLoading = false;
      state.isTokenVerifySuccess = '';
      state.isTokenVerifyError = action.payload;
    },
  },
});

export const {getTokenVerify, getTokenVerifySuccess, getTokenVerifyFailure} =
  TokenVerifySlice.actions;

export default TokenVerifySlice.reducer;
