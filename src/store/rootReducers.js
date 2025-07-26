import {combineReducers} from '@reduxjs/toolkit';
import authentication from '../apis/Onboarding/authenticationSlice';
import verifyemailOtp from '../apis/Onboarding/verifyEmailOtpSlice';
import resendEmail from '../apis/Onboarding/resendEmailSlice';
import dashboardTabData from '../apis/Onboarding/dashboardTabDataSlice';
import dashboardscreener from '../apis/Onboarding/dashboardScreenerSlice';
import selectedFilters from '../apis/Onboarding/selectedFiltersSlice';
import forgotPassword from '../apis/Onboarding/forgotPasswordSlice';
import searchfield from '../apis/Onboarding/SearchSlice';
import totalWatchlist from '../apis/Onboarding/watchlistSlice';
import gainerdata from '../apis/Onboarding/gainerSlice';
import totalalert from '../apis/Onboarding/totalAlertSlice';
import options from '../apis/Onboarding/OptionsSlice';
import deactivateId from '../apis/Onboarding/DeactivateSlice';
import tickerSlice from '../apis/Onboarding/TickerSlice';
import SectorStockSlice from '../apis/Onboarding/SectorStock/SectorStockSlice';
import NewListingSlice from '../apis/Onboarding/NewListingApi/NewListingSlice';
import TokenVerifySlice from '../apis/Onboarding/TokenVerifyApi/TokenVerifySlice';
import TinymceSlice from '../apis/Onboarding/TinymceApi/TinymceSlice';
import PriceActionSlice from '../apis/Onboarding/PriceActionApi/PriceActionSlice';
import CreateSubscSlice from '../apis/Onboarding/PaymentApi/CreateSubscSlice';
import TradeSlice from '../apis/Onboarding/TradeApi/TradeSlice';
import news_ipoSlice from '../apis/Onboarding/News_ipo/News_ipoSlice';
import HomeScreenSlice from '../apis/Onboarding/HomeScreenApi/HomeScreenSlice';
import AdvisoryTradeSlice from '../apis/Onboarding/AdvisoryTradeApi/AdvisoryTradeSlice';

///Slice
export const rootReducer = combineReducers({
  authentication,
  verifyemailOtp,
  resendEmail,
  dashboardTabData,
  dashboardscreener,
  selectedFilters, //use for clear the filter
  forgotPassword,
  searchfield,
  totalWatchlist,
  gainerdata,
  totalalert,
  options,
  deactivateId,
  tickerSlice,
  SectorStockSlice,
  NewListingSlice,
  TokenVerifySlice,
  TinymceSlice,
  PriceActionSlice,
  CreateSubscSlice,
  TradeSlice,
  news_ipoSlice,
  HomeScreenSlice,
  AdvisoryTradeSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
