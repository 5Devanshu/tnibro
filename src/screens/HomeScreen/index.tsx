import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, BackHandler, Alert, Linking, Platform, SafeAreaView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import Rate, { AndroidMarket } from 'react-native-rate'
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import DeviceInfo from 'react-native-device-info';
import { TrackierSDK, TrackierEvent } from 'react-native-trackier';
import * as queryString from 'query-string';
import OneSignal from 'react-native-onesignal';

import LocationBar from '../../Components/BackButton/LocationBar';
import VideoPlayerHomeCpmp from './VideoPlayerScreen/VideoPlayerHomeCpmp';
import { CONSTANT_TEXT, ROUTE_NAME, styleBase, TAB_BAR_NAME } from '../../Constants/enums';
import styles from './styles';
import CategoryList from './Categories';
import BannerCarousel from './Banner';
import AdsContainer from './AdsContainer';
import GainerListCard from './GainerListCard';
import NewsListCard from './NewsListCard';
import TrendingStock from './TrendingStock';
import TinymceDataComp from './TinymceDataComp';
import VersionCheck from 'react-native-version-check';
import VideoModal from '../../Components/VideoModal';
import IMAGES from '../../Constants/enums/ImagesEnum';
import AdvertismentComponent from './AdvertismentComponent/index';
import UserGuideModal from '../../Components/Modal/UserGuideModal';
import { getTinymce } from '../../apis/Onboarding/TinymceApi/TinymceSlice';
import { deepLinkPayment, uploadFcmToken } from '../../apis/Onboarding/authenticationSlice';
import analytics from '../../Services/PushNotification/analytics';
import { advertisement_Banner, getHomeScreen, home_stock_screen, } from '../../apis/Onboarding/HomeScreenApi/HomeScreenSlice';
import UserRatingModal from './userRating';
import AnnouncementBanner from '../Dashboard/AnnouncementBanner';
import { getTicker } from '../../apis/Onboarding/TickerSlice';
import { extractAlertDetails } from '../../utils/symbolfinder';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const HomeScreeneData = useSelector((state: any) => state.HomeScreenSlice);
  const paymentData = useSelector((state: any) => state.CreateSubscSlice);
  const { isPremiumUser } = paymentData;
  const authenticationData = useSelector((state: any) => state.authentication);
  const response = authenticationData?.getProfileSuccess ?? {};
  const username = response.username ?? '';
  const email = response.email ?? '';
  const phoneno = response.phoneno ?? '';
  const TinymceData = useSelector((state: any) => state.TinymceSlice);
  const { isTinymceSuccess } = TinymceData;
  const tickData = useSelector((state: any) => state.tickerSlice);
  const { istickerSuccess } = tickData;
  const {
    isLoading,
    rating_sent,
    ishomeScreemSuccess,
    ishome_stockSuccess,
    isAdvertisementBannerSuccess,
  } = HomeScreeneData;
  const [newsData, setNewsData] = useState([]);
  const [topGainers, setTopGainers] = useState([]);
  const [topLooser, setTopLooser] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [bannerData, setBannerData] = useState([]);
  const [tinymcedata, setTinymceData] = React.useState([]);
  const [topTrending, setTopTrending] = React.useState([]);
  const [videoData, setVideoData] = React.useState([]);
  const [showVideomodal, setShowVideoModal] = React.useState(false);
  const [VideoLink, setVideoLink] = React.useState();
  const [bannerUrl, setBannerUrl] = useState(null);
  const [tableUrl, setTableUrl] = useState(null);
  const [userGuideModaVisible, setUserGuideModalVisible] = React.useState(false);
  const [userRatingModal, setUserRatingModal] = React.useState(false);
  const [tinymcePopUpdata, setTinymcePopUpData] = React.useState([]);
  const [isclick, setIsClick] = React.useState(true);
  const currentScreen = 'home_advertisment';
  const HomeScreenBanner = 'homescreen';

  const [deviceDetail, setDeviceDetail] = useState({
    getUniqueId: '',
    getDeviceName: '',
    getDeviceType: '',
  });

  const getHomeScreenData = async () => {
    await analytics.logEvent('Home_Screen')
    try {
      const userid = await AsyncStorage.getItem('userId');
      const oneSignal_userId = await AsyncStorage.getItem('oneSignal_userId');

      if (!userid) return; // Exit early if no userid

      dispatch(getHomeScreen({ userid }));
      dispatch(home_stock_screen({ userid }));
      dispatch(advertisement_Banner());
      dispatch(getTicker({ userid }));
      var trackierEvent = new TrackierEvent("9EG3qxlz9O");
      trackierEvent.param1 = isPremiumUser === true ? 'paid_user' : 'trial_user';
      if (userid) {
        TrackierSDK.setUserId(userid);
      }
      TrackierSDK.setUserEmail(email);
      TrackierSDK.setUserName(username);
      TrackierSDK.setUserPhone(phoneno);
      TrackierSDK.trackEvent(trackierEvent);

      if (oneSignal_userId) {
        dispatch(
          uploadFcmToken({
            userid,
            notify_token: oneSignal_userId,
            device_name: deviceDetail.getDeviceName,
            device_type: deviceDetail.getDeviceType,
            device_id: deviceDetail.getUniqueId,
          })
        );
      }
    } catch (error) {
      console.error('Error fetching home screen data:', error);
    }
  };
  ``

  useEffect(() => {
    if (isFocused) {
      getHomeScreenData();
    }
  }, [isFocused]);

  const getDeviceInfo = async () => {
    const UniqueId = await DeviceInfo.getUniqueId();
    const deviceName = await DeviceInfo.getDeviceName();
    const DeviceType = await DeviceInfo.getDeviceType();
    setDeviceDetail({
      getUniqueId: UniqueId,
      getDeviceName: deviceName,
      getDeviceType: DeviceType,
    });
  };
  useEffect(() => {
    getDeviceInfo();
  }, []);

  useEffect(() => {
    if (ishomeScreemSuccess?.response) {
      setNewsData(ishomeScreemSuccess?.response?.[0]?.news);
      setBannerData(ishomeScreemSuccess?.response?.[0]?.banner_data);
      setTinymceData(ishomeScreemSuccess?.response?.[0]?.tinymce_stocks);
      setVideoData(ishomeScreemSuccess?.response?.[0]?.youtube_videos);
      setShowVideoModal(ishomeScreemSuccess?.response?.[0]?.lock_data);
      setVideoLink(ishomeScreemSuccess?.response?.[0]?.video_link?.[0]);
    }
  }, [ishomeScreemSuccess?.response]);

  useEffect(() => {
    OneSignal.setNotificationOpenedHandler(notification => {
      const { symbol, type } = extractAlertDetails(notification.notification.body);

      if (type && symbol) {
        setTimeout(() => {
          navigation.navigate(ROUTE_NAME.RECENT_TRADE, {
            symbol: symbol,
            trade_timeframe: type.toLowerCase(),
          });
        }, 2000);
      } else if (symbol) {
        setTimeout(() => {
          navigation.navigate('SearchDetailScreen', {
            symbol: symbol,
            segment: 'cash',
          });
        }, 2000);
      }
    });
  }, []);

  useEffect(() => {
    if (ishome_stockSuccess?.response) {
      setTopGainers(ishome_stockSuccess?.response?.[0]?.gainers);
      setTopLooser(ishome_stockSuccess?.response?.[0]?.lossers);
      setTopTrending(ishome_stockSuccess?.response?.[0]?.top_trending);
    }
  }, [ishome_stockSuccess?.response]);

  useEffect(() => {
    const handleUrl = (url) => {
      if (!url) return;
      const DEEP_LINK_TIMEOUT = 500;
      const { query } = queryString.parseUrl(url);
      const { p1, stockname } = query || {};
      const symbolDetails = getSymbolDetails(stockname);
      const symbol = stockname?.split('|')[1];

      switch (p1) {
        case 'detailStockPage':
          return setTimeout(() => {
            navigation.navigate('SearchDetailScreen', {
              symbol,
              segment: 'cash',
            });
          }, DEEP_LINK_TIMEOUT);

        case 'nifty':
          return setTimeout(() => {
            navigation.navigate(ROUTE_NAME.RECENT_TRADE, {
              symbol: symbolDetails,
              trade_timeframe: 'swing',
            });
          }, DEEP_LINK_TIMEOUT);

        case 'SubscriptionScreen':
          return setTimeout(() => {
            navigation.navigate('SubscriptionScreen');
          }, DEEP_LINK_TIMEOUT);

        case 'TopupPage':
          return navigation.navigate(ROUTE_NAME.UPGRADE_PLAN_SCREEN);

        case 'TradingCalls':
          return navigation.navigate(ROUTE_NAME.TRADING_CALLS);

        case 'AdvisoryCalls':
          return navigation.navigate(ROUTE_NAME.ADVISORY_SCREEN);

        default:
          if (url.includes('?Basic179')) {
            dispatch(deepLinkPayment("BASIC179"));
            return setTimeout(() => {
              navigation.navigate('SubscriptionScreen');
            }, DEEP_LINK_TIMEOUT);
          }
          else if (url.includes('?ADV4499')) {
            dispatch(deepLinkPayment("ADV4499"));
            return setTimeout(() => {
              navigation.navigate('SubscriptionScreen');
            }, DEEP_LINK_TIMEOUT);
          }
          else if (url.includes('?ANNUAL_UPGRADE')) {
            dispatch(deepLinkPayment("ANNUAL_UPGRADE"));
            return setTimeout(() => {
              navigation.navigate('SubscriptionScreen');
            }, DEEP_LINK_TIMEOUT);
          }
          else if (url.includes('?GOLD849')) {
            dispatch(deepLinkPayment("GOLD849"));
            return setTimeout(() => {
              navigation.navigate('SubscriptionScreen');
            }, DEEP_LINK_TIMEOUT);
          }
          else if (url.includes('?NEW349')) {
            dispatch(deepLinkPayment("NEW349"));
            return setTimeout(() => {
              navigation.navigate('SubscriptionScreen');
            }, DEEP_LINK_TIMEOUT);
          }
      }
    };

    // Handle initial and future deep links
    Linking.getInitialURL().then(handleUrl);
    const linkingListener = Linking.addEventListener('url', ({ url }) => handleUrl(url));

    return () => {
      linkingListener.remove();
    };
  }, []);

  const getSymbolDetails = (stockname) => {
    const raw = stockname?.split('|')[1]; // Extract the part after 'value|'

    switch (raw) {
      case 'FINNIFTY':
        return { CMP: "", symbol: "FINNIFTY", value: "FINNIFTY-I" };
      case 'NIFTY':
        return { CMP: "", symbol: "NIFTY 50", value: "NIFTY-I" };
      case 'BANKNIFTY':
        return { CMP: "", symbol: "NIFTY BANK", value: "BANKNIFTY-I" };
      default:
        return { CMP: "", symbol: raw, value: `${raw}-I` }; // Fallback
    }
  };

  useEffect(() => {
    const banner = isAdvertisementBannerSuccess?.response?.data.find(
      b => b.screen_name === currentScreen,
    );
    const banner2 = isAdvertisementBannerSuccess?.response?.data.find(
      b => b.screen_name === HomeScreenBanner,
    );
    if (banner) {
      setBannerUrl(banner);
    }
    if (banner2) {
      setTableUrl(banner2);
    }
  }, [isAdvertisementBannerSuccess]);

  useEffect(() => {
    const checkAppVersion = async () => {
      try {
        let versionConfig = {};
        const currentVersion = VersionCheck.getCurrentVersion();
        const bundleId = 'org.reactjs.native.example.tnibro';
        if (Platform.OS === 'ios') {
          const packageName = await VersionCheck.getPackageName();
          const countryName = await VersionCheck.getCountry();
          versionConfig['provider'] = () =>
            fetch(
              `https://itunes.apple.com/${countryName.toLowerCase()}/lookup?bundleId=${packageName}`,
            )
              .then(r => r.json())
              .then(res => res?.results[0]?.version || currentVersion);
        }

        const latestVersion =
          Platform.OS === 'ios'
            ? await VersionCheck.getLatestVersion(versionConfig)
            : await VersionCheck.getLatestVersion({
              provider: 'playStore',
              packageName: 'com.tnibro',
              ignoreErrors: true,
            });

        if (latestVersion > currentVersion) {
          Alert.alert(
            'Update Required',
            'A new version of the app is available. Please update to continue using the app.',
            [
              {
                text: 'Update now',
                style: 'default',
                onPress: () => {
                  var trackierEvent = new TrackierEvent("sEQWVHGThl");
                  trackierEvent.param1 = isPremiumUser === true ? 'paid_user' : 'trial_user';
                  TrackierSDK.trackEvent(trackierEvent);
                  Linking.openURL(
                    Platform.OS === 'ios'
                      ? 'https://apps.apple.com/in/app/stockyaari/id1664406057'
                      : VersionCheck.getPlayStoreUrl({ packageName: 'com.tnibro' })['_j'],
                  );
                },
              },
            ],
            { cancelable: false, onDismiss: () => { } },
          );
        } else {
          // App is up-to-date; proceed with the app
        }
      } catch (error) {
        // Handle error while checking app version
        console.error('Error checking app version:', error);
      }
    };
    checkAppVersion();
  }, []);
  useEffect(() => {
    if (isPremiumUser) {
      const timer = setTimeout(() => {
        setUserRatingModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPremiumUser]);

  const AppRating = () => {
    const options = {
      AppleAppID: "1664406057",
      GooglePackageName: "com.tnibro",
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: false,
      openAppStoreIfInAppFails: true,
      fallbackPlatformURL: "https://www.stockyaari.com",
      AmazonPackageName: "com.tnibro",
      OtherAndroidURL: "https://play.google.com/store/apps/details?id=com.tnibro",
    }
    Rate.rate(options, (success, errorMessage) => {
      if (success) {
        // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
        console.log("share success")
      }
      if (errorMessage) {
        // errorMessage comes from the native code. Useful for debugging, but probably not for users to view
        console.error(`Example page Rate.rate() error: ${errorMessage}`)
      }
    })
  }

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        Alert.alert('', CONSTANT_TEXT.ARE_YOUSURE_GO_BACK, [
          {
            text: CONSTANT_TEXT.CANCEL,
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () => BackHandler.exitApp(),
          },
        ]);
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigation]);
  /// user guide popup
  const getTinymceData = async () => {
    dispatch(getTinymce({ screen_name: 'homescreen' }));
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

  const onPressPayment = () => {
    setShowVideoModal(false);
    navigation.navigate(TAB_BAR_NAME.SUBSCRIPTION);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getTinymceData();
    getHomeScreenData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Simulating a 1-second delay for demonstration purposes
  }, []);

  const handlePress = () => {
    const regNumber = 'INH000018188';
    const url = 'https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=14';

    Clipboard.setString(regNumber); // copy to clipboard
    Alert.alert(
      'Copied',
      `${regNumber} copied to clipboard`,
      [
        { text: 'No', style: 'cancel' }, // dismiss button
        { text: 'Go to Verify', onPress: () => Linking.openURL(url) }, // open SEBI link
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styleBase.mainview}>
      <View style={styles.Container}>
        <LocationBar showDrawer showVideo showAudio
          audioUrl={'https://stock-help.s3.ap-south-1.amazonaws.com/home-screen.mp3'}
        />
      </View>
      <View style={styleBase.flex1}>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#000"
            colors={['#000']}
          />
        } showsVerticalScrollIndicator={false}>
          {/* ----------  banner upload // home_advertisment ------- */}
          {bannerUrl && <AdvertismentComponent bannerUrl={bannerUrl} onPress={() => navigation.navigate('SubscriptionScreen')} />}
          {istickerSuccess[0] && <AnnouncementBanner istickerSuccess={istickerSuccess} />}
          {/* -------- Telegram---------- */}
          <TouchableOpacity style={styleBase.telegram} activeOpacity={0.9} onPress={() => Linking.openURL('https://t.me/+arTIQ2U2fOllODY1').catch(() => console.log("Cannot open Telegram"))} >
            <Image source={IMAGES.TelegramBanner}
              style={styleBase.telegramImg} />
          </TouchableOpacity>
          {/* ----------- Menu Icon ------ */}
          <View style={{ height: 435, backgroundColor: '#F4F5F7', marginTop: 75, borderTopLeftRadius: 35, borderTopRightRadius: 35 }}>
            <CategoryList />
            {/* --------Carousel ------------- */}
            <View style={{ position: 'absolute', marginTop: 200 }}>
              {bannerData?.[0] && <BannerCarousel height={180}
                background_color={{ backgroundColor: '#F4F5F7' }}
                carouselStyle={styleBase.bannerCarausel} bannerData={bannerData} />}
            </View>
          </View>
          {/* -------- banner upload // homescreen ------------------ */}
          {tableUrl && <AdvertismentComponent bannerUrl={tableUrl} />}
          {/* No idea from where it is uploaded  */}
          {/* {tinymcedata?.[0]?.symbol && (
            <TinymceDataComp text_content={tinymcedata && tinymcedata?.[0]?.symbol} />
          )} */}
          {!isPremiumUser && <AdsContainer />}
          {topTrending?.[0] && <TrendingStock topTrending={topTrending} />}
          {topGainers?.[0] && (
            <GainerListCard ishowGainer={'gain'} topperData={topGainers} topLooser={topLooser} />
          )}
          {topLooser?.[0] && <GainerListCard ishowGainer={'loss'} topperData={topLooser} />}
          {newsData?.[0] && <NewsListCard newsData={newsData} />}
          {videoData?.[0] && <VideoPlayerHomeCpmp VideoData={videoData} />}
          {!isLoading && (
            <Text style={styles.sebitxt} allowFontScaling={false}>
              Stockyaari Technologies Private Limited{'\n'}
              SEBI REGISTRATION NUMBER: <Text onPress={handlePress} style={[styles.sebitxt, { fontWeight: '700' }]}>
                {' '}INH000018188
              </Text>
            </Text>
          )}
        </ScrollView>
      </View>
      <VideoModal
        onClose={onPressPayment}
        seeAllModal={showVideomodal}
        video={VideoLink && VideoLink}
      />
      {tinymcePopUpdata && tinymcePopUpdata[0]?.screen_content && <UserGuideModal
        visible={userGuideModaVisible}
        onClose={userGuidCloseModal}
        text_content={tinymcePopUpdata && tinymcePopUpdata[0]?.screen_content}
      />}
      {rating_sent &&
        <UserRatingModal
          visible={userRatingModal}
          onClose={() => setUserRatingModal(false)}
          onSubmit={AppRating} />}
    </SafeAreaView>
  );
};

export default React.memo(HomeScreen);
