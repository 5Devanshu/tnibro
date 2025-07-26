import {all, call, put, takeLatest, takeEvery} from 'redux-saga/effects';
import {getRequestAuth, postRequestAuth} from '../../axiosClientAuth';
import {ToastHandler} from '../../../utils/utils';
import {
  getNews,
  getNewsSuccess,
  getNewsFailure,
  getraise_ticket,
  getraise_ticketSuccess,
  getraise_ticketFail,
  createNewTicket,
  createNewTicketSuccess,
  createNewTicketFail,
  getTicketComment,
  getTicketCommentSuccess,
  getTicketCommentFail,
  postTicketComment,
  postTicketCommentSuccess,
  postTicketCommentFail,
} from './News_ipoSlice';

function* getNewsApi(action) {
  //   let id = action.payload.userid;
  try {
    const response = yield call(() => getRequestAuth(`advertisement/news`, action.payload));
    yield put(getNewsSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response);
    yield put(getNewsFailure(error?.response));
  }
}
function* getraise_ticketApi(action) {
  try {
    const response = yield call(() => getRequestAuth(`support/raise_request`, action.payload));
    yield put(getraise_ticketSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response);
    yield put(getraise_ticketFail(error?.response));
  }
}
function* createNewTicketApi(action) {
  try {
    const response = yield call(() => postRequestAuth(`support/raise_request`, action.payload));
    yield put(createNewTicketSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response?.file);
    yield put(createNewTicketFail(error?.response));
  }
}
function* getTicketCommentApi(action) {
  let id = action?.payload?.id;
  try {
    const response = yield call(() =>
      getRequestAuth(`support/ticket_comment?id=${id}`, action.payload),
    );
    yield put(getTicketCommentSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response);
    yield put(getTicketCommentFail(error?.response));
  }
}
function* postTicketCommentApi(action) {
  try {
    const response = yield call(() => postRequestAuth(`support/ticket_comment`, action.payload));
    yield put(postTicketCommentSuccess(response?.data));
  } catch (error) {
    ToastHandler(false, error?.response?.data?.response);
    yield put(postTicketCommentFail(error?.response));
  }
}

export default function* News_ipoSaga() {
  yield all([
    takeLatest(getNews, getNewsApi),
    takeLatest(getraise_ticket, getraise_ticketApi),
    takeLatest(createNewTicket, createNewTicketApi),
    takeLatest(getTicketComment, getTicketCommentApi),
    takeLatest(postTicketComment, postTicketCommentApi),
  ]);
}
