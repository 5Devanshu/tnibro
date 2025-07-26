import {all, call, put, takeLatest, takeEvery} from 'redux-saga/effects';
import {getRequestAuth} from '../../axiosClientAuth';
import {
  getHomeScreen,
  getHomeScreenSuccess,
  getHomeScreenFailure,
  home_stock_screen,
  home_stock_screenSuccess,
  home_stock_screenFailure,
  market_trends,
  market_trends_Success,
  market_trends_Failure,
  market_trends_Loser,
  market_trends_Loser_Success,
  market_trends_Loser_Failure,
  advertisement_videos,
  advertisement_videos_Success,
  advertisement_videos_Failure,
  advertisement_Banner,
  advertisement_BannerSuccess,
  advertisement_BannerFail,
  OpenTrade,
  OpenTradeSuccess,
  OpenTradeFailure,
  OpenTradeRedAlert,
  OpenTradeRedAlertSuccess,
  OpenTradeRedAlertFailure,
} from './HomeScreenSlice';
import {ToastHandler} from '../../../utils/utils';

function* getHomeScreenApi(action) {
  try {
    const response = yield call(() => getRequestAuth(`home/home_screen`, action.payload));
    yield put(getHomeScreenSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response);
    yield put(getHomeScreenFailure(error?.response));
  }
}
function* home_stock_screenApi(action) {
  try {
    const response = yield call(() => getRequestAuth(`home/home_screen_stocks`, action.payload));
    yield put(home_stock_screenSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response);
    yield put(home_stock_screenFailure(error?.response));
  }
}
// All top gainer List
function* market_trendsApi(action) {
  let type = action.payload?.type;
  try {
    const response = yield call(() =>
      getRequestAuth(`home/market_trends?type=${type}`, action.payload),
    );
    yield put(market_trends_Success(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response);
    yield put(market_trends_Failure(error?.response));
  }
}
// All top loser list
function* market_trends_LoserApi(action) {
  let type = action.payload?.type;
  try {
    const response = yield call(() =>
      getRequestAuth(`home/market_trends?type=${type}`, action.payload),
    );
    yield put(market_trends_Loser_Success(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response);
    yield put(market_trends_Loser_Failure(error?.response));
  }
}
function* advertisement_videosApi(action) {
  try {
    const response = yield call(() => getRequestAuth(`advertisement/videos`, action.payload));
    yield put(advertisement_videos_Success(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response);
    yield put(advertisement_videos_Failure(error?.response));
  }
}
function* advertisement_BannerApi(action) {
  try {
    const response = yield call(() =>
      getRequestAuth(`advertisement/screens/banner`, action.payload),
    );
    yield put(advertisement_BannerSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response);
    yield put(advertisement_BannerFail(error?.response));
  }
}

function* OpenTradeApi(action) {
  try {
    const response = yield call(() => getRequestAuth(`home/opentrade/gainers`, action.payload));
    yield put(OpenTradeSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response);
    yield put(OpenTradeFailure(error?.response));
  }
}
function* OpenTradeRedAlertApi(action) {
  try {
    const response = yield call(() => getRequestAuth(`home/opentrade/losers`, action.payload));
    yield put(OpenTradeRedAlertSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response);
    yield put(OpenTradeRedAlertFailure(error?.response));
  }
}

export default function* HomeScreenSaga() {
  yield all([
    takeLatest(getHomeScreen, getHomeScreenApi),
    takeLatest(home_stock_screen, home_stock_screenApi),
    takeLatest(market_trends, market_trendsApi),
    takeLatest(market_trends_Loser, market_trends_LoserApi),
    takeLatest(advertisement_videos, advertisement_videosApi),
    takeLatest(advertisement_Banner, advertisement_BannerApi),
    takeLatest(OpenTrade, OpenTradeApi),
    takeLatest(OpenTradeRedAlert, OpenTradeRedAlertApi),
  ]);
}
