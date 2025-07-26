import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loader: false,
  isdeactivateIdSuccess: '', // user enter number
  isdeactivateIdError: '',
  isdeactivateotpError: '',
  isdeactivateotpSuccess: '',
  isloader: false,
  isdeactivatefeedbackSuccess: '',
  isdeactivatefeedbackError: '',
  isloading: false,
  isaccountDeletionSuccess: '',
  isaccountDeletionError: '',
};

const DeactivateSlice = createSlice({
  name: 'deactivateId',
  initialState,
  reducers: {
    //verify number
    DeactivateWithPhone(state, action) {
      state.loader = true;
      state.isdeactivateIdSuccess = '';
      state.isdeactivateIdError = '';
    },
    DeactivatePhoneSuccess(state, action) {
      state.loader = false;
      state.isdeactivateIdSuccess = action.payload;
      state.isdeactivateIdError = '';
    },
    DeactivatePhoneFailure(state, action) {
      state.loader = false;
      state.isdeactivateIdError = action.payload;
      state.isdeactivateIdSuccess = '';
    },
    resetDeactivatePhone(state) {
      state.isdeactivateIdError = '';
      state.isdeactivateIdSuccess = '';
      state.loader = false;
    },
    // verify otp
    DeactivateVerify(state, action) {
      state.isloader = true;
      state.isdeactivateotpSuccess = '';
      state.isdeactivateotpError = '';
    },
    DeactivateVerifySuccess(state, action) {
      state.isloader = false;
      state.isdeactivateotpSuccess = action.payload;
      state.isdeactivateotpError = '';
    },
    DeactivateVerifyFailure(state, action) {
      state.isloader = false;
      state.isdeactivateotpError = action.payload;
      state.isdeactivateotpSuccess = '';
    },
    /// feedback
    DeactivateFeedback(state, action) {
      state.isloader = true;
      state.isdeactivatefeedbackSuccess = '';
      state.isdeactivatefeedbackError = '';
    },
    DeactivateFeedbackSuccess(state, action) {
      state.isloader = false;
      state.isdeactivatefeedbackSuccess = action.payload;
      state.isdeactivatefeedbackError = '';
    },
    DeactivateFeedbackFailure(state, action) {
      state.isloader = false;
      state.isdeactivatefeedbackSuccess = '';
      state.isdeactivatefeedbackError = action.payload;
    },
    ///Account Delete
    AccountDelete(state, action) {
      state.isloading = true;
      state.isaccountDeletionSuccess = '';
      state.isaccountDeletionError = '';
    },
    AccountDeleteSuccess(state, action) {
      state.isloading = false;
      state.isaccountDeletionSuccess = action.payload;
      state.isaccountDeletionError = '';
    },
    AccountDeleteFailure(state, action) {
      state.isloading = false;
      state.isaccountDeletionSuccess = '';
      state.isaccountDeletionError = action.payload;
    },
  },
});

export const {
  DeactivateWithPhone,
  DeactivatePhoneSuccess,
  DeactivatePhoneFailure,
  resetDeactivatePhone,
  DeactivateVerify,
  DeactivateVerifySuccess,
  DeactivateVerifyFailure,
  DeactivateFeedback,
  DeactivateFeedbackSuccess,
  DeactivateFeedbackFailure,
  AccountDelete,
  AccountDeleteSuccess,
  AccountDeleteFailure,
} = DeactivateSlice.actions;

export default DeactivateSlice.reducer;
