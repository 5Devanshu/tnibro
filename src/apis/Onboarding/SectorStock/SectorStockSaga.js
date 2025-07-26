import {all, call, put, takeLatest, takeEvery} from 'redux-saga/effects';
import {
  getRequestAuth,
  postRequestAuth,
  putRequestAuth,
  patchRequestAuth,
  deleteRequestAuth,
} from '../../axiosClientAuth';
import {
  getSectorStock,
  getSectorStockFailure,
  getSectorStockSuccess,
  getPredictionStockSuccess,
  getPredictionStockFailure,
  getPredictionStock,
} from './SectorStockSlice';

function UserException(message) {
  this.response;
  this.message = message;
  this.name = 'UserException';
  this.status = 403;
}

function* getSectorStockApi(action) {
  let id = action.payload.userid;
  let sector = action.payload.sector;
  try {
    const response = yield call(() =>
      postRequestAuth(
        `appdashboard/sector_stock_search?userid=${id}&sector=${sector}`,
        action.payload,
      ),
    );
    yield put(getSectorStockSuccess(response?.data));
  } catch (error) {
    yield put(getSectorStockFailure(error?.response));
  }
}
function* getPredictionStockApi(action) {
  let id = action.payload.stock_id;

  try {
    const response = yield call(() =>
      getRequestAuth(`appdashboard/stocks_predictions?stock_id=${id}`, action.payload),
    );
    yield put(getPredictionStockSuccess(response.data));
  } catch (error) {
    yield put(getPredictionStockFailure(error.response));
  }
}

export default function* sectorStockSaga() {
  yield all([
    takeLatest(getSectorStock, getSectorStockApi),
    takeLatest(getPredictionStock, getPredictionStockApi),
  ]);
}
