import {all, call, put, takeLatest, takeEvery} from 'redux-saga/effects';
import { TrackierSDK, TrackierEvent } from 'react-native-trackier';
import {
  signUp,
  signUpSuccess,
  signUpFailure,
  getCountries,
  getCountriesSuccess,
  getCountriesFailure,
  verifyOtp,
  verifyOtpSuccess,
  verifyOtpFailure,
  ActivationVerify,
  ActivationVerifyFailure,
  ActivationVerifySuccess,
  loginWithPhone,
  loginWithPhoneSuccess,
  loginWithPhoneFailure,
  uploadFcmTokenSuccess,
  uploadFcmTokenFailure,
  uploadFcmToken,
  setAlertSuccess,
  setAlertFailure,
  setAlert,
  getProfileDataSuccess,
  getProfileDataError,
  getProfileData,
  editProfileDataSuccess,
  editProfileDataError,
  editProfileData,
  getAlertSuccess,
  getAlertFailure,
  getAlert,
  deleteAlertSuccess,
  deleteAlertFailure,
  deleteAlert,
  editAlertSuccess,
  editAlertFailure,
  editAlert,
} from './authenticationSlice';
import {
  verifyEmailOtp,
  verifyEmailOtpSuccess,
  verifyEmailOtpFailure,
  referalDetailSuccess,
  referalDetailFailure,
  referalDetail,
} from './verifyEmailOtpSlice';
import {postRequest, getRequest} from '../axiosClient';

import {
  getRequestAuth,
  postRequestAuth,
  putRequestAuth,
  patchRequestAuth,
  deleteRequestAuth,
} from '../axiosClientAuth';
import axios from 'axios';
import {getResendEmail, getResendEmailFailure, getResendEmailSuccess} from './resendEmailSlice';
import {
  getDashboardTabData,
  getDashboardTabDataFailure,
  getDashboardTabDataSuccess,
  getScreenerData,
  getScreenerDataSuccess,
  getScreenerDataFailure,
} from './dashboardTabDataSlice';
import {API_ENDPOINTS} from '../../Constants/enums/apiEnum';
import {
  dashboardScreener,
  dashboardScreenerFailure,
  dashboardScreenerSuccess,
} from './dashboardScreenerSlice';
import {
  getforgotPasswordEmail,
  getforgotPasswordEmailSuccess,
  getforgotPasswordEmailFailure,
  postVerifyOtp,
  postVerifyOtpSuccess,
  postVerifyOtpFailure,
  patchCnfPassword,
  patchCnfPasswordSuccess,
  patchCnfPasswordFailure,
} from './forgotPasswordSlice';
import {
  getSearch,
  getSearchSuccess,
  getSearchFailure,
  postSearchDetail,
  postSearchDetailSuccess,
  postSearchDetailFailure,
} from './SearchSlice';
import {
  getWatchlist,
  getWatchlistSuccess,
  getWatchlistFailure,
  deleteWatchlist,
  deleteWatchlistSuccess,
  deleteWatchlistFailure,
  addWatchList,
  addWatchListSuccess,
  addWatchListFailure,
  editWatchList,
  editWatchListSuccess,
  editWatchListFailure,
  getWatchlistTable,
  getWatchlistTableSuccess,
  getWatchlistTableFailure,
  getSymbolList,
  getSymbolListSuccess,
  getSymbolListFailure,
  symboleAddedWatchList,
  symbolAddedSuccess,
  symbolAddedFailure,
  deleteSymbol,
  deleteSymbolSuccess,
  deleteSymbolFailure,
  addAlertWatchList,
  addAlertWatchListSuccess,
  addAlertWatchListFailure,
  getSearchSymbol,
  getSearchSymbolSuccess,
  getSearchSymbolFailure,
} from './watchlistSlice';
import {getGainerData, getGainerDataFailure, getGainerDataSuccess} from './gainerSlice';
import {
  deleteAlertList,
  deleteAlertListFailure,
  deleteAlertListSuccess,
  editAlertList,
  editAlertListFailure,
  editAlertListSuccess,
  getTotalAlert,
  getTotalAlertFailure,
  getTotalAlertSuccess,
  premiumStockAlert,
  premiumStockAlertSuccess,
  premiumStockAlertFail,
  alertTriggeredList,
  alertTriggeredListSuccess,
  alertTriggeredListFail,
  useralertTriggeredList,
  useralertTriggeredListSuccess,
  useralertTriggeredListFail,
  StockAlertToggle,
  StockAlertToggleSuccess,
  StockAlertToggleFail,
} from './totalAlertSlice';
import {
  getOptions,
  getOptionsSuccess,
  getOptionsFailure,
  optionchain,
  optionchainSuccess,
  optionchainFailure,
  optionchainSymbol,
  optionchainSymSuccess,
  optionchainSymFailure,
  optionchainTable,
  optionchainTableSuccess,
  optionchainTableFailure,
} from './OptionsSlice';
import {
  DeactivateWithPhone,
  DeactivatePhoneSuccess,
  DeactivatePhoneFailure,
  DeactivateVerify,
  DeactivateVerifyFailure,
  DeactivateVerifySuccess,
  DeactivateFeedback,
  DeactivateFeedbackSuccess,
  DeactivateFeedbackFailure,
  AccountDelete,
  AccountDeleteSuccess,
  AccountDeleteFailure,
} from './DeactivateSlice';
import {getTicker, getTickerFailure, getTickerSuccess} from './TickerSlice';
import {ToastHandler} from '../../utils/utils';

