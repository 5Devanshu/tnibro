import {all, call, put, takeLatest, takeEvery} from 'redux-saga/effects';
import {
  getRequestAuth,
  postRequestAuth,
  putRequestAuth,
  patchRequestAuth,
  deleteRequestAuth,
} from '../../axiosClientAuth';
import {getTokenVerify, getTokenVerifyFailure, getTokenVerifySuccess} from './TokenVerifySlice';

function UserException(message) {
  this.response;
  this.message = message;
  this.name = 'UserException';
  this.status = 403;
}

function* getTokenVerifyApi(action) {
  let id = action.payload.userid;
  try {
    const response = yield call(() => getRequestAuth(`tnibroapp/token_verify`, action.payload));
    yield put(getTokenVerifySuccess(response?.data));
  } catch (error) {
    yield put(getTokenVerifyFailure(error?.response));
  }
}

export default function* TokenVerifySaga() {
  yield all([takeLatest(getTokenVerify, getTokenVerifyApi)]);
}
