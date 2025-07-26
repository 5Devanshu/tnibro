import {all, call, put, takeLatest, takeEvery} from 'redux-saga/effects';
import {getRequestAuth} from '../../axiosClientAuth';
import {
  AdvisoryOpenTrade,
  AdvisoryOpenTradeSuccess,
  AdvisoryOpenTradeFail,
  AdvisoryCloseTrade,
  AdvisoryCloseTradeSuccess,
  AdvisoryCloseTradeFail,
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
} from './AdvisoryTradeSlice';
import {ToastHandler} from '../../../utils/utils';

function* AdvisoryOpenTradeApi(action) {
  let status = action?.payload?.status;
  try {
    const response = yield call(() =>
      getRequestAuth(`predictions/advisory/open?status=${status}`, action.payload),
    );
    yield put(AdvisoryOpenTradeSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(AdvisoryOpenTradeFail(error?.response));
  }
}
function* AdvisoryCloseTradeApi(action) {
  let status = action.payload.status;
  try {
    const response = yield call(() =>
      getRequestAuth(`predictions/advisory/close?status=${status}`, action.payload),
    );
    yield put(AdvisoryCloseTradeSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(AdvisoryCloseTradeFail(error?.response));
  }
}
//Trading Calls
function* TradingCallsOpenCashApi(action) {
  try {
    const response = yield call(() => getRequestAuth(`predictions/cash/open`, action.payload));
    yield put(TradingCallsOpenCashSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(TradingCallsOpenCashFail(error?.response));
  }
}
function* TradingCallsOpenFuturesApi(action) {
  try {
    const response = yield call(() => getRequestAuth(`predictions/futures/open`, action.payload));
    yield put(TradingCallsOpenFuturesSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(TradingCallsOpenFuturesFail(error?.response));
  }
}
function* TradingCallsCloseCashApi(action) {
  try {
    const response = yield call(() => getRequestAuth(`predictions/cash/close`, action.payload));
    yield put(TradingCallsCloseCashSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(TradingCallsCloseCashFail(error?.response));
  }
}
function* TradingCallsCloseFuturesApi(action) {
  try {
    const response = yield call(() => getRequestAuth(`predictions/futures/close`, action.payload));
    yield put(TradingCallsCloseFuturesSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(TradingCallsCloseFuturesFail(error?.response));
  }
}
export default function* AdvisoryTradeSaga() {
  yield all([takeLatest(AdvisoryOpenTrade, AdvisoryOpenTradeApi)]);
  yield all([takeLatest(AdvisoryCloseTrade, AdvisoryCloseTradeApi)]);
  yield all([takeLatest(TradingCallsOpenCash, TradingCallsOpenCashApi)]);
  yield all([takeLatest(TradingCallsOpenFutures, TradingCallsOpenFuturesApi)]);
  yield all([takeLatest(TradingCallsCloseCash, TradingCallsCloseCashApi)]);
  yield all([takeLatest(TradingCallsCloseFutures, TradingCallsCloseFuturesApi)]);
}
