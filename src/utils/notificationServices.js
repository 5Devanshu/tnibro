import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
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
      AsyncStorage.setItem('fcmToken', fcmTokken);
    }
  } catch (error) {}
};

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging().onMessage(async remoteMessage => {});

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {}
    });
};
