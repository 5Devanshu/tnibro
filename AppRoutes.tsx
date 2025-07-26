import React, {useEffect, useState} from 'react';
import Login from './src/screens/Login/Login';
import Signup from './src/screens/Signup/Signup';
import Splash from './src/screens/Splash/Splash';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Home from './src/Navigation/DrawerNavigator';
import Otp from './src/screens/Otp/Otp';
import TermsConditions from './src/screens/Terms/Terms';
import messaging from '@react-native-firebase/messaging';
import {useDispatch} from 'react-redux';
import {deepLinkPayment, setNotification, storeFcmToken} from './src/apis/Onboarding/authenticationSlice';
// import VerificationScreen from './src/screens/VerificationLink/VerificationLinkScreen';
import ForgotPasswordScreen from './src/screens/ForgotPassword/ForgotPassword';
import ForgotOtpScreen from './src/screens/ForgotPassword/OtpScreen/OtpScreen';
import ResetPasswordScreen from './src/screens/ForgotPassword/ResetPassword/ResetPasswordScreen';
import SearchScreen from './src/screens/SearchField/SearchField';
import SearchDetailScreen from './src/screens/SearchField/SearchDetail/SearchDetail';
import CreateWatchListScreen from './src/screens/WatchList/WatchListDetail/WatchListDetail';
import WatchListTable from './src/screens/WatchList/WatchListTable/WatchListTable';
import OnBoardingScreen from './src/screens/onBoardingScreen';
import AlertScreen from './src/screens/AlertScreen';
import AlertTabsScreen from './src/screens/AlertScreen/AlertTabs/';
import GainerLooserScreen from './src/screens/GainerLooserScreen';
import OptionScreen from './src/screens/OptionsScreen';
import OptionDetailScreen from './src/screens/OptionsScreen/OptionDetail';
import ChartScreen from './src/screens/OptionsScreen/OptionDetail/ChartScreen';
import DeactivateScreen from './src/screens/HelpScreen/DeactivateAccount';
import DeactiveOtpScreen from './src/screens/HelpScreen/DeactivateAccount/DeactiveOtpScreen';
import DeactiveSubmit from './src/screens/HelpScreen/DeactivateAccount/DeactiveSubmit';
import SectorStocksScreen from './src/screens/Categories/SectorStocks';
import NewListingScreen from './src/screens/NewListingScreen';
import PriceActionScreen from './src/screens/PriceAction';
import WebViewPage from './src/screens/WebViewPage';
import {ROUTE_NAME} from './src/Constants/enums';
import RecentTradeScreen from './src/screens/RecentTradeScreen';
import NiftyBankniftyScreen from './src/screens/RecentTradeScreen/NiftyBankniftyScreen';
import StocksPredictions from './src/screens/SearchField/StocksPredictions';
import UpGradePlanScreen from './src/screens/SubscriptionScreen/UpgradePlan';
import CouponScreen from './src/screens/SubscriptionScreen/CouponScreen';
import PaymentSuccessScreen from './src/screens/SubscriptionScreen/PaymentSuccess';
import BottomTabNavigator from './src/Navigation/BottomTabNavigator';
import DrawerNavigation from './src/Navigation/DrawerNavigator';
import CategoriesScreen from './src/screens/Categories';
import NewsScreen from './src/screens/NewsScreen';
import AllGainerList from './src/screens/HomeScreen/GainerListCard/AllGainerList';
import Profile from './src/screens/Profile/Profile';
import AllTrendingStockList from './src/screens/HomeScreen/TrendingStock/AllTrendingStockList';
import SubscriptionHistory from './src/screens/SubscriptionScreen/SubscriptionHistory';
import VideoPlayerScreen from './src/screens/HomeScreen/VideoPlayerScreen';
import IpoScreen from './src/screens/HomeScreen/IpoScreen';
import InvoiceScreen from './src/screens/SubscriptionScreen/InvoiceScreen';
import SubscriptionScreen from './src/screens/SubscriptionScreen';
import RefundSuccessScreen from './src/screens/RefundScreen/RefundSuccessScreen';
import CreateTicketScreen from './src/screens/SupportScreen/CreateTicketScreen';
import ChatBoxScreen from './src/screens/SupportScreen/ChatBoxScreen';
import StarTriggeredAlertScreen from './src/screens/AlertScreen/StarTriggeredAlertScreen';
import UserTriggeredAlertScreen from './src/screens/AlertScreen/UserTriggeredAlertScreen';
import OpenTradeScreen from './src/screens/OpenTrade';
import AdvisoryScreen from './src/screens/AdvisoryScreen';
import TradingCallsScreen from './src/screens/TradingCalls';
import AboutUsScreen from './src/screens/AboutUs';
import { Linking } from 'react-native';
import ReferHistory from './src/screens/ReferScreen/referHistory';


const Stack = createNativeStackNavigator();