function UserException(message) {
  this.response;
  this.message = message;
  this.name = 'UserException';
  this.status = 403;
}

function* loginWithPhoneAPI(action) {
  try {
    const response = yield call(() => postRequest('enroll/user_register', action.payload));
    yield put(loginWithPhoneSuccess(response.data));
    if (response?.data?.is_email_verified) {
      yield put(getUserDetails());
    }
  } catch (error) {
    yield put(loginWithPhoneFailure(error.response));
  }
}

function* signUpAPI(action) {
  try {
    const response = yield call(() => postRequest('enroll/user_register', action.payload));
    yield put(signUpSuccess(response));
  } catch (error) {
    yield put(signUpFailure(error.response));
  }
}

function* verifyOtpApi(action) {
  try {
    const response = yield call(() => postRequest('enroll/verifyotp', action.payload));
    yield put(verifyOtpSuccess(response));
  } catch (error) {
    yield put(verifyOtpFailure(error.response));
  }
}

function* countriesListApi(action) {
  try {
    const url = 'https://api.first.org/data/v1/countries';
    const response = yield call(() => axios.get(url));
    yield put(getCountriesSuccess(response.data));
  } catch (error) {
    yield put(getCountriesFailure(error));
  }
}

function* fcmUploadApi(action) {
  let id = action.payload.userid;
  let notify_token = action.payload.notify_token;
  let device_name = action.payload.device_name;
  let device_type = action.payload.device_type;
  let device_id = action.payload.device_id;

  try {
    const response = yield call(() =>
      patchRequestAuth(`tnibroapp/one_signal_token?userid=${id}`, {
        notify_token: notify_token,
        userid: id,
        device_name: device_name,
        device_type: device_type,
        device_id: device_id,
      }),
    );
    yield put(uploadFcmTokenSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? 'Somthing went wrong');
    yield put(uploadFcmTokenFailure(error.response));
  }
}

function* setAlertApi(action) {
  try {
    const response = yield call(() =>
      postRequestAuth(API_ENDPOINTS.SET_TNIBROAPP_ALERT, action.payload),
    );
    yield put(setAlertSuccess(response.data));
    var trackierEvent = new TrackierEvent("WN8TdznKis");
    TrackierSDK.trackEvent(trackierEvent);
  } catch (error) {
    yield put(setAlertFailure(error.response));
  }
}

function* getAlertApi(action) {
  try {
    const response = yield call(() =>
      getRequestAuth(`tnibroapp/alert?userid=` + action.payload.userid),
    );
    yield put(getAlertSuccess(response.data));
  } catch (error) {
    yield put(getAlertFailure(error.response));
  }
}

function* fetchProfileDataAPI(action) {
  try {
    const response = yield call(() =>
      getRequestAuth('user/userprofile?userid=' + action.payload.userId, action.payload),
    ); ///new url
    yield put(getProfileDataSuccess(response.data));
  } catch (error) {
    yield put(getProfileDataError(error.response));
  }
}

