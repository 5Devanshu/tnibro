import {all, call, put, takeLatest, takeEvery} from 'redux-saga/effects';
import {
  getRequestAuth,
  postRequestAuth,
  putRequestAuth,
  patchRequestAuth,
  deleteRequestAuth,
} from '../../axiosClientAuth';
import {getNewListing, getNewListingFailure, getNewListingSuccess} from './NewListingSlice';
import {ToastHandler} from '../../../utils/utils';

function* getNewListingApi(action) {
  let id = action.payload.userid;
  try {
    const response = yield call(() =>
      getRequestAuth(`appdashboard/new_listed_stock?userid=${id}`, action.payload),
    );
    yield put(getNewListingSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response);
    yield put(getNewListingFailure(error?.response));
  }
}

export default function* newListingSaga() {
  yield all([takeLatest(getNewListing, getNewListingApi)]);
}
