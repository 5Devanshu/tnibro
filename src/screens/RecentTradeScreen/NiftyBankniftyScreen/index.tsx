import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { getIndicesTrade } from '../../../apis/Onboarding/TradeApi/TradeSlice';
import { getTinymce } from '../../../apis/Onboarding/TinymceApi/TinymceSlice';
import { goBack, navigation } from '../../../Navigation/NavigationService';

import MainContainer from '../../../Components/MainContainer';
import TitleWithBackBtnHeader from '../../../Components/BackButton/TitleWithBackBtnHeader';
import AdvertismentComponent from '../../../screens/HomeScreen/AdvertismentComponent';
import AnnouncementBanner from '../../../screens/Dashboard/AnnouncementBanner';
import UserGuideModal from '../../../Components/Modal/UserGuideModal';
import { Loader } from '../../../Components/Loader';

import { COLORS, ROUTE_NAME } from '../../../Constants/enums';
import analytics from '../../../Services/PushNotification/analytics';
import { TrackierSDK, TrackierEvent } from 'react-native-trackier';

import styles from './styles';

interface DataItem {
  symbol: string;
  CMP: number;
  is_intraday?: boolean;
  is_swing?: boolean;
}

const NiftyBankniftyScreen: React.FC = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { isloading, isindicesTradeSuccess } = useSelector((state: any) => state.TradeSlice);
  const { isPremiumUser } = useSelector((state: any) => state.CreateSubscSlice);
  const { istickerSuccess } = useSelector((state: any) => state.tickerSlice);
  const { isTinymceSuccess } = useSelector((state: any) => state.TinymceSlice);
  const { isAdvertisementBannerSuccess } = useSelector((state: any) => state.HomeScreenSlice);

  const [indicesTradeData, setIndicesTradeData] = useState<DataItem[]>([]);
  const [tinymceData, setTinymceData] = useState([]);
  const [userGuideModalVisible, setUserGuideModalVisible] = useState(false);
  const [isClick, setIsClick] = useState(true);
  const [topBannerUrl, setTopBannerUrl] = useState<any>(null);

  const BannerScreenName = 'niftyfiftyscreen';

  // Fetch data when screen is focused
  useEffect(() => {
    if (isFocused) {
      dispatch(getIndicesTrade());
      fetchTinymceData();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isindicesTradeSuccess) {
      setIndicesTradeData(isindicesTradeSuccess);
    }
  }, [isindicesTradeSuccess]);

  useEffect(() => {
    if (isTinymceSuccess) {
      setTinymceData(isTinymceSuccess?.response || []);
    }
  }, [isTinymceSuccess]);

  useEffect(() => {
    if (isTinymceSuccess && isClick) {
      const timer = setTimeout(() => {
        setUserGuideModalVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTinymceSuccess, isClick]);

  useEffect(() => {
    const banner = isAdvertisementBannerSuccess?.response?.data?.find(
      (b: any) => b.screen_name === BannerScreenName
    );
    if (banner) setTopBannerUrl(banner);
  }, [isAdvertisementBannerSuccess]);

  const fetchTinymceData = async () => {
    await analytics.logEvent('Niftyfifty_Screen');
    const trackierEvent = new TrackierEvent('388Dl6vUWa');
    trackierEvent.param1 = isPremiumUser ? 'paid_user' : 'trial_user';
    TrackierSDK.trackEvent(trackierEvent);
    dispatch(getTinymce({ screen_name: BannerScreenName }));
  };

  const handleTradeNavigation = useCallback(
    (symbol: string | number, timeframe: 'swing' | 'intraday') => {
      navigation(ROUTE_NAME.RECENT_TRADE, { symbol, trade_timeframe: timeframe });
    },
    []
  );

  const renderHeader = useMemo(() => {
    return topBannerUrl ? <AdvertismentComponent bannerUrl={topBannerUrl} /> : null;
  }, [topBannerUrl]);

  const renderItem = useCallback(({ item }: { item: DataItem }) => (
    <View style={styles.shadowContainer}>
      <View style={styles.mainContainer}>
        <Text style={styles.SymbolName} allowFontScaling={false}>
          {item.symbol}
        </Text>
      </View>
      <View style={styles.intraView}>
        {item.is_intraday && (
          <TouchableOpacity
            style={styles.Intradaycontainer}
            onPress={() => handleTradeNavigation(item, 'intraday')}>
            <Text style={styles.TextIntraday} allowFontScaling={false}>15 Mins Candle Carry Forward</Text>
            <Text style={styles.timeframeText} allowFontScaling={false}>15-min</Text>
          </TouchableOpacity>
        )}
        {item.is_swing && (
          <TouchableOpacity
            style={styles.swingContainer}
            onPress={() => handleTradeNavigation(item, 'swing')}>
            <Text style={styles.TextIntraday} allowFontScaling={false}>Day Candle Carry Forward</Text>
            <Text style={styles.timeframeText} allowFontScaling={false}>Daily</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  ), []);

  const userGuidCloseModal = () => {
    setUserGuideModalVisible(false);
    setIsClick(false);
  };

  const shouldShowNote =
    indicesTradeData.length > 0 && !indicesTradeData.some(item => item.is_intraday);

  return (
    <MainContainer bgColor={COLORS.PrimaryBackGround}>
      <TitleWithBackBtnHeader
        centerTitle="Nifty/BankNifty/FinNifty"
        onPressBackArrow={goBack}
      />

      {isloading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          {istickerSuccess?.[0] && (
            <AnnouncementBanner istickerSuccess={istickerSuccess} />
          )}
          {shouldShowNote && (
            <View style={styles.noteContainer}>
              {/* <Text style={styles.noteTitle}>Note:</Text> */}
              <Text style={styles.noteText}>
                Due to a technical issue, the <Text style={styles.bold}>15-minute</Text> candle signals for{' '}
                <Text style={styles.bold}>Nifty</Text>, <Text style={styles.bold}>Bank Nifty</Text>, and{' '}
                <Text style={styles.bold}>Fin Nifty</Text> may not be accurate. We recommend avoiding these signals
                until further notice. The <Text style={styles.bold}>15-minute candle</Text> option has been temporarily
                removed until the issue is resolved. Thank you for your patience.
              </Text>
            </View>
          )}
          <FlatList
            ListHeaderComponent={renderHeader}
            data={indicesTradeData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      {tinymceData?.[0]?.screen_content && (
        <UserGuideModal
          visible={userGuideModalVisible}
          onClose={userGuidCloseModal}
          text_content={tinymceData[0].screen_content}
        />
      )}
    </MainContainer>
  );
};

export default React.memo(NiftyBankniftyScreen);
