import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isloader: false,
  isGainerDataError: '',
  isGainerDataSuccess: [],
  noDataFound: false,
  GainerDataErrorMsg: '',
};

const GainerDataSlice = createSlice({
  name: 'gainerdata',
  initialState,
  reducers: {
    getGainerData(state, action) {
      state.isloader = true;
      state.isGainerDataError = '';
      state.isGainerDataSuccess = [];
      state.noDataFound = false;
    },
    getGainerDataSuccess(state, action) {
      state.isloader = false;
      state.isGainerDataError = '';
      state.isGainerDataSuccess = action?.payload?.response;
      // state.isTabScreenerSaveData = action?.payload;
      // if (action?.payload?.response.length == 0) {
      //   state.noDataFound = true;
      // }
    },
    getGainerDataFailure(state, action) {
      state.isloader = false;
      state.isGainerDataError = action?.payload?.data;
      state.GainerDataErrorMsg = action?.payload?.data?.response;
      state.isGainerDataSuccess = '';
    },
  },
});
export const {getGainerData, getGainerDataSuccess, getGainerDataFailure} = GainerDataSlice.actions;

export default GainerDataSlice.reducer;
