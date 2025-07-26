import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  loader: false,
  countriesData: [],
  countrySelected: '',
  tabClickData: [],
  tabsData: [],
  signuploader: false,
  isSignupError: '',
  isSignupSuccess: '',
  isAccessToken: '',
  isOtpVerifyError: '',
  isOtpVerifySuccess: '',
  isloader: false,
  isactivationVerifySuccess: '',
  isactivationVerifyError: '',
  isLoginWithPhoneSuccess: null,
  isTableDataFailure: '',
  fcmToken: '',
  userData: null,
  isLoadingFcmToken: false,
  isFcmUploadSuccess: '',
  isFcmUploadError: '',
  isAlertLoading: false,
  isSetAlertSuccess: '',
  isSetAlertError: '',
  isSetAlertSymbol: '',
  isNotificationShown: false,
  notificationText: '',
  usedPhone: '',
  noTabClickData: false,
  profileLoader: false,
  getProfileDataSuccess: '',
  getProfileError: '',
  editProfileError: '',
  editProfileSuccess: '',
  editProfileLoader: false,
  isGetAlertLoading: false,
  isGetAlertError: '',
  isGetAlertSuccess: [],
  isdeleteAlertLoading: false,
  isdeleteAlertError: '',
  isdeleteAlertSuccess: '',
  isEditAlertLoading: false,
  isEditAlertError: '',
  isEditAlertSuccess: '',
  isLoginError: '',
  deepLinkState:false
};

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    storeFcmToken(state, action) {
      state.fcmToken = action.payload;
    },
    loginWithPhone(state, action) {
      state.loader = true;
      state.isLoginError = '';
      state.isLoginWithPhoneSuccess = '';
    },
    loginWithPhoneSuccess(state, action) {
      state.loader = false;
      state.isLoginWithPhoneSuccess = action.payload;
      state.isLoginError = '';
    },
    loginWithPhoneFailure(state, action) {
      state.loader = false;
      state.isLoginError = action.payload.data.response;
      state.isLoginWithPhoneSuccess = '';
    },
    setInternalToken(state, action) {
      state.isAccessToken = action.payload;
    },
    signUp(state, action) {
      state.signuploader = true;
      state.isSignupError = '';
      state.isSignupSuccess = '';
    },
    signUpSuccess(state, action) {
      state.signuploader = false;
      state.isSignupSuccess = action?.payload?.data;
      state.isSignupError = '';
    },
    signUpFailure(state, action) {
      const {payload} = action;
      state.signuploader = false;
      state.isSignupSuccess = '';
      state.isSignupError = action.payload.data.response;
      state.usedPhone = '';
    },
    loginReset(state) {
      state.loader = false;
      state.isLoginError = '';
      state.isAccessToken = '';
      state.isLoginWithPhoneSuccess = '';
      state.isSignupError = '';
      state.signuploader = false;
      state.isSignupSuccess = '';
      state.isOtpVerifyError = '';
      state.usedPhone = '';
      state.isOtpVerifySuccess = '';
      state.userData = '';
      state.isloader = false;
      state.isactivationVerifySuccess = '';
      state.isactivationVerifyError = '';
    },
    verifyOtp(state, action) {
      state.loader = true;
      state.isOtpVerifyError = '';
      state.isOtpVerifySuccess = '';
    },
    verifyOtpSuccess(state, action) {
      const {payload} = action;
      state.loader = false;
      state.isOtpVerifyError = '';
      state.isOtpVerifySuccess = payload?.data;
      state.isAccessToken = payload?.data?.access_token;
      state.userData = payload?.data.response;
      AsyncStorage.setItem('userId', payload?.data?.response?.id.toString());
      AsyncStorage.setItem('selectedCountry', payload?.data?.response?.country);
      AsyncStorage.setItem('referralcode', payload?.data?.response?.referralcode);
      AsyncStorage.setItem('active_PlanCode', payload?.data?.response?.plan_code);
    },
    verifyOtpFailure(state, action) {
      const {payload} = action;
      state.loader = false;
      state.isOtpVerifySuccess = '';
      state.isOtpVerifyError = action.payload.data.response;
    },
    ActivationVerify(state) {
      state.isloader = true;
      state.isactivationVerifySuccess = '';
      state.isactivationVerifyError = '';
    },
    ActivationVerifySuccess(state, action) {
      const {payload} = action;
      state.isloader = false;
      state.isactivationVerifySuccess = action.payload;
      state.isAccessToken = action?.payload?.access_token;
      state.userData = payload?.response;
      AsyncStorage.setItem('userId', payload?.response?.id.toString());
      AsyncStorage.setItem('selectedCountry', payload?.response?.country);
      AsyncStorage.setItem('referralcode', payload?.response?.referralcode);

      state.isactivationVerifyError = '';
    },
    ActivationVerifyFailure(state, action) {
      state.isloader = false;
      state.isactivationVerifySuccess = '';
      state.isactivationVerifyError = action.payload;
    },
    getCountries(state, action) {
      state.loader = true;
      state.isLoginError = '';
    },
    getCountriesSuccess(state, action) {
      const {payload} = action;
      state.loader = false;
      state.countriesData = action.payload.data;
      state.isLoginError = '';
    },
    getCountriesFailure(state, action) {
      const {payload} = action;
      state.loader = false;
      state.isLoginError = '';
    },
    saveGlobalData(state, action) {
      const {payload} = action;
      state.countrySelected = action.payload;
    },
    uploadFcmToken(state, action) {
      state.isLoadingFcmToken = true;
    },
    uploadFcmTokenSuccess(state, action) {
      state.isLoadingFcmToken = false;
      state.isFcmUploadError = '';
      state.isFcmUploadSuccess = action?.payload?.status;
    },
    uploadFcmTokenFailure(state, action) {
      state.isLoadingFcmToken = false;
      state.isFcmUploadError = action.payload.data;
      state.isFcmUploadSuccess = '';
    },
    setAlert(state, action) {
      state.isAlertLoading = true;
      state.isSetAlertSymbol = '';
    },
    setAlertSuccess(state, action) {
      state.isAlertLoading = false;
      state.isSetAlertError = '';
      state.isSetAlertSuccess = action?.payload?.status;
      state.isSetAlertSymbol = action?.payload?.response?.symbol;
    },
    setAlertFailure(state, action) {
      state.isAlertLoading = false;
      state.isSetAlertError = action.payload.data;
      state.isSetAlertSuccess = '';
    },
    getAlert(state, action) {
      state.isGetAlertLoading = true;
    },
    getAlertSuccess(state, action) {
      state.isGetAlertLoading = false;
      state.isGetAlertError = '';
      state.isGetAlertSuccess = action?.payload?.response || [];
    },
    getAlertFailure(state, action) {
      state.isGetAlertLoading = false;
      state.isGetAlertError = action.payload.data;
      state.isGetAlertSuccess = [];
    },
    deleteAlert(state, action) {
      state.isdeleteAlertLoading = true;
    },
    deleteAlertSuccess(state, action) {
      state.isdeleteAlertLoading = false;
      state.isdeleteAlertError = '';
      state.isdeleteAlertSuccess = action?.payload?.response;
    },
    deleteAlertFailure(state, action) {
      state.isdeleteAlertLoading = false;
      state.isdeleteAlertError = action.payload.data;
      state.isdeleteAlertSuccess = '';
    },
    resetAlert(state) {
      state.isSetAlertSuccess = '';
      state.isAlertLoading = false;
      state.isEditAlertError = '';
      state.isEditAlertSuccess = '';
      state.isdeleteAlertLoading = false;
      state.isdeleteAlertError = '';
      state.isdeleteAlertSuccess = '';
      state.isSetAlertError = '';
    },
    setNotification(state, action) {
      (state.isNotificationShown = action.payload.isVisible),
        (state.notificationText = action.payload.text);
    },
    getProfileData(state, action) {
      state.profileLoader = true;
      state.getProfileError = '';
    },
    getProfileDataSuccess(state, action) {
      state.profileLoader = false;
      state.getProfileError = '';
      state.getProfileSuccess = action.payload?.response || action.payload?.data;
    },
    getProfileDataError(state, action) {
      state.profileLoader = false;
      state.getProfileError = action.payload;
    },
    editProfileData(state, action) {
      state.editProfileLoader = true;
      state.editProfileError = '';
    },
    editProfileDataSuccess(state, action) {
      state.editProfileLoader = false;
      state.editProfileError = '';
      state.editProfileSuccess = action.payload.status;
    },
    editProfileDataError(state, action) {
      state.editProfileLoader = false;
      state.editProfileError = action.payload;
    },
    editProfileReset(state) {
      state.editProfileSuccess = '';
      state.editProfileError = '';
    },
    editAlert(state, action) {
      state.isAlertLoading = true;
      state.isEditAlertError = '';
    },
    editAlertSuccess(state, action) {
      state.isAlertLoading = false;
      state.isEditAlertError = '';
      state.isEditAlertSuccess = action.payload?.response;
    },
    editAlertFailure(state, action) {
      state.isAlertLoading = false;
      state.isEditAlertError = action.payload?.data?.response;
    },
    editAlertReset(state) {
      state.isAlertLoading = false;
      state.isEditAlertError = '';
      state.isEditAlertSuccess = '';
    },
    deleteAlertReset(state) {
      state.isdeleteAlertLoading = false;
      state.isdeleteAlertError = '';
      state.isdeleteAlertSuccess = '';
    },
    deepLinkPayment(state,action) {
      state.deepLinkState = action.payload;
    },
  },
});

export const {
  loginReset,
  signUp,
  signUpSuccess,
  signUpFailure,
  getCountries,
  getCountriesSuccess,
  getCountriesFailure,
  saveGlobalData,
  setInternalToken,
  verifyOtp,
  verifyOtpSuccess,
  verifyOtpFailure,
  ActivationVerify,
  ActivationVerifySuccess,
  ActivationVerifyFailure,
  loginWithPhone,
  loginWithPhoneSuccess,
  loginWithPhoneFailure,
  storeFcmToken,
  uploadFcmToken,
  uploadFcmTokenSuccess,
  uploadFcmTokenFailure,
  setAlert,
  setAlertSuccess,
  setAlertFailure,
  getAlert,
  getAlertSuccess,
  getAlertFailure,
  setNotification,
  resetAlert,
  getProfileData,
  getProfileDataSuccess,
  getProfileDataError,
  editProfileData,
  editProfileDataSuccess,
  editProfileDataError,
  editProfileReset,
  deleteAlert,
  deleteAlertSuccess,
  deleteAlertFailure,
  editAlert,
  editAlertSuccess,
  editAlertFailure,
  editAlertReset,
  deleteAlertReset,
  deepLinkPayment
} = authenticationSlice.actions;
export default authenticationSlice.reducer;
