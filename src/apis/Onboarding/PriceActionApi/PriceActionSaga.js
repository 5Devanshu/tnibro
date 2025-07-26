import {all, call, put, takeLatest, takeEvery} from 'redux-saga/effects';
import {getRequestAuth} from '../../axiosClientAuth';
import {getPriceAction, getPriceActionFailure, getPriceActionSuccess} from './PriceActionSlice';

function* getPriceActionApi(action) {
  let id = action.payload.userid;
  try {
    const response = yield call(() =>
      getRequestAuth(`appdashboard/price_action?userid=${id}`, action.payload),
    );
    yield put(getPriceActionSuccess(response?.data));
  } catch (error) {
    yield put(getPriceActionFailure(error?.response));
  }
}

export default function* PriceActionSaga() {
  yield all([takeLatest(getPriceAction, getPriceActionApi)]);
}
