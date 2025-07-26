import React, { useCallback, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { TrackierSDK, TrackierEvent } from 'react-native-trackier';

import MainContainer from '../../Components/MainContainer';
import { COLORS, HEADER_TITLE } from '../../Constants/enums';
import TitleWithBackBtnHeader from '../../Components/BackButton/TitleWithBackBtnHeader';
import { goBack } from '../../Navigation/NavigationService';
import TradingCallsTabBar from './TradingCallsTabBar';
import styles from './styles';
import OpenTradesCalls from './OpenTradesCalls';
import CloseTradesCalls from './CloseTradesCalls';
import {
  TradingCallsCloseCash,
  TradingCallsCloseFutures,
  TradingCallsOpenCash,
  TradingCallsOpenFutures,
} from '../../apis/Onboarding/AdvisoryTradeApi/AdvisoryTradeSlice';
import { useDispatch, useSelector } from 'react-redux';
import UserGuideModal from '../../Components/Modal/UserGuideModal';
import { getTinymce } from '../../apis/Onboarding/TinymceApi/TinymceSlice';
import AdvertismentComponent from '../HomeScreen/AdvertismentComponent';
import analytics from '../../Services/PushNotification/analytics';
import CustomToast, { toast } from '../../utils/toast';

const TradingCallsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const TinymceData = useSelector((state: any) => state.TinymceSlice);
  const { isTinymceSuccess } = TinymceData;
  const [activeTab, setActiveTab] = React.useState('OPEN_TRADE');
  const [activeCash, setActiveCash] = React.useState('CASH');
  const [userGuideModaVisible, setUserGuideModalVisible] = React.useState(false);
  const [tinymcePopUpdata, setTinymcePopUpData] = React.useState([]);
  const [isclick, setIsClick] = React.useState(true);
  const HomeScreeneData = useSelector((state: any) => state.HomeScreenSlice);
  const { isAdvertisementBannerSuccess } = HomeScreeneData;
  const paymentData = useSelector((state: any) => state.CreateSubscSlice);
  const { isPremiumUser } = paymentData;
  const [topBannerUrl, setTopBannerUrl] = React.useState(null);
  const BannerScreenName = 'tradecalls';
  const toastRef = useRef<CustomToast | null>(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const onPressBack = () => {
    goBack();
  };
  const message = (textMessage: string, status: 'success' | 'fail') => {
    let color =
      status === 'success' ? toast.color.GREEN :
        status === 'fail' ? toast.color.RED :
          toast.color.BLUE;

    toast.bottom(toastRef, textMessage, 3000, color);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(TradingCallsOpenCash());
    dispatch(TradingCallsOpenFutures());
    dispatch(TradingCallsCloseCash());
    dispatch(TradingCallsCloseFutures());
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Simulating a 1-second delay for demonstration purposes
  }, []);

  useEffect(() => {
    dispatch(TradingCallsOpenCash());
    dispatch(TradingCallsOpenFutures());
    dispatch(TradingCallsCloseCash());
    dispatch(TradingCallsCloseFutures());
  }, []);
  const getTinymceData = async () => {
    await analytics.logEvent('Trade_Calls_Screen')
    var trackierEvent = new TrackierEvent("ajP0w5HQUw");
    trackierEvent.param1 = isPremiumUser === true ? 'paid_user' : 'trial_user';
    TrackierSDK.trackEvent(trackierEvent);
    dispatch(getTinymce({ screen_name: 'tradecalls' }));
  };
  useEffect(() => {
    getTinymceData(); //Pop up message in modal
  }, []);
  useEffect(() => {
    if (isTinymceSuccess) {
      setTinymcePopUpData(isTinymceSuccess?.response);
    }
  }, [isTinymceSuccess]);
  useEffect(() => {
    if (isTinymceSuccess && isclick) {
      const timer = setTimeout(() => {
        setUserGuideModalVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTinymceSuccess]);

  const userGuidCloseModal = () => {
    setUserGuideModalVisible(false);
    setIsClick(false);
  };
  React.useEffect(() => {
    // Filter the banner based on the current screen name
    const banner = isAdvertisementBannerSuccess?.response?.data.find(
      b => b.screen_name === BannerScreenName,
    );
    if (banner) {
      setTopBannerUrl(banner);
    }
  }, [isAdvertisementBannerSuccess]);
  return (
    <MainContainer bgColor={COLORS.PrimaryBackGround}>
      <CustomToast ref={toastRef} position="bottom" />
      <TitleWithBackBtnHeader
        centerTitle={HEADER_TITLE.TRADING_CALLS}
        onPressBackArrow={onPressBack}
      />
      <TradingCallsTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      {topBannerUrl && <AdvertismentComponent bannerUrl={topBannerUrl} />}

      <View style={styles.content}>
        <View style={styles.container}>
          <TouchableOpacity
            style={[
              styles.innerContainer,
              activeCash === 'CASH' ? styles.activeBackground : styles.inActiveBackground,
            ]}
            onPress={() => setActiveCash('CASH')}>
            <Text
              style={[
                styles.txtTitle,
                activeCash === 'CASH' ? styles.activeTxt : styles.inactiveTxt,
              ]}
              allowFontScaling={false}>
              Cash
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.innerContainer,
              activeCash === 'FUTURES' ? styles.activeBackground : styles.inActiveBackground,
            ]}
            onPress={() => setActiveCash('FUTURES')}>
            <Text
              style={[
                styles.txtTitle,
                activeCash === 'FUTURES' ? styles.activeTxt : styles.inactiveTxt,
              ]}
              allowFontScaling={false}>
              Futures
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#000"
            colors={['#000']}
          />
        }>
          {activeTab === 'OPEN_TRADE' ? (
            <OpenTradesCalls activeOption={activeCash} message={message} activeTab={activeTab} />
          ) : (
            <CloseTradesCalls activeOption={activeCash} message={message} />
          )}
        </ScrollView>

      </View>
      {tinymcePopUpdata && tinymcePopUpdata[0]?.screen_content && <UserGuideModal
        visible={userGuideModaVisible}
        onClose={userGuidCloseModal}
        text_content={tinymcePopUpdata && tinymcePopUpdata[0]?.screen_content}
      />}
    </MainContainer>
  );
};

export default TradingCallsScreen;
