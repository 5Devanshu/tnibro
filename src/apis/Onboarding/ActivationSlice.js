// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {createSlice} from '@reduxjs/toolkit';

// const initialState = {
//   loader: false,
//   isaccountActivateSuccess: '', // user enter number
//   isaccountActivateError: '',
//   isloader: false,
//   isactivationVerifySuccess: '',
//   isactivationVerifyError: '',
// };

// const ActivationSlice = createSlice({
//   name: 'activationId',
//   initialState,
//   reducers: {
//     //verify number
//     AccountActivation(state, action) {
//       state.loader = true;
//       state.isaccountActivateSuccess = '';
//       state.isaccountActivateError = '';
//     },
//     AccountActivationSuccess(state, action) {
//       state.loader = false;
//       state.isaccountActivateSuccess = action.payload;
//       state.isaccountActivateError = '';
//     },
//     AccountActivationFailure(state, action) {
//       state.loader = false;
//       state.isaccountActivateSuccess = '';
//       state.isaccountActivateError = action.payload;
//     },
//     // verify otp
//     ActivationVerify(state, action) {
//       state.isloader = true;
//       state.isactivationVerifySuccess = '';
//       state.isactivationVerifyError = '';
//     },
//     ActivationVerifySuccess(state, action) {
//       state.isloader = false;
//       state.isactivationVerifySuccess = action.payload;
//       state.isactivationVerifyError = '';
//     },
//     ActivationVerifyFailure(state, action) {
//       state.isloader = false;
//       state.isactivationVerifySuccess = '';
//       state.isactivationVerifyError = action.payload;
//     },
//     loginActivation(state) {
//       state.loader = false;
//       state.isaccountActivateSuccess = '';
//       state.isaccountActivateError = '';
//       state.isloader = false;
//       state.isactivationVerifySuccess = '';
//       state.isactivationVerifyError = '';
//     },
//   },
// });

// export const {
//   AccountActivation,
//   AccountActivationSuccess,
//   AccountActivationFailure,
//   ActivationVerify,
//   ActivationVerifySuccess,
//   ActivationVerifyFailure,
//   loginActivation,
// } = ActivationSlice.actions;

// export default ActivationSlice.reducer;
