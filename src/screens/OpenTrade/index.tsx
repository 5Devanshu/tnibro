import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import { TrackierSDK, TrackierEvent } from 'react-native-trackier';

import MainContainer from '../../Components/MainContainer';
import {OpenTrade, OpenTradeRedAlert} from '../../apis/Onboarding/HomeScreenApi/HomeScreenSlice';
import TitleWithBackBtnHeader from '../../Components/BackButton/TitleWithBackBtnHeader';
import {goBack} from '../../Navigation/NavigationService';
import TabBarComponent from './TabBarComponent';
import GreenSignalTrade from './GreenSignalTrade';
import RedAlertTrade from './RedAlertTrade';
import {COLORS} from '../../Constants/enums';
import UserGuideModal from '../../Components/Modal/UserGuideModal';
import {getTinymce} from '../../apis/Onboarding/TinymceApi/TinymceSlice';
import AdvertismentComponent from '../HomeScreen/AdvertismentComponent';
import analytics from '../../Services/PushNotification/analytics';

const OpenTradeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const TinymceData = useSelector((state: any) => state.TinymceSlice);
  const {isTinymceSuccess} = TinymceData;
  const [activeTab, setActiveTab] = React.useState('GREEN_SIGNAL');
  const [userGuideModaVisible, setUserGuideModalVisible] = React.useState(false);
  const [tinymcePopUpdata, setTinymcePopUpData] = React.useState([]);
  const [isclick, setIsClick] = React.useState(true);
  const HomeScreeneData = useSelector((state: any) => state.HomeScreenSlice);
  const paymentData = useSelector((state: any) => state.CreateSubscSlice);
  const { isPremiumUser } = paymentData;
  const {isAdvertisementBannerSuccess} = HomeScreeneData;
  const [topBannerUrl, setTopBannerUrl] = React.useState(null);
  const BannerScreenName = 'tradeperformancescreen';

  const getOpenTradeLData = async () => {
    await dispatch(OpenTrade());
    await dispatch(OpenTradeRedAlert());
  };
  React.useEffect(() => {
    if (isFocused) {
      getOpenTradeLData();
    }
  }, [isFocused]);
  const getTinymceData = async () => {
    await analytics.logEvent('Trade_Performance_Screen')
     var trackierEvent = new TrackierEvent("dPGM6bQchj");
     trackierEvent.param1 = isPremiumUser === true ? 'paid_user' : 'trial_user';
     TrackierSDK.trackEvent(trackierEvent);
    dispatch(getTinymce({screen_name: 'tradeperformancescreen'}));
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
      <TitleWithBackBtnHeader
        centerTitle="Trades Till Yesterday"
        onPressBackArrow={() => goBack()}
      />
      {topBannerUrl && <AdvertismentComponent bannerUrl={topBannerUrl} />}
      <TabBarComponent activeTab={activeTab} setActiveTab={setActiveTab} />
      <View style={styles.content}>
        {activeTab === 'GREEN_SIGNAL' ? <GreenSignalTrade /> : <RedAlertTrade />}
      </View>
      {tinymcePopUpdata && tinymcePopUpdata[0]?.screen_content&&<UserGuideModal
        visible={userGuideModaVisible}
        onClose={userGuidCloseModal}
        text_content={tinymcePopUpdata && tinymcePopUpdata[0]?.screen_content}
      />}
    </MainContainer>
  );
};
const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
export default OpenTradeScreen;
