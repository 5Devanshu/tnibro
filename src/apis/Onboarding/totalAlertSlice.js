import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {combineReducers} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isTotalAlertError: '',
  isTotalAlertSuccess: [],
  moreLoading: false,
  moreError: null,
  ifLisEnd: false,
  totalPages: 1,
  isLoaded: false,
  isdeletelAlertLiSuccess: '',
  isdeleteAlertLiError: '',
  iseditAlertLiSuccess: '',
  iseditAlertLiError: '',
  isStartAlertLoading: false,
  isStartAlertSuccess: '',
  isStartAlertFail: '',
  isTriggeredAlertLoad: false,
  isTriggeredAlertSuccess: '',
  isTriggeredAlertFail: '',
  isUserTriggeredAlertLoad: false,
  isUSerTriggeredAlertSuccess: '',
  isUserTriggeredAlertFail: '',
  isStockAlertToggletLoading: false,
  isStockAlertToggleSuccess: '',
  isStockAlertToggleFail: '',
};

const totalAlertSlice = createSlice({
  name: 'totalalert',
  initialState,
  reducers: {
    getTotalAlert(state) {
      // if (action?.payload?.page_no === 1) {
      //   state.isLoading = true;
      // } else {
      //   state.moreLoading = true;
      // }
      state.isLoading = true;
      state.isTotalAlertSuccess = '';
      state.isTotalAlertError = '';
    },
    getTotalAlertSuccess(state, action) {
      state.isLoading = false;
      // state.isTotalAlertSuccess = [...state.isTotalAlertSuccess, ...action?.payload?.response];
      state.isTotalAlertSuccess = action?.payload?.response;
      state.isTotalAlertError = '';
      state.moreLoading = false;
      // state.totalPages = Math.ceil(action.payload?.total_length / 10);
      state.totalPages = action.payload?.total_length;
    },
    getTotalAlertFailure(state, action) {
      state.isLoading = false;
      state.isTotalAlertSuccess = [];
      state.isTotalAlertError = action.payload.data;
      state.moreLoading = false;
    },
    deleteAlert: (state, action) => {
      state.isTotalAlertSuccess = state.isTotalAlertSuccess.filter(
        item => item.id !== action.payload?.response,
      );
    },
    //// delete alert in alert screen
    deleteAlertList(state, action) {
      state.isLoaded = true;
    },
    resetList(state) {
      state.isTotalAlertSuccess = '';
    },
    deleteAlertListSuccess(state, action) {
      state.isLoaded = false;
      state.isdeletelAlertLiSuccess = action?.payload;
      state.isdeleteAlertLiError = '';
    },
    deleteAlertListFailure(state, action) {
      state.isLoaded = false;
      state.isdeletelAlertLiSuccess = '';
      state.isdeleteAlertLiError = action?.payload?.data;
    },
    ////// Edit Alert
    editAlertList(state, action) {
      state.isLoaded = true;
      state.iseditAlertLiSuccess = '';
      state.iseditAlertLiError = '';
    },
    editAlertListSuccess(state, action) {
      state.isLoaded = false;
      state.iseditAlertLiSuccess = action?.payload;
      state.iseditAlertLiError = '';
    },
    editAlertListFailure(state, action) {
      state.isLoaded = false;
      state.iseditAlertLiSuccess = '';
      state.iseditAlertLiError = action?.payload?.data;
    },
    resetEditAlert(state) {
      state.isLoaded = false;
      state.iseditAlertLiSuccess = '';
      state.iseditAlertLiError = '';
    },
    /// api to get premium  star stocks
    premiumStockAlert(state) {
      state.isStartAlertLoading = true;
      state.isStartAlertSuccess = '';
      state.isStartAlertFail = '';
    },
    premiumStockAlertSuccess(state, action) {
      state.isStartAlertLoading = false;
      state.isStartAlertSuccess = action?.payload;
      state.isStartAlertFail = '';
    },
    premiumStockAlertFail(state, action) {
      state.isStartAlertLoading = false;
      state.isStartAlertSuccess = '';
      state.isStartAlertFail = action?.payload?.data;
    },
    ///// star stock auto triggered alert list
    alertTriggeredList(state) {
      state.isTriggeredAlertLoad = true;
      state.isTriggeredAlertSuccess = '';
      state.isTriggeredAlertFail = '';
    },
    alertTriggeredListSuccess(state, action) {
      state.isTriggeredAlertLoad = false;
      state.isTriggeredAlertSuccess = action?.payload;
      state.isTriggeredAlertFail = '';
    },
    alertTriggeredListFail(state, action) {
      state.isTriggeredAlertLoad = false;
      state.isTriggeredAlertSuccess = '';
      state.isTriggeredAlertFail = action?.payload?.data;
    },
    ////// user alert trigger list
    useralertTriggeredList(state) {
      state.isUserTriggeredAlertLoad = true;
      state.isUSerTriggeredAlertSuccess = '';
      state.isUserTriggeredAlertFail = '';
    },
    useralertTriggeredListSuccess(state, action) {
      state.isUserTriggeredAlertLoad = false;
      state.isUSerTriggeredAlertSuccess = action?.payload;
      state.isUserTriggeredAlertFail = '';
    },
    useralertTriggeredListFail(state, action) {
      state.isUserTriggeredAlertLoad = false;
      state.isUSerTriggeredAlertSuccess = '';
      state.isUserTriggeredAlertFail = action?.payload?.data;
    },
    //alert toggle
    StockAlertToggle(state) {
      state.isStockAlertToggletLoading = true;
      state.isStockAlertToggleSuccess = '';
      state.isStockAlertToggleFail = '';
    },
    StockAlertToggleSuccess(state, action) {
      state.isStockAlertToggletLoading = false;
      state.isStockAlertToggleSuccess = action?.payload;
      state.isStockAlertToggleFail = '';
    },
    StockAlertToggleFail(state, action) {
      state.isStockAlertToggletLoading = false;
      state.isStockAlertToggleSuccess = '';
      state.isStockAlertToggleFail = action?.payload?.data;
    },
  },
});

export const {
  getTotalAlert,
  getTotalAlertSuccess,
  getTotalAlertFailure,
  deleteAlertList,
  deleteAlertListSuccess,
  deleteAlertListFailure,
  editAlertList,
  editAlertListSuccess,
  editAlertListFailure,
  resetEditAlert,
  deleteAlert,
  resetList,
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
} = totalAlertSlice.actions;

export default totalAlertSlice.reducer;
