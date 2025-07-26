import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loader: false,
  isFogotpasswordSuccess: '',
  isFogotPasswordError: '',
  isloading: false,
  ispostVerifyOtpSuccess: '',
  ispostVerifyOtpError: '',
  isCnfPasswordSuccess: '',
  isCnfPasswordError: '',
};

const forgotPassowrdSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    //use when you enter email id from forgot password screen
    getforgotPasswordEmail(state, action) {
      state.loader = true;
      state.isFogotpasswordSuccess = '';
      state.isFogotPasswordError = '';
    },
    getforgotPasswordEmailSuccess(state, action) {
      state.loader = false;
      state.isFogotpasswordSuccess = action.payload;
      state.isFogotPasswordError = '';
    },
    getforgotPasswordEmailFailure(state, action) {
      state.loader = false;
      state.isFogotpasswordSuccess = '';
      state.isFogotPasswordError = action.payload?.data;
    },
    // use when you enter opt from forgot password screen
    postVerifyOtp(state, action) {
      state.isloading = true;
      state.ispostVerifyOtpSuccess = '';
      state.ispostVerifyOtpError = '';
    },
    postVerifyOtpSuccess(state, action) {
      state.isloading = false;
      state.ispostVerifyOtpSuccess = action.payload;
      state.ispostVerifyOtpError = '';
    },
    postVerifyOtpFailure(state, action) {
      state.isloading = false;
      state.ispostVerifyOtpSuccess = '';
      state.ispostVerifyOtpError = action.payload?.data;
    },
    ///reset passwor confirm password
    patchCnfPassword(state, action) {
      state.isloading = true;
      state.isCnfPasswordSuccess = '';
      state.isCnfPasswordError = '';
    },
    patchCnfPasswordSuccess(state, action) {
      state.isloading = false;
      state.isCnfPasswordSuccess = action.payload;
      state.isCnfPasswordError = '';
    },
    patchCnfPasswordFailure(state, action) {
      state.isloading = false;
      state.isCnfPasswordSuccess = '';
      state.isCnfPasswordError = action.payload?.data;
    },
  },
});

export const {
  getforgotPasswordEmail,
  getforgotPasswordEmailSuccess,
  getforgotPasswordEmailFailure,
  postVerifyOtp,
  postVerifyOtpSuccess,
  postVerifyOtpFailure,
  patchCnfPassword,
  patchCnfPasswordSuccess,
  patchCnfPasswordFailure,
} = forgotPassowrdSlice.actions;

export default forgotPassowrdSlice.reducer;
