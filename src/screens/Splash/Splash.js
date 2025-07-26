import React, { useEffect, useState, useCallback } from 'react';
import { View, Image, ImageBackground, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setInternalToken } from '../../apis/Onboarding/authenticationSlice';
import { requestUserPermission } from '../../utils/notificationServices';
import ProgressBar from 'react-native-progress/Bar';
import styles from './style';
import IMAGES from '../../Constants/enums/ImagesEnum';

const Splash = ({ navigation }) => {
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  const initializeApp = useCallback(async () => {
    await requestUserPermission();
    
    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 0.1;
      setProgress(progressValue);
      if (progressValue >= 1) clearInterval(interval);
    }, 400);

    try {
      const token = await AsyncStorage.getItem('accessToken');

      setTimeout(() => {
        clearInterval(interval);
        if (token) {
          dispatch(setInternalToken(token));
          navigation.replace('DrawerNavigation');
        } else {
          navigation.replace('OnBoardingScreen');
        }
      }, 4000);
    } catch (error) {
      console.error('Error retrieving token:', error);
      clearInterval(interval);
      navigation.replace('OnBoardingScreen');
    }
  }, [dispatch, navigation]);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={IMAGES.splashBackground} resizeMode="cover" style={styles.container}>
        <View style={styles.splashContainer}>
          <Image source={IMAGES.logo_splash} style={styles.logosplash} />
        </View>
        <View style={styles.progressBarContainer}>
          <ProgressBar
            progress={progress}
            width={200}
            height={10}
            color="#228B22"
            borderRadius={5}
            unfilledColor="#FFFFFF"
            borderColor="#FFFFFF"
            borderWidth={0.5}
          />
          <Text style={styles.loadingText}>Loading ...</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Splash;
