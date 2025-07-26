import {all} from 'redux-saga/effects';
import AuthenticationSaga from '../apis/Onboarding/authenticationApi';
import sectorStockSaga from '../apis/Onboarding/SectorStock/SectorStockSaga';
import newListingSaga from '../apis/Onboarding/NewListingApi/NewListingSaga';
import TokenVerifySaga from '../apis/Onboarding/TokenVerifyApi/TokenVerifySaga';
import TinymceSaga from '../apis/Onboarding/TinymceApi/TinymceSaga';
import PriceActionSaga from '../apis/Onboarding/PriceActionApi/PriceActionSaga';
import CreateSubscriptionSaga from '../apis/Onboarding/PaymentApi/CreateSubscSaga';
import TradeSaga from '../apis/Onboarding/TradeApi/TradeSaga';
import News_ipoSaga from '../apis/Onboarding/News_ipo/News_ipoSaga';
import HomeScreenSaga from '../apis/Onboarding/HomeScreenApi/HomeScreenSaga';
import AdvisoryTradeSaga from '../apis/Onboarding/AdvisoryTradeApi/AdvisoryTradeSaga';

export default function* rootSaga() {
  yield all([
    AuthenticationSaga(),
    sectorStockSaga(),
    newListingSaga(),
    TokenVerifySaga(),
    TinymceSaga(),
    PriceActionSaga(),
    CreateSubscriptionSaga(),
    TradeSaga(),
    News_ipoSaga(),
    HomeScreenSaga(),
    AdvisoryTradeSaga(),
  ]);
}
