import {createSlice} from '@reduxjs/toolkit';
// Nifty /banknifty,finnifty api
const initialState = {
  isloader: false,
  isTradeDataFail: '',
  isTradeDataSuccess: [],
  isTradeDataFailMsg: '',
  isloading: false,
  isindicesTradeSuccess: [],
  isindicesTradeFail: '',
};

const TradeSlice = createSlice({
  name: 'TradeSlice',
  initialState,
  reducers: {
    getTradedata(state) {
      state.isloader = true;
      state.isTradeDataFail = '';
      state.isTradeDataSuccess = [];
    },
    getTradedataSuccess(state, action) {
      state.isloader = false;
      state.isTradeDataSuccess = action?.payload?.response;
      state.isTradeDataFail = '';
    },
    getTradedataFailure(state, action) {
      state.isloader = false;
      state.isTradeDataFail = action?.payload?.data;
      state.isTradeDataSuccess = '';
      state.isTradeDataFailMsg = action?.payload?.data?.response;
    },
    getclearDate(state) {
      state.isloader = false;
      state.isTradeDataFail = '';
      state.isTradeDataSuccess = [];
    },
    getIndicesTrade(state) {
      state.isloading = true;
      state.isindicesTradeSuccess = [];
      state.isindicesTradeFail = '';
    },
    getIndicesTradeSucess(state, action) {
      state.isloading = false;
      state.isindicesTradeSuccess = action?.payload?.response;
      state.isindicesTradeFail = '';
    },
    getIndicesTradeFail(state, action) {
      state.isloading = false;
      state.isindicesTradeSuccess = [];
      state.isindicesTradeFail = action?.payload?.data;
    },
  },
});
export const {
  getTradedata,
  getTradedataSuccess,
  getTradedataFailure,
  getclearDate,
  getIndicesTrade,
  getIndicesTradeSucess,
  getIndicesTradeFail,
} = TradeSlice.actions;

export default TradeSlice.reducer;
