import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isloader: false,
  isDashboardTabDataError: '',
  isDashboardTabDataSuccess: '',
  noDataFound: false,
  TabDataErrorMsg: '',
  emptymsg: '',
  isloading: false,
  isScreenerDataSuccess: '',
  isScreenerDataerror: '',
};

const dashboardTabDataSlice = createSlice({
  name: 'dashboardTabData',
  initialState,
  reducers: {
    getDashboardTabData(state, action) {
      state.isloader = true;
      state.isDashboardTabDataError = '';
      state.isDashboardTabDataSuccess = '';
      state.noDataFound = false;
      state.emptymsg = '';
    },
    getDashboardTabDataSuccess(state, action) {
      state.isloader = false;
      state.isDashboardTabDataError = '';
      state.isDashboardTabDataSuccess = action?.payload;
      state.isTabScreenerSaveData = action?.payload;
      if (action?.payload?.response.length == 0) {
        state.noDataFound = true;
        state.emptymsg = action?.payload?.message;
      }
    },
    getDashboardTabDataFailure(state, action) {
      state.isloader = false;
      state.isDashboardTabDataError = action?.payload?.data;
      state.TabDataErrorMsg = action?.payload?.data?.response;
      state.isDashboardTabDataSuccess = '';
      state.emptymsg = '';
    },
    resetDashboardTabData(state) {
      state.isloader = false;
      state.isDashboardTabDataError = '';
      state.isDashboardTabDataSuccess = '';
      state.noDataFound = false;
      state.emptymsg = '';
    },
    ///////
    getScreenerData(state) {
      state.isloading = true;
      state.isScreenerDataSuccess = '';
      state.isScreenerDataerror = '';
    },
    getScreenerDataSuccess(state, action) {
      state.isloading = false;
      state.isScreenerDataSuccess = action?.payload;
      state.isScreenerDataerror = '';
    },
    getScreenerDataFailure(state, action) {
      state.isloading = false;
      state.isScreenerDataSuccess = '';
      state.isScreenerDataerror = action?.payload?.data;
    },
  },
});
export const {
  getDashboardTabData,
  getDashboardTabDataSuccess,
  getDashboardTabDataFailure,
  getScreenerData,
  getScreenerDataSuccess,
  getScreenerDataFailure,
  resetDashboardTabData,
} = dashboardTabDataSlice.actions;

export default dashboardTabDataSlice.reducer;
