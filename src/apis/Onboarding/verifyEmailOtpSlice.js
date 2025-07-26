import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loader: false,
  userData: null,
  isemailOtpVerifyError: '',
  isemailOtpVerifySuccess: '',
  isverified: '',
  isreferalDetailError: '',
  isloader: false,
  isreferalDetailSuccess: '',
};

const verifyEmailotpSlice = createSlice({
  name: 'verifyemailOtp',
  initialState,
  reducers: {
    verifyEmailOtp(state, action) {
      state.loader = true;
      state.isemailOtpVerifyError = '';
      state.isemailOtpVerifySuccess = '';
    },
    verifyEmailOtpSuccess(state, action) {
      state.loader = false;
      state.isemailOtpVerifyError = '';
      state.isemailOtpVerifySuccess = action.payload;
      state.isverified = action.payload?.data?.user_details?.email_verified.toString();
      state.userData = action.payload.data?.user_details;
      AsyncStorage.setItem('userId', action.payload.data?.user_details?.id.toString());
      AsyncStorage.setItem('emailVerified', action.payload?.data?.user_details?.email_verified.toString())
    },
    verifyEmailOtpFailure(state, action) {
      const { payload } = action;
      state.loader = false;
      state.isemailOtpVerifySuccess = '';
      state.isemailOtpVerifyError = payload?.data?.user_details;
    },
    //// get total Count of referal
    referalDetail(state, action) {
      state.isloader = true;
      state.isreferalDetailError = '';
      state.isreferalDetailSuccess = '';
    },
    referalDetailSuccess(state, action) {
      state.isloader = false;
      state.isreferalDetailError = '';
      state.isreferalDetailSuccess = action.payload;
    },
    referalDetailFailure(state, action) {
      const {payload} = action;
      state.isloader = false;
      state.isreferalDetailSuccess = '';
      state.isreferalDetailError = payload?.data;
    },
  },
});

export const {
  verifyEmailOtp,
  verifyEmailOtpSuccess,
  verifyEmailOtpFailure,
  referalDetail,
  referalDetailSuccess,
  referalDetailFailure,
} = verifyEmailotpSlice.actions;

export default verifyEmailotpSlice.reducer;
