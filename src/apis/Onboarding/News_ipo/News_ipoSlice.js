import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isnewsSuccess: '',
  isnewsError: '',
  isLoad: false,
  israiseTicketSuccess: '',
  isticketLength: '',
  israiseTicketFail: '',
  isLoads: false,
  iscreateTicketSuccess: '',
  iscreateTicketFail: '',
  isLoadingcomment: false,
  isticketCommentSuccess: '',
  isticketCommentFail: '',
  isLoadings: false,
  ispostTicketSuccess: '',
  ispostTicketCommentFail: '',
};

const News_ipoSlice = createSlice({
  name: 'news_ipoSlice',
  initialState,
  reducers: {
    getNews(state, _) {
      state.isLoading = true;
      state.isnewsSuccess = '';
      state.isnewsError = '';
    },
    getNewsSuccess(state, action) {
      state.isLoading = false;
      state.isnewsSuccess = action?.payload?.response;
      state.isnewsError = '';
    },
    getNewsFailure(state, action) {
      state.isLoading = false;
      state.isnewsSuccess = '';
      state.isnewsError = action.payload.data;
    },
    ///get all raise ticket by user
    getraise_ticket(state) {
      state.isLoad = true;
      state.israiseTicketSuccess = '';
      state.israiseTicketFail = '';
    },
    getraise_ticketSuccess(state, action) {
      state.isLoad = false;
      state.israiseTicketSuccess = action?.payload;
      state.isticketLength = action?.payload?.response?.length;
      state.israiseTicketFail = '';
    },
    getraise_ticketFail(state, action) {
      state.isLoad = false;
      state.israiseTicketSuccess = '';
      state.israiseTicketFail = action?.payload?.data;
    },

    ///Create ticket by user
    createNewTicket(state) {
      state.isLoads = true;
      state.iscreateTicketSuccess = '';
      state.iscreateTicketFail = '';
    },
    createNewTicketSuccess(state, action) {
      state.isLoads = false;
      state.iscreateTicketSuccess = action?.payload;
      state.iscreateTicketFail = '';
    },
    createNewTicketFail(state, action) {
      state.isLoads = false;
      state.iscreateTicketSuccess = '';
      state.iscreateTicketFail = action?.payload?.data;
    },
    resetCreatTicket(state) {
      state.isLoads = false;
      state.iscreateTicketSuccess = '';
      state.iscreateTicketFail = '';
    },
    ///
    getTicketComment(state) {
      state.isLoadingcomment = true;
      state.isticketCommentSuccess = '';
      state.isticketCommentFail = '';
    },
    getTicketCommentSuccess(state, action) {
      state.isLoadingcomment = false;
      state.isticketCommentSuccess = action?.payload;
      state.isticketCommentFail = '';
    },
    getTicketCommentFail(state, action) {
      state.isLoadingcomment = false;
      state.isticketCommentSuccess = '';
      state.isticketCommentFail = action?.payload?.data;
    },
    //// post ticket comoment
    postTicketComment(state) {
      state.isLoadings = true;
      state.ispostTicketSuccess = '';
      state.ispostTicketCommentFail = '';
    },
    postTicketCommentSuccess(state, action) {
      state.isLoadings = false;
      state.ispostTicketSuccess = action?.payload;
      state.ispostTicketCommentFail = '';
    },
    postTicketCommentFail(state, action) {
      state.isLoadings = false;
      state.ispostTicketSuccess = '';
      state.ispostTicketCommentFail = action?.payload?.data;
    },
  },
});

export const {
  getNews,
  getNewsSuccess,
  getNewsFailure,
  getraise_ticket,
  getraise_ticketSuccess,
  getraise_ticketFail,
  createNewTicket,
  createNewTicketSuccess,
  createNewTicketFail,
  resetCreatTicket,
  getTicketComment,
  getTicketCommentSuccess,
  getTicketCommentFail,
  postTicketComment,
  postTicketCommentSuccess,
  postTicketCommentFail,
} = News_ipoSlice.actions;

export default News_ipoSlice.reducer;