export default function Routes() {
  const [referralCode, setReferralCode] = useState(null);

  const dispatch = useDispatch();

  const notificationListener = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    messaging().onMessage(async remoteMessage => {
      // console.log('FOREGROUMD_MESSAGE>>', remoteMessage);
      dispatch(
        setNotification({
          isVisible: true,
          text: remoteMessage?.notification?.body,
        }),
      );
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
  };

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      registerAppWithFCM();
    }
  }

  async function registerAppWithFCM() {
    await messaging().registerDeviceForRemoteMessages();
    getFcmToken();
  }

  const getFcmToken = async () => {
    try {
      const fcmTokken = await messaging().getToken();
      if (fcmTokken) {
        dispatch(storeFcmToken({token: fcmTokken}));
      }
    } catch (error) {}
  };

  useEffect(() => {
  }, []);

  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      if (url) {
        const urlId = url.split('?ref=').pop();
        setReferralCode(urlId);
      }
    };
  
    Linking.getInitialURL().then(url => {
      if (url) {
        // Check if URL contains the string '?Basic179'
        if (url.includes('?Basic179')) {
          dispatch(deepLinkPayment(true));
        }
    
        // Extract referral code if present with '?ref='
        if (url.includes('?ref=')) {
          const urlId = url.split('?ref=').pop();
          setReferralCode(urlId);
        }
      }
    });
  
    const linkingListener = Linking.addEventListener('url', handleDeepLink);
  
    return () => {
      linkingListener.remove();
    };
  }, []);

    useEffect(() => {
      const handleUrl = (url) => {
        if (url) {
          const urlId = url.split('?ref=').pop();
          if (urlId) {
            setReferralCode(urlId);
          }
        }
      };
      // App opened via a deep link
      Linking.getInitialURL().then((url) => {
        handleUrl(url);
      });
  
      // App already running
      const linkingListener = Linking.addEventListener('url', (event) => {
        handleUrl(event.url);
      });
  
      return () => {
        linkingListener.remove();
      };
    }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Splash" 
       component={Splash} 
       options={{headerShown: false}} 
       />
      <Stack.Screen
        name="OnBoardingScreen"
        component={OnBoardingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Login" 
       component={Login} 
       initialParams={{customData: referralCode}} 
       />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
        initialParams={{customData: referralCode}}
      />
      <Stack.Screen name="DrawerNavigation"
       component={DrawerNavigation} 
       />
      <Stack.Screen name="OtpVerify" 
       component={Otp} 
       options={{headerShown: false}} 
       />
      <Stack.Screen name="Tnc"
       component={TermsConditions} 
       options={{headerShown: false}} 
       />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotOtpScreen"
        component={ForgotOtpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.SEARCH_SCREEN}
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchDetailScreen"
        component={SearchDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WatchListTable"
        component={WatchListTable}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.ALERT_SCREEN}
        component={AlertTabsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GainerLooserScreen"
        component={GainerLooserScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="OptionScreen" 
       component={OptionScreen} 
       options={{headerShown: false}} />
      <Stack.Screen
        name="OptionDetailScreen"
        component={OptionDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ChartScreen" 
       component={ChartScreen}
       options={{headerShown: false}} />
      <Stack.Screen
        name="DeactivateScreen"
        component={DeactivateScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DeactiveOtpScreen"
        component={DeactiveOtpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DeactiveSubmit"
        component={DeactiveSubmit}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SectorStocksScreen"
        component={SectorStocksScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.NEW_LISTING}
        component={NewListingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.PRICE_ACTION}
        component={PriceActionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name={ROUTE_NAME.WEB_VIEW_PAGE} 
       component={WebViewPage} 
       />
      <Stack.Screen name={ROUTE_NAME.RECENT_TRADE} 
       component={RecentTradeScreen} 
       />
      <Stack.Screen
        name={ROUTE_NAME.NIFTYBANKNIFTYSCREEN}
        component={NiftyBankniftyScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.STOCK_PREDICTIONS}
        component={StocksPredictions}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.UPGRADE_PLAN_SCREEN}
        component={UpGradePlanScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.COUPON_SCREEN}
        component={CouponScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.PAYMENT_SUCCESS_SCREEN}
        component={PaymentSuccessScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.WATCHLIST_SCREEN}
        component={CreateWatchListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.SECTORS_SCREEN}
        component={CategoriesScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.NEWS_SCREEN}
        component={NewsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.ALL_GAINER_LIST}
        component={AllGainerList}
        options={{headerShown: false}}
      />
      <Stack.Screen name={'Profile'} 
        component={Profile} 
        options={{headerShown: false}} />
      <Stack.Screen
        name={'AllTrendingStockList'}
        component={AllTrendingStockList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.SUBSCRIPTION_HISTORY}
        component={SubscriptionHistory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.VIDEO_PLAYER_SCREEN}
        component={VideoPlayerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.IPO_SCREEN}
        component={IpoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.INVOICE_SCREEN}
        component={InvoiceScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.SUBSCRIPTION_SCREEN}
        component={SubscriptionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.REFUND_SUCCESS}
        component={RefundSuccessScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.CREATE_TICKET}
        component={CreateTicketScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.CHAT_BOX}
        component={ChatBoxScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.STAR_ALERT_TRIGGER_SCREEN}
        component={StarTriggeredAlertScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.USER_TRIGGER_ALERT}
        component={UserTriggeredAlertScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.OPEN_TRADE}
        component={OpenTradeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.ADVISORY_SCREEN}
        component={AdvisoryScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ROUTE_NAME.TRADING_CALLS}
        component={TradingCallsScreen}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name={ROUTE_NAME.ABOUT_US}
        component={AboutUsScreen}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name={ROUTE_NAME.REFER_HISTORY}
        component={ReferHistory}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
