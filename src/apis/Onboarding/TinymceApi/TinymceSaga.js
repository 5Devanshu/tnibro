import {all, call, put, takeLatest, takeEvery} from 'redux-saga/effects';
import {getRequestAuth} from '../../axiosClientAuth';
import {getTinymce, getTinymceFailure, getTinymceSuccess} from './TinymceSlice';

function* getTinymceApi(action) {
  let screen_name = action.payload.screen_name;
  try {
    const response = yield call(() =>
      getRequestAuth(`appdashboard/popup_message?screen_name=${screen_name}`, action.payload),
    );
    yield put(getTinymceSuccess(response?.data));
  } catch (error) {
    yield put(getTinymceFailure(error?.response));
  }
}

export default function* TinymceSaga() {
  yield all([takeLatest(getTinymce, getTinymceApi)]);
}