function* editProfileDataAPI(action) {
  try {
    const response = yield call(() =>
      patchRequestAuth('user/userprofile?userid=' + action.payload.userId, action.payload.request),
    );
    yield put(editProfileDataSuccess(response.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response);
    yield put(editProfileDataError(error.response));
  }
}

function* deleteAlertApi(action) {
  try {
    const response = yield call(() =>
      deleteRequestAuth(`tnibroapp/alert?alert_id=` + action.payload.id),
    );
    yield put(deleteAlertSuccess(response.data));
  } catch (error) {
    yield put(deleteAlertFailure(error.response));
  }
}

function* editAlertApi(action) {
  try {
    const response = yield call(() =>
      patchRequestAuth(`tnibroapp/alert?alert_id=` + action.payload.id, action.payload.reqParams),
    );
    yield put(editAlertSuccess(response.data));
  } catch (error) {
    yield put(editAlertFailure(error.response));
  }
}

function* verifyEmailOtpApi(action) {
  try {
    const response = yield call(() => postRequest('enroll/emailverify', action.payload));
    yield put(verifyEmailOtpSuccess(response));
  } catch (error) {
    yield put(verifyEmailOtpFailure(error.response));
  }
}
function* getResendEmailApi(action) {
  let id = action.payload.userid;
  try {
    const response = yield call(() =>
      getRequestAuth(`enroll/emailverify?userid=${id}`, action.payload),
    );
    yield put(getResendEmailSuccess(response.data));
  } catch (error) {
    yield put(getResendEmailFailure(error.response));
  }
}
function* getDashboardTabDataApi(action) {
  try {
    const response = yield call(() =>
      postRequestAuth(API_ENDPOINTS.TnibroAppScreener, action.payload),
    );
    yield put(getDashboardTabDataSuccess(response.data));
  } catch (error) {
    // ToastHandler(false, error?.response?.data?.response ?? 'Somthing went wrong');
    ToastHandler(false, error?.message ?? 'Somthing went wrong');
    yield put(getDashboardTabDataFailure(error.response));
  }
}
function* getScreenerDataApi(action) {
  try {
    const response = yield call(() =>
      getRequestAuth(API_ENDPOINTS.TnibroAppScreener, action.payload),
    );
    yield put(getScreenerDataSuccess(response.data));
  } catch (error) {
    yield put(getScreenerDataFailure(error.response));
  }
}
function* dashboardScreenerApi(action) {
  let page_no = action.payload.page_no;
  try {
    const response = yield call(() =>
      postRequestAuth(`tnibroapp/appscreener?page_no=${page_no}&per_page=${20}`, action.payload),
    );
    yield put(dashboardScreenerSuccess(response));
  } catch (error) {
    yield put(dashboardScreenerFailure(error.response));
  }
}
function* getforgotPasswordEmailApi(action) {
  let email = action.payload.user_email;
  try {
    const response = yield call(() =>
      getRequestAuth(`enroll/forgot_password?email=${email}`, action.payload),
    );
    yield put(getforgotPasswordEmailSuccess(response.data));
  } catch (error) {
    yield put(getforgotPasswordEmailFailure(error.response));
  }
}

function* postVerifyOtpApi(action) {
  try {
    const response = yield call(() => postRequestAuth(`enroll/forgot_password`, action.payload));
    yield put(postVerifyOtpSuccess(response.data));
  } catch (error) {
    yield put(postVerifyOtpFailure(error.response));
  }
}
function* patchCnfPasswordApi(action) {
  try {
    const response = yield call(() => patchRequestAuth(`enroll/forgot_password`, action.payload));
    yield put(patchCnfPasswordSuccess(response.data));
  } catch (error) {
    yield put(patchCnfPasswordFailure(error.response));
  }
}
function* getSearchApi(action) {
  try {
    const response = yield call(() =>
      getRequestAuth(`home/app/searching_stocks?stock=` + action.payload),
    );
    yield put(getSearchSuccess(response.data));
  } catch (error) {
    yield put(getSearchFailure(error.response));
  }
}
function* postSearchDetailApi(action) {
  try {
    const response = yield call(() => postRequestAuth(`home/app/searching_stocks`, action.payload));
    yield put(postSearchDetailSuccess(response.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(postSearchDetailFailure(error.response));
  }
}
function* getWatchlistApi(action) {
  ///listing of all watchlist folder
  let id = action.payload.userid;
  try {
    const response = yield call(() =>
      getRequestAuth(`watchlist/userwatchlist?userid=${id}`, action.payload),
    );
    yield put(getWatchlistSuccess(response.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? 'Somthing went wrong');
    yield put(getWatchlistFailure(error.response));
  }
}
function* deleteWatchlistApi(action) {
  // delete the watchlist folder
  let id = action.payload.watchlist_id;
  let userid = action.payload.userid;
  try {
    const response = yield call(() =>
      deleteRequestAuth(
        `watchlist/userwatchlist?watchlist_id=${id}&remove=true&userid=${userid}`,
        action.payload,
      ),
    );
    yield put(deleteWatchlistSuccess(response.data));
  } catch (error) {
    yield put(deleteWatchlistFailure(error.response));
  }
}
function* addWatchListApi(action) {
  //add new watchlist folder
  try {
    const response = yield call(() => postRequestAuth(`watchlist/userwatchlist`, action.payload));
    yield put(addWatchListSuccess(response.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(addWatchListFailure(error.response));
  }
}
function* editWatchListApi(action) {
  ///edit the watchlist folder name
  let id = action.payload.watchlist_id;
  try {
    const response = yield call(() =>
      patchRequestAuth(`watchlist/userwatchlist?watchlist_id=${id}&edit=true`, action.payload),
    );
    yield put(editWatchListSuccess(response.data));
  } catch (error) {
    yield put(editWatchListFailure(error.response));
  }
}
function* getWatchlistTableApi(action) {
  ///all stocks in side the watchlist folder
  let id = action.payload.watchlist_id;
  let userid = action.payload.userid;
  try {
    const response = yield call(() =>
      getRequestAuth(`watchlist/userwatchlist?watchlist_id=${id}&userid=${userid}`, action.payload),
    );
    yield put(getWatchlistTableSuccess(response.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(getWatchlistTableFailure(error.response));
  }
}
function* getSymbolListApi(action) {
  /// use to get all the symbol in watchlist folder // search field
  let userid = action.payload.userid;
  let page_no = action.payload.page_no;
  try {
    const response = yield call(
      () => getRequestAuth(`watchlist/userwatchlist?symbol=true&userid=${userid}`, action.payload),
      // getRequestAuth(`watchlist/app/userwatchlist?per_page=10&page_no=${page_no}`, action.payload), //new api with paginatiom
    );
    yield put(getSymbolListSuccess(response.data));
  } catch (error) {
    yield put(getSymbolListFailure(error.response));
  }
}
function* getSearchSymbolApi(action) {
  // let userid = action.payload.userid;
  try {
    const response = yield call(() =>
      getRequestAuth(`watchlist/app/userwatchlist?stock_name=` + action.payload),
    );
    yield put(getSearchSymbolSuccess(response.data));
  } catch (error) {
    yield put(getSearchSymbolFailure(error.response));
  }
}
function* symboleWatchListApi(action) {
  ///when we add any stocks/symbol in our watchlise folder
  let id = action.payload.watchlist_id;
  let userid = action.payload.userid;

  try {
    const response = yield call(() =>
      patchRequestAuth(
        `watchlist/userwatchlist?watchlist_id=${id}&&userid=${userid}`,
        action.payload,
      ),
    );
    yield put(symbolAddedSuccess(response.data));
  } catch (error) {
    yield put(symbolAddedFailure(error.response));
  }
}
function* deleteSymbolApi(action) {
  ///when user delet the symbole
  let id = action.payload.watchlist_id;
  let userid = action.payload.userid;
  try {
    const response = yield call(() =>
      patchRequestAuth(
        `watchlist/userwatchlist?watchlist_id=${id}&remove=true&userid=${userid}`,
        action.payload,
      ),
    );
    yield put(deleteSymbolSuccess(response.data));
  } catch (error) {
    yield put(deleteSymbolFailure(error.response));
  }
}
function* addAlertWatchListApi(action) {
  //add /Remove aler in watchlist folder
  let id = action.payload.watchlist_id;
  try {
    const response = yield call(() =>
      postRequestAuth(`watchlist/bulk_alert?watchlist_id=${id}`, action.payload),
    );
    yield put(addAlertWatchListSuccess(response.data));
  } catch (error) {
    yield put(addAlertWatchListFailure(error.response));
  }
}
function* getGainerDataApi(action) {
  /// Top Gainer/Loser Api
  let segment = action.payload.segment;
  let category = action.payload.category;
  try {
    const response = yield call(() =>
      getRequestAuth(`home/gainer?segment=${segment}&category=${category}`, action.payload),
    );
    yield put(getGainerDataSuccess(response.data));
  } catch (error) {
    yield put(getGainerDataFailure(error.response));
  }
}
function* getTotalAlertApi(action) {
  try {
    const response = yield call(() => getRequestAuth(`tnibroapp/pagination_alert`, action.payload));
    yield put(getTotalAlertSuccess(response.data));
  } catch (error) {
    yield put(getTotalAlertFailure(error.response));
  }
}
function* deleteAlertListApi(action) {
  try {
    const response = yield call(() =>
      deleteRequestAuth(`tnibroapp/alert?alert_id=` + action.payload.alert_id),
    );
    yield put(deleteAlertListSuccess(response.data));
  } catch (error) {
    yield put(deleteAlertListFailure(error.response));
  }
}
///edit alert
function* editAlertListApi(action) {
  let id = action.payload.alert_id;
  try {
    const response = yield call(() =>
      patchRequestAuth(`tnibroadmin/alert?alert_id=${id}`, action.payload),
    );
    yield put(editAlertListSuccess(response.data));
  } catch (error) {
    yield put(editAlertListFailure(error.response));
  }
}
function* premiumStockAlertApi(action) {
  try {
    const response = yield call(() =>
      getRequestAuth(`user/premiumstockalert/status`, action.payload),
    );
    yield put(premiumStockAlertSuccess(response.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? 'Somthing went wrong');

    yield put(premiumStockAlertFail(error.response));
  }
}
function* alertTriggeredListApi(action) {
  try {
    const response = yield call(() =>
      getRequestAuth(`appdashboard/premium/stocks`, action.payload),
    );
    yield put(alertTriggeredListSuccess(response.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? 'Somthing went wrong');

    yield put(alertTriggeredListFail(error.response));
  }
}
function* useralertTriggeredListApi(action) {
  try {
    const response = yield call(() =>
      getRequestAuth(`tnibroapp/pagination_alert/triggered?`, action.payload),
    );
    yield put(useralertTriggeredListSuccess(response.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? 'Somthing went wrong');

    yield put(useralertTriggeredListFail(error.response));
  }
}
function* StockAlertToggleApi(action) {
  try {
    const response = yield call(() =>
      patchRequestAuth(`user/premiumstockalert/status`, action.payload),
    );
    yield put(StockAlertToggleSuccess(response.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? 'Somthing went wrong');
    yield put(StockAlertToggleFail(error.response));
  }
}
function* getOptionsApi(action) {
  try {
    const response = yield call(() =>
      getRequestAuth(`home/option_stocks?option=true`, action.payload),
    );
    yield put(getOptionsSuccess(response.data));
  } catch (error) {
    yield put(getOptionsFailure(error.response));
  }
}
function* optionchainApi(action) {
  try {
    const response = yield call(() => postRequestAuth(`optionchain/expirydate`, action.payload));
    yield put(optionchainSuccess(response.data));
  } catch (error) {
    yield put(optionchainFailure(error.response));
  }
}
function* optionchainSymbolApi(action) {
  try {
    const response = yield call(() => getRequestAuth(`optionchain?symbol=true`, action.payload));
    yield put(optionchainSymSuccess(response.data));
  } catch (error) {
    yield put(optionchainSymFailure(error.response));
  }
}
function* optionchainTableApi(action) {
  try {
    const response = yield call(() => postRequestAuth(`optionchain`, action.payload));
    yield put(optionchainTableSuccess(response.data));
  } catch (error) {
    yield put(optionchainTableFailure(error.response));
  }
}
function* DeactivateWithPhoneApi(action) {
  try {
    const response = yield call(() =>
      postRequestAuth('enroll/account_deactivation', action.payload),
    );
    yield put(DeactivatePhoneSuccess(response.data));
  } catch (error) {
    yield put(DeactivatePhoneFailure(error.response));
  }
}
function* DeactivateVerifyApi(action) {
  try {
    const response = yield call(() =>
      postRequestAuth(`enroll/account_deactivation`, action.payload),
    );
    yield put(DeactivateVerifySuccess(response.data));
  } catch (error) {
    yield put(DeactivateVerifyFailure(error.response));
  }
}
function* DeactivateFeedbackApi(action) {
  try {
    const response = yield call(() =>
      postRequestAuth(`user/deactivation_feedback`, action.payload),
    );
    yield put(DeactivateFeedbackSuccess(response.data));
  } catch (error) {
    yield put(DeactivateFeedbackFailure(error.response));
  }
}
function* ActivationVerifyApi(action) {
  try {
    const response = yield call(() => postRequest(`enroll/account_activation`, action.payload));
    yield put(ActivationVerifySuccess(response.data));
  } catch (error) {
    yield put(ActivationVerifyFailure(error.response));
  }
}
function* referalDetailApi(action) {
  let id = action.payload.userid;
  let referral_completed = action.payload.referral_completed;
  try {
    const response = yield call(() =>
      getRequestAuth(
        `referral/user/referral_count?userid=${id}&referral_code=${referral_completed}`,
        action.payload,
      ),
    );
    yield put(referalDetailSuccess(response.data));
  } catch (error) {
    yield put(referalDetailFailure(error.response));
  }
}
function* AccountDeleteApi(action) {
  let id = action.payload.userid;
  try {
    const response = yield call(() =>
      deleteRequestAuth(`user/account_deletion?userid=${id}`, action.payload),
    );
    yield put(AccountDeleteSuccess(response.data));
  } catch (error) {
    yield put(AccountDeleteFailure(error.response));
  }
}
//ticker
function* getTickerApi(action) {
  let id = action.payload.userid;
  try {
    const response = yield call(() =>
      getRequestAuth(`appdashboard/announcement?userid=${id}&marquee=true`, action.payload),
    );
    yield put(getTickerSuccess(response.data));
  } catch (error) {
    yield put(getTickerFailure(error.response));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(signUp, signUpAPI),
    takeLatest(getCountries, countriesListApi),
    takeLatest(verifyOtp, verifyOtpApi),
    takeLatest(loginWithPhone, loginWithPhoneAPI),
    takeLatest(uploadFcmToken, fcmUploadApi),
    takeLatest(setAlert, setAlertApi),
    takeLatest(getProfileData, fetchProfileDataAPI),
    takeLatest(editProfileData, editProfileDataAPI),
    takeLatest(getAlert, getAlertApi),
    takeLatest(deleteAlert, deleteAlertApi),
    takeLatest(editAlert, editAlertApi),
    takeLatest(verifyEmailOtp, verifyEmailOtpApi),
    takeLatest(getResendEmail, getResendEmailApi),
    takeLatest(getDashboardTabData, getDashboardTabDataApi),
    takeLatest(getScreenerData, getScreenerDataApi),
    takeLatest(dashboardScreener, dashboardScreenerApi),
    takeLatest(getforgotPasswordEmail, getforgotPasswordEmailApi),
    takeLatest(postVerifyOtp, postVerifyOtpApi),
    takeLatest(patchCnfPassword, patchCnfPasswordApi),
    takeLatest(getSearch, getSearchApi),
    takeLatest(postSearchDetail, postSearchDetailApi),
    takeLatest(getWatchlist, getWatchlistApi),
    takeLatest(deleteWatchlist, deleteWatchlistApi),
    takeLatest(addWatchList, addWatchListApi),
    takeLatest(editWatchList, editWatchListApi),
    takeLatest(getWatchlistTable, getWatchlistTableApi),
    takeLatest(getSymbolList, getSymbolListApi),
    takeLatest(getSearchSymbol, getSearchSymbolApi),
    takeLatest(symboleAddedWatchList, symboleWatchListApi),
    takeLatest(deleteSymbol, deleteSymbolApi),
    takeLatest(addAlertWatchList, addAlertWatchListApi),
    takeLatest(getGainerData, getGainerDataApi),
    takeLatest(getTotalAlert, getTotalAlertApi),
    takeLatest(deleteAlertList, deleteAlertListApi),
    takeLatest(editAlertList, editAlertListApi),
    takeLatest(premiumStockAlert, premiumStockAlertApi),
    takeLatest(alertTriggeredList, alertTriggeredListApi),
    takeLatest(useralertTriggeredList, useralertTriggeredListApi),
    takeLatest(StockAlertToggle, StockAlertToggleApi),
    takeLatest(getOptions, getOptionsApi),
    takeLatest(optionchain, optionchainApi),
    takeLatest(optionchainSymbol, optionchainSymbolApi),
    takeLatest(optionchainTable, optionchainTableApi),
    takeLatest(DeactivateWithPhone, DeactivateWithPhoneApi),
    takeLatest(DeactivateVerify, DeactivateVerifyApi), //
    takeLatest(DeactivateFeedback, DeactivateFeedbackApi),
    takeLatest(ActivationVerify, ActivationVerifyApi),
    takeLatest(referalDetail, referalDetailApi),
    takeLatest(AccountDelete, AccountDeleteApi),
    takeLatest(getTicker, getTickerApi),
  ]);
}
