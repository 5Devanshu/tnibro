import React, { useCallback, useRef, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { TrackierSDK, TrackierEvent } from 'react-native-trackier';

import MainContainer from '../../Components/MainContainer';
import TitleWithBackBtnHeader from '../../Components/BackButton/TitleWithBackBtnHeader';
import { goBack } from '../../Navigation/NavigationService';
import TabBarCompo from './TabBarCompo';
import OpenTradeAdvisory from './OpenTradeAdvisory';
import {
  AdvisoryCloseTrade,
  AdvisoryOpenTrade,
} from '../../apis/Onboarding/AdvisoryTradeApi/AdvisoryTradeSlice';
import CloseTradesAdvisory from './CloseTradesAdvisory';
import { COLORS, scaleHeight, scaleWidth } from '../../Constants/enums';
import UserGuideModal from '../../Components/Modal/UserGuideModal';
import { getTinymce } from '../../apis/Onboarding/TinymceApi/TinymceSlice';
import AdvertismentComponent from '../HomeScreen/AdvertismentComponent';
import analytics from '../../Services/PushNotification/analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomToast, { toast } from '../../utils/toast';

const AdvisoryScreen: React.FC = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const toastRef = useRef<CustomToast | null>(null);
  const [activeTab, setActiveTab] = React.useState('OPEN_TRADE');
  const [refreshing, setRefreshing] = React.useState(false);
  const TinymceData = useSelector((state: any) => state.TinymceSlice);
  const { isTinymceSuccess } = TinymceData;
  const paymentData = useSelector((state: any) => state.CreateSubscSlice);
  const { isPremiumUser } = paymentData;
  const [active_PlanCode, setActive_PlanCode] = useState('');
  AsyncStorage.getItem('active_PlanCode').then(value => {
    setActive_PlanCode(value)
  });
  const [userGuideModaVisible, setUserGuideModalVisible] = React.useState(false);
  const [tinymcePopUpdata, setTinymcePopUpData] = React.useState([]);
  const [isclick, setIsClick] = React.useState(true);
  const HomeScreeneData = useSelector((state: any) => state.HomeScreenSlice);
  const { isAdvertisementBannerSuccess } = HomeScreeneData;
  const [topBannerUrl, setTopBannerUrl] = React.useState(null);
  const BannerScreenName = 'tradeadvisory';

  const getOpenTradeLData = () => {
    dispatch(AdvisoryOpenTrade({ status: 'm' }));
    dispatch(AdvisoryCloseTrade({ status: 'm' }));
  };

  React.useEffect(() => {
    if (isFocused) {
      getOpenTradeLData();
    }
  }, [isFocused]);

  const getTinymceData = async () => {
    await analytics.logEvent('Trade_Advisory_Screen');
    var trackierEvent = new TrackierEvent("fXfqsCNbP9");
    trackierEvent.param1 = isPremiumUser === true ? 'paid_user' : 'trial_user';
    TrackierSDK.trackEvent(trackierEvent);
    dispatch(getTinymce({ screen_name: 'tradeadvisory' }));
  };
  React.useEffect(() => {
    getTinymceData(); //Pop up message in modal
  }, []);
  React.useEffect(() => {
    if (isTinymceSuccess) {
      setTinymcePopUpData(isTinymceSuccess?.response);
    }
  }, [isTinymceSuccess]);
  React.useEffect(() => {
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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(AdvisoryOpenTrade({ status: 'm' }));
    dispatch(AdvisoryCloseTrade({ status: 'm' }));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Simulating a 1-second delay for demonstration purposes
  }, []);

  const message = (textMessage: string, status: 'success' | 'fail') => {
    let color =
      status === 'success' ? toast.color.GREEN :
        status === 'fail' ? toast.color.RED :
          toast.color.BLUE;

    toast.bottom(toastRef, textMessage, 3000, color);
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
      <TitleWithBackBtnHeader centerTitle="Trades/Investment" onPressBackArrow={() => goBack()} />
      {topBannerUrl && <AdvertismentComponent bannerUrl={topBannerUrl} />}
      <View style={styles.container}>
        <TabBarCompo activeTab={activeTab} setActiveTab={setActiveTab} />

        <View style={styles.content}>
          <ScrollView refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#000"
              colors={['#000']}
            />
          }>
            {activeTab === 'OPEN_TRADE' ? <OpenTradeAdvisory activeTab={activeTab} active_PlanCode={active_PlanCode} message={message} /> : <CloseTradesAdvisory message={message} />}
          </ScrollView>

        </View>
        {tinymcePopUpdata && tinymcePopUpdata[0]?.screen_content && <UserGuideModal
          visible={userGuideModaVisible}
          onClose={userGuidCloseModal}
          text_content={tinymcePopUpdata && tinymcePopUpdata[0]?.screen_content}
        />}
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.PrimaryWhite,
    flex: 1,
    paddingTop: scaleHeight(14),
    borderTopLeftRadius: scaleWidth(30),
    borderTopRightRadius: scaleWidth(30),
  },
});

export default AdvisoryScreen;
