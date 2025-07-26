import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  isloader: false,
  isadvisoryOpenTradeSuccess: '',
  isAdvisoryOpenTradeFail: '',
  isloading: false,
  isadvisoryCloseTradeSuccess: [],
  isadvisoryCloseTradeFail: '',
  // Trading calls
  isTradingCallsOpenCashSuccess: '',
  isTradingCallsOpenCashFail: '',
  isTradingCallsOpenFuturesSuccess: '',
  isTradingCallsOpenFuturesFail: '',
  isTradingCallsCloseCashSuccess: '',
  isTradingCallsCloseCashFail: '',
  isTradingCallsCloseFuturesSuccess: '',
  isTradingCallsCloseFuturesFail: '',
};

const AdvisoryTradeSlice = createSlice({
  name: 'AdvisoryTradeSlice',
  initialState,
  reducers: {
    AdvisoryOpenTrade(state, _) {
      state.isloader = true;
      state.isadvisoryOpenTradeSuccess = '';
      state.isAdvisoryOpenTradeFail = '';
    },
    AdvisoryOpenTradeSuccess(state, action) {
      state.isloader = false;
      state.isadvisoryOpenTradeSuccess = action?.payload;
      state.isAdvisoryOpenTradeFail = '';
    },
    AdvisoryOpenTradeFail(state, action) {
      state.isloader = false;
      state.isAdvisoryOpenTradeFail = action?.payload?.data;
      state.isadvisoryOpenTradeSuccess = '';
    },
    getclearDate(state) {
      state.isloader = false;
      state.isAdvisoryOpenTradeFail = '';
      state.isadvisoryOpenTradeSuccess = '';
    },
    AdvisoryCloseTrade(state, _) {
      state.isloading = true;
      state.isadvisoryCloseTradeSuccess = '';
      state.isadvisoryCloseTradeFail = '';
    },
    AdvisoryCloseTradeSuccess(state, action) {
      state.isloading = false;
      state.isadvisoryCloseTradeSuccess = action?.payload;
      state.isadvisoryCloseTradeFail = '';
    },
    AdvisoryCloseTradeFail(state, action) {
      state.isloading = false;
      state.isadvisoryCloseTradeSuccess = '';
      state.isadvisoryCloseTradeFail = action?.payload?.data;
    },
    // Tradings Calls
    // Trading Calls open Cash
    TradingCallsOpenCash(state) {
      state.isloading = true;
      state.isTradingCallsOpenCashSuccess = '';
      state.isTradingCallsOpenCashFail = '';
    },
    TradingCallsOpenCashSuccess(state, action) {
      state.isloading = false;
      state.isTradingCallsOpenCashSuccess = action?.payload;
      state.isTradingCallsOpenCashFail = '';
    },
    TradingCallsOpenCashFail(state, action) {
      state.isloading = false;
      state.isTradingCallsOpenCashSuccess = '';
      state.isTradingCallsOpenCashFail = action?.payload?.data;
    },
    //Trading calls Open Trades Futures
    TradingCallsOpenFutures(state) {
      state.isloading = true;
      state.isTradingCallsOpenFuturesSuccess = '';
      state.isTradingCallsOpenFuturesFail = '';
    },
    TradingCallsOpenFuturesSuccess(state, action) {
      state.isloading = false;
      state.isTradingCallsOpenFuturesSuccess = action?.payload;
      state.isTradingCallsOpenFuturesFail = '';
    },
    TradingCallsOpenFuturesFail(state, action) {
      state.isloading = false;
      state.isTradingCallsOpenFuturesSuccess = '';
      state.isTradingCallsOpenFuturesFail = action?.payload?.data;
    },
    // Trading Calls Close Trades Cash
    TradingCallsCloseCash(state) {
      state.isloading = true;
      state.isTradingCallsCloseCashSuccess = '';
      state.isTradingCallsCloseCashFail = '';
    },
    TradingCallsCloseCashSuccess(state, action) {
      state.isloading = false;
      state.isTradingCallsCloseCashSuccess = action?.payload;
      state.isTradingCallsCloseCashFail = '';
    },
    TradingCallsCloseCashFail(state, action) {
      state.isloading = false;
      state.isTradingCallsCloseCashSuccess = '';
      state.isTradingCallsCloseCashFail = action?.payload?.data;
    },
    /// Trading Calls Close Trades Futures
    TradingCallsCloseFutures(state) {
      state.isloading = true;
      state.isTradingCallsCloseFuturesSuccess = '';
      state.isTradingCallsCloseFuturesFail = '';
    },
    TradingCallsCloseFuturesSuccess(state, action) {
      state.isloading = false;
      state.isTradingCallsCloseFuturesSuccess = action?.payload;
      state.isTradingCallsCloseFuturesFail = '';
    },
    TradingCallsCloseFuturesFail(state, action) {
      state.isloading = false;
      state.isTradingCallsCloseFuturesSuccess = '';
      state.isTradingCallsCloseFuturesFail = action?.payload?.data;
    },
  },
});
export const {
  AdvisoryOpenTrade,
  AdvisoryOpenTradeSuccess,
  AdvisoryOpenTradeFail,
  AdvisoryCloseTrade,
  AdvisoryCloseTradeSuccess,
  AdvisoryCloseTradeFail,
  // Trading calls
  TradingCallsOpenCash,
  TradingCallsOpenCashSuccess,
  TradingCallsOpenCashFail,
  TradingCallsOpenFutures,
  TradingCallsOpenFuturesSuccess,
  TradingCallsOpenFuturesFail,
  TradingCallsCloseCash,
  TradingCallsCloseCashSuccess,
  TradingCallsCloseCashFail,
  TradingCallsCloseFutures,
  TradingCallsCloseFuturesSuccess,
  TradingCallsCloseFuturesFail,
} = AdvisoryTradeSlice.actions;

export default AdvisoryTradeSlice.reducer;
