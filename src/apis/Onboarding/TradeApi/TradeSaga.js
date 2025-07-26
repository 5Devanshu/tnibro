import {all, call, put, takeLatest, takeEvery} from 'redux-saga/effects';
import {getRequestAuth, postRequestAuth} from '../../axiosClientAuth';
import {
  getTradedata,
  getTradedataSuccess,
  getTradedataFailure,
  getIndicesTrade,
  getIndicesTradeSucess,
  getIndicesTradeFail,
} from './TradeSlice';
import {ToastHandler} from '../../../utils/utils';

function* getTradedataApi(action) {
  try {
    const response = yield call(() => postRequestAuth(`appdashboard/trade`, action.payload));
    yield put(getTradedataSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(getTradedataFailure(error?.response));
  }
}
function* getIndicesTradeApi(action) {
  try {
    const response = yield call(() => getRequestAuth(`appdashboard/indices_trade`, action.payload));
    yield put(getIndicesTradeSucess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response ?? '');
    yield put(getIndicesTradeFail(error?.response));
  }
}
export default function* TradeSaga() {
  yield all([takeLatest(getTradedata, getTradedataApi)]);
  yield all([takeLatest(getIndicesTrade, getIndicesTradeApi)]);
}
