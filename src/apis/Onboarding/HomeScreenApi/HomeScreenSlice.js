import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  ishomeScreemSuccess: '',
  isRefunButton: false,
  isSupportButton: false,
  isStarStocksScreen: false,
  market_status:null,
  rating_sent:false,
  lock_data: false,
  ishomeScreenError: '',
  ishome_stockSuccess: '',
  ishome_stockError: '',
  isLoad: false,
  ismarket_trendsSuccess: '',
  ismarket_trendsError: '',
  isLoadss: '',
  ismarket_trendsLoserSuccess: '',
  ismarket_trendsLoserError: '',
  isVideoLoad: false,
  isVideoSuccess: '',
  isVideoError: '',
  isVideoLength: '',
  isadvertisementBannerLoad: false,
  isAdvertisementBannerSuccess: '',
  isAdvertisementBannerFail: '',
  isLoads: false,
  isredAlertLoads: false,
  isOpenTradeSuccess: '',
  openTradeGreenlength: '',
  isOpenTradeError: '',
  isOpenTradeRedAlertSuccess: '',
  openTradelength: '',
  isOpenTradeRedAlertError: '',
};

const HomeScreenSlice = createSlice({
  name: 'HomeScreenSlice',
  initialState,
  reducers: {
    getHomeScreen(state, _) {
      state.isLoading = true;
      state.ishomeScreemSuccess = '';
      state.ishomeScreenError = '';
    },
    getHomeScreenSuccess(state, action) {
      state.isLoading = false;
      state.ishomeScreemSuccess = action?.payload;
      state.isRefunButton = action?.payload?.response?.[0]?.isRefunButton;
      state.isSupportButton = action?.payload?.response?.[0]?.isSupportButton;
      state.isStarStocksScreen = action?.payload?.response?.[0]?.isStarStocksScreen;
      state.market_status  = action?.payload?.response?.[0]?.market_status;
      state.rating_sent  = action?.payload?.response?.[0]?.rating_sent
      state.lock_data = action?.payload?.response?.[0]?.lock_data;
      state.ishomeScreenError = '';
    },
    getHomeScreenFailure(state, action) {
      state.isLoading = false;
      state.ishomeScreemSuccess = '';
      state.isRefunButton = false;
      state.isSupportButton = false;
      state.isStarStocksScreen = false;
      state.market_status = null;
      state.rating_sent = false;
      state.lock_data = false;
      state.ishomeScreenError = action.payload.data;
    },
    home_stock_screen(state, action) {
      state.isLoading = true;
      state.ishome_stockSuccess = '';
      state.ishome_stockError = '';
    },
    home_stock_screenSuccess(state, action) {
      state.isLoading = false;
      state.ishome_stockSuccess = action?.payload;
      state.ishome_stockError = '';
    },
    home_stock_screenFailure(state, action) {
      state.isLoading = false;
      state.ishome_stockSuccess = '';
      state.ishome_stockError = action.payload.data;
    },
    //market_trends  seeAll Top Gainer
    market_trends(state, action) {
      state.isLoad = true;
      state.ismarket_trendsSuccess = '';
      state.ismarket_trendsError = '';
    },
    market_trends_Success(state, action) {
      state.isLoad = false;
      state.ismarket_trendsSuccess = action?.payload;
      state.ismarket_trendsError = '';
    },
    market_trends_Failure(state, action) {
      state.isLoad = false;
      state.ismarket_trendsSuccess = '';
      state.ismarket_trendsError = action.payload.data;
    },
    // market trend SeeAll top looser
    market_trends_Loser(state, action) {
      state.isLoadss = true;
      state.ismarket_trendsLoserSuccess = '';
      state.ismarket_trendsLoserError = '';
    },
    market_trends_Loser_Success(state, action) {
      state.isLoadss = false;
      state.ismarket_trendsLoserSuccess = action?.payload;
      state.ismarket_trendsLoserError = '';
    },
    market_trends_Loser_Failure(state, action) {
      state.isLoadss = false;
      state.ismarket_trendsLoserSuccess = '';
      state.ismarket_trendsLoserError = action.payload.data;
    },

    /// advertisement/videos
    advertisement_videos(state, action) {
      state.isVideoLoad = true;
      state.isVideoSuccess = '';
      state.isVideoError = '';
    },
    advertisement_videos_Success(state, action) {
      state.isVideoLoad = false;
      state.isVideoSuccess = action?.payload;
      state.isVideoLength = action?.payload?.response.length;
      state.isVideoError = '';
    },
    advertisement_videos_Failure(state, action) {
      state.isVideoLoad = false;
      state.isVideoSuccess = '';
      state.isVideoError = action.payload.data;
    },
    ///advertisement/banner
    advertisement_Banner(state) {
      state.isadvertisementBannerLoad = true;
      state.isAdvertisementBannerSuccess = '';
      state.isAdvertisementBannerFail = '';
    },
    advertisement_BannerSuccess(state, action) {
      state.isadvertisementBannerLoad = false;
      state.isAdvertisementBannerSuccess = action?.payload;
      state.isAdvertisementBannerFail = '';
    },
    advertisement_BannerFail(state, action) {
      state.isadvertisementBannerLoad = false;
      state.isAdvertisementBannerSuccess = '';
      state.isAdvertisementBannerFail = action.payload.data;
    },
    ///
    OpenTrade(state) {
      state.isLoads = true;
      state.isOpenTradeSuccess = '';
      state.isOpenTradeError = '';
    },
    OpenTradeSuccess(state, action) {
      state.isLoads = false;
      state.isOpenTradeSuccess = action?.payload?.response;
      state.openTradeGreenlength = action?.payload?.response?.[0]?.data.length;
      state.isOpenTradeError = '';
    },
    OpenTradeFailure(state, action) {
      state.isLoads = false;
      state.isOpenTradeSuccess = '';
      state.isOpenTradeError = action.payload.data;
    },
    OpenTradeRedAlert(state) {
      state.isredAlertLoads = true;
      state.isOpenTradeRedAlertSuccess = '';
      state.isOpenTradeRedAlertError = '';
    },
    OpenTradeRedAlertSuccess(state, action) {
      state.isredAlertLoads = false;
      state.isOpenTradeRedAlertSuccess = action?.payload?.response;
      state.openTradelength = action?.payload?.response?.[0]?.data.length;
      state.isOpenTradeRedAlertError = '';
    },
    OpenTradeRedAlertFailure(state, action) {
      state.isredAlertLoads = false;
      state.isOpenTradeRedAlertSuccess = '';
      state.isOpenTradeRedAlertError = action.payload.data;
    },
  },
});

export const {
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
} = HomeScreenSlice.actions;

export default HomeScreenSlice.reducer;
