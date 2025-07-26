import React, { useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigation } from '../../Navigation/NavigationService';
import { ROUTE_NAME } from '../../Constants/enums';
import { apiEnviornment } from '../../constants';
import { extractAlertDetails } from '../../utils/symbolfinder';

const OneSignalConfig = () => {
  // const navigation = useNavigation();

  useEffect(() => {
    // OneSignal Initialization
    const appId = apiEnviornment === 'PRODUCTION'
      ? '3a7e2c4a-c9e1-4eb1-9257-cbd1130f4c49'
      : '87badf4c-4538-49b8-884c-aa6ee6809b62';

    OneSignal.setAppId(appId);

    // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
    OneSignal.promptForPushNotificationsWithUserResponse();

    // Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
      // console.log('OneSignal: notification will show in foreground:', notificationReceivedEvent);
      let notification = notificationReceivedEvent.getNotification();
      // console.log('notification: ', notification);
      const data = notification.additionalData;
      // console.log('additionalData: ', data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    });

    // Method for handling notifications opened
    // OneSignal.setNotificationOpenedHandler(notification => {
    //   const { symbol, type } = extractAlertDetails(notification.notification.body);
    //   if (type && symbol) {
    //     setTimeout(() => {
    //       navigation(ROUTE_NAME?.RECENT_TRADE, {
    //         symbol: symbol,
    //         trade_timeframe: type?.toLowerCase(),
    //       });
    //     }, 2000);
    //   } else if (symbol) {
    //     setTimeout(() => {
    //       navigation('SearchDetailScreen', {
    //         symbol: symbol,
    //         segment: 'cash',
    //       });
    //     }, 2000);
    //   }
    // });

    // Request permission
    const timeout = setTimeout(() => {
      OneSignal.getDeviceState().then(data => {
        const oneSignal_userId = data?.userId;
        if (oneSignal_userId) {
          AsyncStorage.setItem('oneSignal_userId', oneSignal_userId)
            .then(() => console.log('OneSignal User ID stored'))
            .catch(error => console.log('Error storing OneSignal User ID', error));
        }
      });
    }, 15000);

    return () => {
      clearTimeout(timeout);
    };
  }, [navigation]);

  return null;
};

export default OneSignalConfig;
