import 'react-native-gesture-handler';
import React, { useEffect, useCallback } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import { Image, Platform, StatusBar } from 'react-native';
import AppNavigator from './src/Navigation/AppNavigator';
import { MenuProvider } from 'react-native-popup-menu';
import { Settings } from 'react-native-fbsdk-next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TrackierConfig, TrackierSDK } from 'react-native-trackier';

import { COLORS, scaleWidth, styleBase } from './src/Constants/enums';
import NoInternetModal from './src/Components/Modal/NoInternetModal';
import OneSignalConfig from './src/Services/PushNotification';
import IMAGES from './src/Constants/enums/ImagesEnum';
import { store } from './src/store/store';
import { apiEnviornment } from './src/constants';
import { setUserPropertyWithTrackierId } from './src/Services/PushNotification/trackier';

function App() {

  useEffect(() => {
    var sdkID = Platform.OS === 'android' ? 'b8a312aa-4077-4467-88ea-2577e540a6a6' : '62d4fa46-3be5-421d-b24a-0265c7f099ff'
    var secretID = Platform.OS === 'android' ? '68429b3b043f0190a1463c74' : '68429b8b043f0190a1463e59'
    var secretKey = Platform.OS === 'android' ? '03badcd1-a8c7-4428-b4d4-5372ff12b08d' : '5e41b059-3011-42ed-b2e0-fc69a7916356'
    var env = apiEnviornment === 'PRODUCTION' ? TrackierConfig.EnvironmentProduction : TrackierConfig.EnvironmentDevelopment
    var trackierConfig = new TrackierConfig(sdkID, env);
    trackierConfig.setAppSecret(secretID, secretKey); //Pass secretId in first param and secretKey in second param

    console.log("Setting deferred deeplink listener...");
    trackierConfig.setDeferredDeeplinkCallbackListener(function (uri) {
      console.log("Deferred Deeplink Callback received");
      console.log("URL: " + uri);
    });
    console.log("TrackierSDK initializing...");
    TrackierSDK.initialize(trackierConfig);
    setUserPropertyWithTrackierId()
  }, [])


  useEffect(() => {
    // Initialize Facebook SDK
    Settings.initializeSDK();
    // Enable Facebook Tracking
    Settings.setAdvertiserTrackingEnabled(true);
  }, []);

  // Optimize FlashMessage icon rendering
  const renderFlashMessageIcon = useCallback(
    (icon) => (
      <Image
        source={icon === 'success' ? IMAGES.SUCESS_TOAST : IMAGES.ERROR_TOAST}
        style={{ marginRight: scaleWidth(8) }}
      />
    ),
    []
  );

  return (
    <GestureHandlerRootView style={styleBase.flex1}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.PrimaryBackGround}
        translucent={false}
      />
      <ReduxProvider store={store}>
        <MenuProvider>
          <AppNavigator />
          <FlashMessage position="top" renderFlashMessageIcon={renderFlashMessageIcon} />
          <NoInternetModal />
          <OneSignalConfig />
        </MenuProvider>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
}

export default App;
