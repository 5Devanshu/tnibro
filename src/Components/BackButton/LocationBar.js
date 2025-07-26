import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';

import {
  COLORS,
  ROUTE_NAME,
  scaleHeight,
  scaleWidth,
} from '../../Constants/enums';
import AudioPlayer from '../../utils/audioplayer';
import Header from '../../screens/HomeScreen/Header';
import IMAGES from '../../Constants/enums/ImagesEnum';
import WatchNowAnimation from '../../assets/animation/watchNow';
import { navigation, toggleDrawer, goBack } from '../../Navigation/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocationBar = ({
  showBackIcon = false,
  showDrawer = false,
  showAudio = false,
  showVideo = false,
  audioUrl,
}) => {
  const authenticationData = useSelector((state: any) => state.authentication);
  const [active_PlanCode, setActive_PlanCode] = useState('');
  AsyncStorage.getItem('active_PlanCode').then(value => {
    setActive_PlanCode(value)
  });
  const isEligiblePlan = ["NEWYEAR349", "GOLD849", "ANNUAL_UPGRADE", "NEW349", "ADV4499", "BASIC179"].includes(active_PlanCode);
  let planColor = "#FFFFFF"; // Default: White

  if (["NEWYEAR349", "NEW349"].includes(active_PlanCode)) {
    planColor = "#C0C0C0"; // Silver
  } else if (active_PlanCode === "GOLD849") {
    planColor = "#FFD700"; // Gold
  } else if (active_PlanCode === "ANNUAL_UPGRADE") {
    planColor = "#B9F2FF"; // Diamond
  } else if (active_PlanCode === "ADV4499") {
    planColor = "#FFFF00"; // Yellow
  } else if (active_PlanCode === "BASIC179") {
    planColor = "#D1D1D1"; // Yellow
  }

  const onPressAlert = () => navigation(ROUTE_NAME.ALERT_SCREEN);
  const goBackAction = () => goBack();

  const username = authenticationData?.getProfileSuccess?.username;

  return (
    <View style={styles.outerWrapper}>
      <View style={styles.container}>
        <View style={styles.logoView}>
          {showDrawer && (
            <TouchableOpacity
              onPress={toggleDrawer}
              hitSlop={{ top: 50, bottom: 30, left: 50, right: 90 }}>
              <View style={[styles.circle, { borderColor: planColor }]}>
                {username ? (
                  <Text style={styles.firstLetter}>{username.charAt(0).toUpperCase()}</Text>
                ) : (
                  <Image source={IMAGES.BOTTOM_TAB_ICON.profileLogo} style={styles.profileLogo} />
                )}
              </View>
            </TouchableOpacity>
          )}
          {showBackIcon && (
            <TouchableOpacity
              onPress={goBackAction}
              hitSlop={{ top: 50, bottom: 30, left: 50, right: 90 }}>
              <Image source={IMAGES.Back_IconDark} style={styles.backIcon} />
            </TouchableOpacity>
          )}
        </View>

        <Header />

        {showVideo && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation(ROUTE_NAME.VIDEO_PLAYER_SCREEN)}
            style={styles.videoWrapper}>
            <WatchNowAnimation />
          </TouchableOpacity>
        )}

        <View style={styles.iconView}>
          {showAudio && isEligiblePlan && (
            <View style={styles.audioWrapper}>
              <AudioPlayer audioUrl={audioUrl} />
            </View>
          )}
          <TouchableOpacity activeOpacity={1} onPress={onPressAlert} style={styles.alertButton}>
            <View style={styles.alertIconWrapper}>
              <Image
                source={IMAGES.BOTTOM_TAB_ICON.AlertIcon}
                style={styles.alertIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default memo(LocationBar);

const styles = StyleSheet.create({
  outerWrapper: {
    overflow: 'hidden',
    marginHorizontal: scaleWidth(20),
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleWidth(10),
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    height: 37,
    width: 37,
    borderRadius: 18.5,
    backgroundColor: '#228B22',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  firstLetter: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  backIcon: {
    height: scaleHeight(40),
    width: scaleWidth(40),
    resizeMode: 'contain',
  },
  profileLogo: {
    height: scaleHeight(36),
    width: scaleWidth(36),
    resizeMode: 'contain',
  },
  audioWrapper: {
    marginLeft: 10,
    borderRadius: 20,
    backgroundColor: COLORS.PrimaryBackGround,
  },
  videoWrapper: {
    marginLeft: scaleWidth(10),
  },
  alertButton: {
    marginLeft: scaleWidth(10),
  },
  alertIconWrapper: {
    backgroundColor: '#F4F5F7',
    borderRadius: 18,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
